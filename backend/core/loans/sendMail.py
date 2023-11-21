from django.core.mail import send_mail


def send_approval_email(sender, instance, **kwargs):
    is_tresurer_approved = True
    if instance.is_tresurer_approved or instance.is_president_approved:
        # Send email logic here
        subject = "Loan Approval Notification"
        message = f"Loan for member {instance.member} has been approved."
        from_email = "your_email@example.com"  # Replace with your email
        recipient_list = [instance.member.email]  # Replace with the actual member email

        send_mail(subject, message, from_email, recipient_list)
