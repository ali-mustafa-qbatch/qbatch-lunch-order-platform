from django.contrib import admin
from .models import Restaurant, MenuImage

class MenuImageInline(admin.TabularInline): 
    model = MenuImage
    extra = 1 
    fields = ['image']  

class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'date_created', 'date_updated')
    search_fields = ('name',)
    list_filter = ('date_created',)
    inlines = [MenuImageInline]  

admin.site.register(Restaurant, RestaurantAdmin)