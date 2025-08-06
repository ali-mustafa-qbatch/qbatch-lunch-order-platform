from django.db import models

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def delete(self, *args, **kwargs):
        for image in self.menu_images.all():
            image.delete()
        super().delete(*args, **kwargs)

class MenuImage(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu_images')
    image = models.ImageField(upload_to='menu_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        storage = self.image.storage
        path = self.image.path
        super().delete(*args, **kwargs)
        if storage.exists(path):
            storage.delete(path)