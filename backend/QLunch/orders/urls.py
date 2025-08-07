from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_orders, name="get_orders"),
    path("create", views.create_order, name="create_order"),
]