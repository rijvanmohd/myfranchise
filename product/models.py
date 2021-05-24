from django.db import models
from abstract.models import TimeStampedModel
from seller.models import Seller

''' Each product has the seller as foreign key to identify the owner.
    Qunatity greater than 0 will be considered as active else sold out.
'''

class Product(TimeStampedModel):
    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    total_quantity = models.IntegerField(default=0)
    current_quantity = models.IntegerField(default=0)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)

