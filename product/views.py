from rest_framework import status
from rest_framework.decorators import api_view,action
from rest_framework.response import Response
from .models import Product
from seller.models import Seller
from product.serializers import ProductSerializer
from rest_framework import viewsets
from rest_framework import permissions
from django.shortcuts import get_object_or_404

# Create a product, retrieve products added by a seller, updating quantity and delete product
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self,request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            if product:
                return Response(self.get_serializer(product).data, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'Duplicate Product Found'}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):
        serializer = self.get_serializer(Product.objects.filter(seller_id=pk).order_by('-current_quantity'),many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        product = get_object_or_404(Product, pk=pk)
        product.current_quantity = product.current_quantity - 1
        product.save()
        return Response({'message':'Sold Successfully'}, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        product = get_object_or_404(Product, pk=pk)
        product.delete()
        return Response({'message':'Product Deleted Successfully'}, status=status.HTTP_201_CREATED)
