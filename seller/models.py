from django.db import models
from abstract.models import TimeStampedModel
from user.models import FranchiseUser
# Create your models here.

''' Each individual seller must be unique user.
    User is used as foreign key so that any other role can be extended from user.
'''

class Seller(TimeStampedModel):
    user = models.ForeignKey(FranchiseUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.name