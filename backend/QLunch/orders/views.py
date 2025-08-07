from rest_framework.decorators import api_view
from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)