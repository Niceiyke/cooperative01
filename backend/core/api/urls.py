from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .auth import views as authviews
from .member import views as memberviews
from .transaction import views as transactionviews
from .loans import views as loanviews
from .management import views as managementvies

urlpatterns = [
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("signup/", authviews.RegisterUserView.as_view()),
    path("login/", authviews.LoginUserView.as_view()),
    path("user/", authviews.UserView.as_view()),
    # members urls
    path("member/<int:pk>", memberviews.MemberView.as_view()),
    path("member-update/<int:pk>", memberviews.MemberUpdate.as_view()),
    # Transaction Urls
    path("transaction/", transactionviews.ListCreateTransaction.as_view()),
    # Loan Urls
    path("loans/", loanviews.ListCreateLoanView.as_view()),
    path("loan-repayment/", loanviews.ListCreateLoanRepaymentView.as_view()),
    path("approve-loan/<int:pk>/", loanviews.LoanApprovalAPIView.as_view()),
    # Managementsurls
    path("loan-detail/<int:pk>/", managementvies.LoanDetailView.as_view()),
    path("all-contribution/", managementvies.AccountBalances.as_view()),
    path("send-exco-mail/", managementvies.send_Executive_Mail),
    path("send-members-mail/", managementvies.send_Members_Mail),
    path("send-personal-mail/", managementvies.send_Personal_mail),
]
