from django.db import models
from restaurants.models import Restaurant
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('delivered', 'Delivered'),
        ('cleared', 'Cleared'),
    ]
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='orders')
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    items = models.JSONField() 
    total_price = models.IntegerField(default=-1)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending') 
    instructions = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)