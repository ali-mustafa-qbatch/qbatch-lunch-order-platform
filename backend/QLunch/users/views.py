from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({
            'username': user.username,
            'access_token': access_token,
            'refresh_token': refresh_token,
        }, status=status.HTTP_200_OK)

    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# @api_view(['POST'])
# def refresh_token(request):
#     refresh_token = request.data.get('refresh_token')
#     if not refresh_token:
#         return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
#     else:
#         try:
#             refresh = RefreshToken(refresh_token)
#             access_token = str(refresh.access_token)
#             return Response({'access_token': access_token}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        refresh_token = request.data.get('refresh_token')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "User logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
# @api_view(['POST'])
# def forgot_password(request):
#     email = request.data.get('email')
#     if not email:
#         return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
    
#     if not email.endswith('@qbatch.com'):
#         return Response({"detail": "Email must be from the domain qbatch.com"}, status=status.HTTP_400_BAD_REQUEST)

#     # forgot password logic

#     return Response({"detail": "Password reset link sent to your email."}, status=status.HTTP_200_OK)
    
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user_profile(request):
#     user = request.user
#     print(request.user.__dict__)
#     profile_data = {
#         'username': user.username,
#         'first_name': user.first_name,
#         'last_name': user.last_name,
#         'email': user.email,
#         'date_joined': user.date_joined,
#     }
#     return Response(profile_data, status=status.HTTP_200_OK)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_user_profile(request):
#     user = request.user

#     serializer = RegisterSerializer(user, data=request.data, partial=True)
    
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def change_user_password(request):
#     user = request.user
#     new_password = request.data.get('new_password')
#     confirm_password = request.data.get('confirm_password')

#     if new_password != confirm_password:
#         return Response({"detail": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

#     user.set_password(new_password)
#     user.save()
    
#     return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_user_account(request):
#     user = request.user
#     user.delete()
#     return Response({"message": "User account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)