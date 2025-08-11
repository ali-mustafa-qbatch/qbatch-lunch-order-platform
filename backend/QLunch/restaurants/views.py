from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .serializers import RestaurantSerializer
from .models import Restaurant
from rest_framework import generics

# @api_view(['GET'])
# def get_restaurants(request):
#     paginator = PageNumberPagination()
#     restaurants = Restaurant.objects.all()

#     result_page = paginator.paginate_queryset(restaurants, request)    
#     if not result_page:
#         return Response({"detail": "No restaurants found."}, status=status.HTTP_404_NOT_FOUND)

#     serializer = RestaurantSerializer(result_page, many=True)
#     return paginator.get_paginated_response(serializer.data)

class ListRestaurants(generics.ListAPIView):
    queryset = Restaurant.objects.all().order_by('-date_created')
    serializer_class = RestaurantSerializer
    pagination_class = PageNumberPagination

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_restaurant(request):
#     if not request.user.is_staff:
#         return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

#     serializer = RestaurantSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_restaurant(request):
#     if not request.user.is_staff:
#         return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
    
#     restaurant_id = request.data.get('id')
#     if not restaurant_id:
#         return Response({"detail": "Restaurant ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
#     try:
#         restaurant = Restaurant.objects.get(id=restaurant_id)
#         restaurant.delete()
#         return Response({"detail": "Restaurant deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
#     except Restaurant.DoesNotExist:
#         return Response({"detail": "Restaurant not found."}, status=status.HTTP_404_NOT_FOUND)
    
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_restaurant(request):
#     if not request.user.is_staff:
#         return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
    
#     restaurant_id = request.data.get('id')
#     if not restaurant_id:
#         return Response({"detail": "Restaurant ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
#     try:
#         restaurant = Restaurant.objects.get(id=restaurant_id)
#     except Restaurant.DoesNotExist:
#         return Response({"detail": "Restaurant not found."}, status=status.HTTP_404_NOT_FOUND)
    
#     serializer = RestaurantSerializer(restaurant, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)