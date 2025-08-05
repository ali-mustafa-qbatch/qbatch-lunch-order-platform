# from django.db import models
# from django.contrib.auth.models import AbstractUser

# class CustomUser(AbstractUser):
#     username = None
#     first_name = models.CharField(blank=False, null=False)
#     email = models.EmailField(unique=True)
#     phone_number = models.CharField(max_length=15, blank=True, null=True)
#     address = models.CharField(blank=True, null=True)
#     country_code = models.CharField(max_length=5)
#     phone_number = models.CharField(max_length=10)

#     # Override the default related_name for groups and user_permissions
#     groups = models.ManyToManyField(
#         'auth.Group', 
#         related_name='customuser_set',  # Custom reverse relation name for groups
#         blank=True
#     )
#     user_permissions = models.ManyToManyField(
#         'auth.Permission', 
#         related_name='customuser_permissions_set',  # Custom reverse relation name for user_permissions
#         blank=True
#     )

#     def __str__(self):
#         return self.email