from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .models import FranchiseUser
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

# Login user for admin portal
class LoginViewSet(viewsets.ModelViewSet):
    queryset = FranchiseUser.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def create(self,request):
        user = authenticate(email=request.data.get('email'),password=request.data.get('password'))
        if user and user.is_superuser:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token':token.key,'user':self.get_serializer(user).data},status=status.HTTP_201_CREATED)
        return Response({'message':'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

