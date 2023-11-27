from members.models import Member

import logging

from enum import Enum


class HttpStatus(Enum):
    OK = 200
    CREATED = 201
    ACCEPTED = 202
    NO_CONTENT = 204
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    METHOD_NOT_ALLOWED = 405
    INTERNAL_SERVER_ERROR = 500
    NOT_IMPLEMENTED = 501
    SERVICE_UNAVAILABLE = 503


class TransactionType(Enum):
    DEPOSIT = "Deposit"
    WITHDRAWAL = "Withdrawal"
    DEBIT = "Debit"
    CREDIT = "Credit"


class InsufficientBalanceError(Exception):
    pass


def update_contribution_amount(
    member_object, transaction_amount, transaction_type_object
):
    try:
        initial_balance = member_object.total_contribution

        if transaction_type_object.name == TransactionType.DEPOSIT.value:
            if transaction_amount <= 0:
                raise ValueError("The deposit amount must be greater than zero")

            member_object.total_contribution += transaction_amount
            member_object.save()
            return {
                "status": HttpStatus.OK,
                "balance": member_object.total_contribution,
            }

        elif transaction_type_object.name == TransactionType.WITHDRAWAL.value:
            if transaction_amount <= 0 or transaction_amount > initial_balance:
                raise ValueError("Invalid withdrawal amount")

            member_object.total_contribution -= transaction_amount
            member_object.save()

            return {
                "status": HttpStatus.OK,
                "balance": member_object.total_contribution,
            }

        else:
            raise ValueError("Invalid transaction type")

    except Member.DoesNotExist:
        return {"status": HttpStatus.NOT_FOUND, "error": "Member not found"}

    except ValueError as e:
        return {"status": HttpStatus.BAD_REQUEST, "error": str(e)}

    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        return {
            "status": HttpStatus.INTERNAL_SERVER_ERROR,
            "error": "Internal Server Error",
        }


def check_loan_eligibility(member_object, selected_loan_type, requested_amount):
    try:
        initial_balance = member_object.total_contribution
        existing_total_loan = member_object.total_loan
        interest_rate = selected_loan_type.interest / 100

        loan_max_limit_multiplier = 2
        interest_adjusted_amount = requested_amount + (requested_amount * interest_rate)
        loan_max_limit = initial_balance * loan_max_limit_multiplier
        borrowable_max_loan_limit = loan_max_limit - existing_total_loan

        if requested_amount <= 10000:
            raise ValueError("Loan amount must be greater than 10000")

        if interest_adjusted_amount > borrowable_max_loan_limit:
            raise ValueError(
                f"Insufficient balance for the requested loan amount.The maximum you can borrow at this time is: NGN {borrowable_max_loan_limit - (borrowable_max_loan_limit * interest_rate)}",
            )

        return {"amount": interest_adjusted_amount, "status": True}
    except ValueError as e:
        return {"status": HttpStatus.BAD_REQUEST, "error": str(e)}

    except InsufficientBalanceError as e:
        return {"status": 400, "error": str(e)}

    except Member.DoesNotExist:
        return {"status": 404, "error": "Member not found"}

    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        return {"status": 500, "error": "Internal Server Error"}


def process_loan_transaction(member_object, transaction_amount, transaction_type):
    """
    Process a loan transaction for a member.

    Args:
        member_object: The member object for whom the transaction is processed.
        transaction_amount (float): The amount to be credited or debited.
        transaction_type (str): The type of transaction (CREDIT or DEBIT).

    Returns:
        dict: A dictionary containing the transaction status and updated balance.
    """
    try:
        if (
            transaction_type == TransactionType.CREDIT.value
            or transaction_type == TransactionType.DEBIT.value
        ):
            if transaction_amount <= 0:
                raise ValueError("Invalid transaction amount")

            if transaction_type == TransactionType.CREDIT.value:
                member_object.total_loan -= transaction_amount
            else:
                member_object.total_loan += transaction_amount

            member_object.save()

            return {
                "status": 200,
                "message": "Transaction successful",
                "balance": member_object.total_loan,
            }

        else:
            raise ValueError("Invalid transaction type")

    except Member.DoesNotExist:
        return {"status": 404, "error": "Member not found"}

    except ValueError as e:
        return {"status": 400, "error": str(e)}

    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        return {"status": 500, "error": "Internal Server Error"}


def pay_loan(loan, amount):
    """
    Pay a portion of the loan amount.

    Args:
        loan: The loan object to be paid.
        amount (float): The amount to be paid.

    Returns:
        dict: A dictionary containing the payment status and remaining balance.
    """
    total_borrowed_amount = loan.amount
    loan_balance = total_borrowed_amount - loan.repayment_balance

    try:
        if not loan.is_active:
            raise ValueError("Loan amount already repaid")

        elif loan_balance < total_borrowed_amount:
            if amount <= 0:
                raise ValueError("Payment amount must be greater than zero")
            elif amount > loan_balance:
                raise ValueError(
                    f"Payment amount exceeds the remaining balance.Loan balance is :NGN{loan_balance}"
                )

            loan.repayment_balance += amount

            loan.save()

            if loan.repayment_balance == total_borrowed_amount:
                loan.is_active = False
                loan.save()
                return {
                    "status": 200,
                    "message": "Loan fully repaid",
                    "balance": loan.repayment_balance,
                }

            return {
                "status": 200,
                "message": "Payment successful",
                "balance": loan.repayment_balance,
            }
        else:
            raise ValueError("Loan amount already repaid")
    except ValueError as e:
        return {"status": 400, "error": str(e)}
