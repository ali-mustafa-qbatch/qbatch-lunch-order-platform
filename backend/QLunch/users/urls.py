from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", views.register_user, name="register"),
    path("login/", views.login_user, name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("logout/", views.logout_user, name="logout"),
    path(r"forgot-password/", include("django_rest_passwordreset.urls"), name="forgot_password"),
    # path("profile/", views.get_user_profile, name="profile"),
    # path("profile/update/", views.update_user_profile, name="update_profile"),
    # path("profile/change-password/", views.change_user_password, name="change_password"),
    # path("profile/delete/", views.delete_user_account, name="delete_account"),
]