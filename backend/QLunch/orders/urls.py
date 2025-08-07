from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_orders, name="get_orders"),
    path("create", views.create_order, name="create_order"),
    path("delete/<int:pk>", views.delete_order, name="delete_order"),
    path("update-status/<int:pk>", views.update_order_status, name="update_order_status"),
    path("update-total-price/<int:pk>", views.update_order_total_price, name="update_order_total_price"),
]