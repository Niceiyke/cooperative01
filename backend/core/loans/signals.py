from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

from .models import Loan


@receiver(post_save, sender=Loan)
def send_approval_email(sender, instance, **kwargs):
    if instance.is_tresurer_approved and not instance.is_president_approved:
        # Send email logic here
        subject = "Loan Approval Notification"
        message = f"Your {instance.loan_type.name} of NGN{instance.amount} has been approved by Ampcus Treasurer.\nPlease wait for further approval from Ampcus President."
        from_email = "your_email@example.com"  # Replace with your email
        recipient_list = [
            instance.member.user.email
        ]  # Replace with the actual member email

        send_mail(subject, message, from_email, recipient_list)

    elif (
        instance.is_tresurer_approved
        and instance.is_president_approved
        and not instance.is_petron_approved
    ):
        # Send email logic here
        subject = "Loan Approval Notification"
        message = f"Your {instance.loan_type.name} of NGN{instance.amount} has been approved by Ampcus President.\nPlease wait for further approval from Ampcus Petron."
        from_email = "your_email@example.com"  # Replace with your email
        recipient_list = [
            instance.member.user.email
        ]  # Replace with the actual member email

        send_mail(subject, message, from_email, recipient_list)

    elif instance.is_petron_approved:
        # Send email logic here
        subject = "Final Loan Approval Notification"
        message = f"Congratulations! Your {instance.loan_type.name} of NGN{instance.amount} has been fully approved by all stages. \nYour loan will be disbused within the next 72 hours"
        from_email = "your_email@example.com"  # Replace with your email
        recipient_list = [
            instance.member.user.email
        ]  # Replace with the actual member email

        send_mail(subject, message, from_email, recipient_list)
