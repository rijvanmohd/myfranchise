from django.core.checks import messages
from rest_framework import status
from rest_framework.decorators import api_view,action
from rest_framework.response import Response
from .models import Seller
from seller.serializers import RegisterSellerSerializer,SellerSerializer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

# Checks for user and create a seller, get sellers list and delete a seller
class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer
    permission_classes = [permissions.IsAuthenticated,permissions.IsAdminUser]

    def create(self,request):
        serializer = RegisterSellerSerializer(data={'user':request.data})
        if serializer.is_valid():
            seller = serializer.save()
            if seller:
                return Response(self.get_serializer(seller).data, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'Duplicate Details Found'}, status=status.HTTP_400_BAD_REQUEST)

    def list(self,request):
        serializer = self.get_serializer(Seller.objects.all().order_by('-created_on'),many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self,request,pk=None):
        Seller.objects.get(pk=pk).delete()
        return Response({'message':'Seller Deleted Successfully'}, status=status.HTTP_201_CREATED) 



# Login user for seller portal
class LoginSellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def create(self,request):
        user = authenticate(email=request.data.get('email'),password=request.data.get('password'))
        if user:
            print(user.email)
            token, created = Token.objects.get_or_create(user=user)
            seller,_ = Seller.objects.get_or_create(user=user)
            return Response({'token':token.key,'seller':self.get_serializer(seller).data},status=status.HTTP_201_CREATED)
        return Response({'message':'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)