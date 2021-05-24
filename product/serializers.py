from rest_framework import serializers, fields
from .models import Product
from seller.serializers import SellerSerializer
from seller.models import Seller

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    seller = fields.ReadOnlyField(source='seller.id')
    class Meta:
        model = Product
        fields = '__all__'
    
    def create(self, validated_data):
        seller_id = self.initial_data.get('seller',None)

        if seller_id:
            seller,_ = Seller.objects.get_or_create(id=seller_id)
            product = Product.objects.create(**validated_data,seller=seller)
            return product
        else:
            raise serializers.ValidationError("Seller Not Found")

# # Add Product Serializer
# class AddProductSerializer(serializers.ModelSerializer):
#     user = RegisterUserSerializer()
#     class Meta:
#         model = Seller
#         fields = ('id','user')

#     def create(self, validated_data):
#         print(validated_data)
#         user_data = dict(validated_data['user'])
#         user_serialize = RegisterUserSerializer(data=user_data)
#         if user_serialize.is_valid():
#             user = user_serialize.save()
#             seller = Seller.objects.create(user=user)
#             return seller
