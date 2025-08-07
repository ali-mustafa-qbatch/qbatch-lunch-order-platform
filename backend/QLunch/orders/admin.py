from django.contrib import admin
from .models import Order

# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = ('restaurant', 'customer', 'total_price', 'status', 'date_created', 'date_updated')
    search_fields = ('restaurant__name', 'customer__username')
    list_filter = ('status', 'date_created')
    readonly_fields = ('date_created', 'date_updated', 'customer', 'items', 'instructions', 'restaurant')

admin.site.register(Order, OrderAdmin)