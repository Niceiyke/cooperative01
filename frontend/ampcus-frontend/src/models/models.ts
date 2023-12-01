
export interface Member {
    id: number;
    location: string;
    user: {
        first_name: string;
        last_name: string;
        sap_number: string;
        email: string;
    };
    monthly_contribution: number;
    bank_name: string;
    bank_account: string;
    total_contribution: number;
    total_loan: number;
    available_balance: number;
    existing_loan: {
        id: number;
        loan_types: number;
        date_approved: string;
        borrowed_amount: number;
        repaid_amount: number;
        is_active: boolean;
    
    }[];
    avatarUrl?: string
}


export interface User {
    email: string
    exp: number
    iat: number
    jti: string
    member: number
    token_type: string
    user_id: number
}