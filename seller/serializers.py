from rest_framework import serializers, fields
from .models import Seller
from product.models import Product
from user.serializers import RegisterUserSerializer,UserSerializer

# Seller Serializer
class SellerSerializer(serializers.ModelSerializer):
    user_id = fields.ReadOnlyField(source='user.id')
    name = fields.ReadOnlyField(source='user.name')
    mobile_no = fields.ReadOnlyField(source='user.mobile_no')
    email = fields.ReadOnlyField(source='user.email')
    active_products = serializers.SerializerMethodField()
    sold_products = serializers.SerializerMethodField()
    class Meta:
        model = Seller
        fields = ('id','user_id','name','mobile_no','email','active_products','sold_products')

    def get_active_products(self,obj):
        active_prod = Product.objects.filter(current_quantity__gt=0,seller=obj).count()
        return active_prod
    
    def get_sold_products(self,obj):
        sold_prod = Product.objects.filter(current_quantity=0,seller=obj).count()
        return sold_prod

# Register Seller Serializer
class RegisterSellerSerializer(serializers.ModelSerializer):
    user = RegisterUserSerializer()
    class Meta:
        model = Seller
        fields = ('id','user')

    def create(self, validated_data):
        user_data = dict(validated_data['user'])
        user_serialize = RegisterUserSerializer(data=user_data)
        if user_serialize.is_valid():
            user = user_serialize.save()
            seller = Seller.objects.create(user=user)
            return seller
