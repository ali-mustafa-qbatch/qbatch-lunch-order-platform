from django.db import models
from restaurants.models import Restaurant
from users.serializers import User

# Create your models here.
class Order(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='orders')
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    items = models.TextField() 
    total_price = models.IntegerField(default=-1)
    status = models.CharField(max_length=50, default='pending') 
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)