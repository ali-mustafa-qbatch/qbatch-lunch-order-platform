from rest_framework import serializers
from .models import Restaurant
from .models import MenuImage

class MenuImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuImage
        fields = "__all__"

class RestaurantSerializer(serializers.ModelSerializer):
    menu_images = MenuImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    ) 

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'date_created', 'date_updated', 'menu_images', 'uploaded_images']
    
    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        restaurant = Restaurant.objects.create(**validated_data)
        for image_file in uploaded_images:
            MenuImage.objects.create(restaurant=restaurant, image=image_file)
        return restaurant
    
    # def update(self, instance, validated_data):
    #     menu_images_data = validated_data.pop('menu_images', [])
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.save()

    #     for image_data in menu_images_data:
    #         image_id = image_data.get('id')
    #         if image_id:
    #             image_instance = MenuImage.objects.get(id=image_id, restaurant=instance)
    #             for attr, value in image_data.items():
    #                 setattr(image_instance, attr, value)
    #             image_instance.save()
    #         else:
    #             MenuImage.objects.create(restaurant=instance, **image_data)

    #     return instance