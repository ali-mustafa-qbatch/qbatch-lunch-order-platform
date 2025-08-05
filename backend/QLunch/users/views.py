from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RegisterSerializer

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data={
        'username': request.data['username'],
        'first_name': request.data['firstName'],
        'last_name': request.data['lastName'],
        'email': request.data['email'], 
        'password': request.data['password'], 
        'confirm_password': request.data['confirmPassword']
    })
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)