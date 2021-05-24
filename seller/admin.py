from django.contrib import admin
from django_extensions.admin import ForeignKeyAutocompleteAdmin
from .models import Seller

# Register your models here.
class SellerAdmin(ForeignKeyAutocompleteAdmin):
    model = Seller
    list_display = ("id","user")

admin.site.register(Seller, SellerAdmin)