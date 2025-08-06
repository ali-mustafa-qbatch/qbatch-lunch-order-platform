from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import RestaurantSerializer
from .models import Restaurant

@api_view(['GET'])
def get_restaurants(request):
    restaurants = Restaurant.objects.all()
    serializer = RestaurantSerializer(restaurants, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_restaurant(request):
    if not request.user.is_staff:
        return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
    print(request.data)
    serializer = RestaurantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_restaurant(request):
    if not request.user.is_staff:
        return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
    
    restaurant_id = request.data.get('id')
    if not restaurant_id:
        return Response({"detail": "Restaurant ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        restaurant = Restaurant.objects.get(id=restaurant_id)
        restaurant.delete()
        return Response({"detail": "Restaurant deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Restaurant.DoesNotExist:
        return Response({"detail": "Restaurant not found."}, status=status.HTTP_404_NOT_FOUND)