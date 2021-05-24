from rest_framework import serializers, fields
from .models import FranchiseUser
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FranchiseUser
        fields = ('id','name','email','mobile_no')

# Register User Serializer
class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FranchiseUser
        fields = ('id','name','email','mobile_no','password')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        user = FranchiseUser.objects.create_user(validated_data['email'],validated_data['password'],name=validated_data['name'],mobile_no=validated_data['mobile_no'])
        return user


