from django.contrib import admin
from django_extensions.admin import ForeignKeyAutocompleteAdmin
from .models import Product

# Register your models here.
class ProductAdmin(ForeignKeyAutocompleteAdmin):
    model = Product
    list_display = ("name","current_quantity","total_quantity","seller")

admin.site.register(Product, ProductAdmin)