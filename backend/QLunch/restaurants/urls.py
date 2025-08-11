from django.urls import path
from . import views
from .views import ListRestaurants

urlpatterns = [
    path("", ListRestaurants.as_view(), name="list_restaurants"),
    # path("", views.get_restaurants, name="get_restaurants"),
    # path("create", views.create_restaurant, name="create_restaurant"),
    # path("delete", views.delete_restaurant, name="delete_restaurant"),
    # path("update", views.update_restaurant, name="update_restaurant"),
]