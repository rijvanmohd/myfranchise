from django.contrib import admin
from django.contrib.auth.forms import AdminPasswordChangeForm,ReadOnlyPasswordHashField
from django_extensions.admin import ForeignKeyAutocompleteAdmin
from django.forms.models import ModelForm
from django.contrib.auth.models import Permission
from .models import FranchiseUser
# Register your models here.

class UserForm(ModelForm):
    password = ReadOnlyPasswordHashField(label=("Password"),
                                         help_text=("Raw passwords are not stored, so there is no way to see "
                                                    "this user's password"))

    class Meta:
        model = FranchiseUser
        exclude = ()

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial.get("password")

class FranchiseUserAdmin(ForeignKeyAutocompleteAdmin):
    model = FranchiseUser
    form = UserForm
    change_password_form = AdminPasswordChangeForm
    change_user_password_template = None

    list_filter = ("is_active", "is_staff", "is_superuser", "created_on")
    list_display = ("id", "email")

    search_fields = ("name", "mobile_no")

    fieldsets = (
        (None, {
            'fields': ('name', 'mobile_no', 'email', 'password')
        }),
        ('Powers', {
            "classes": ("collapse",),
            'fields': ('is_active', 'is_superuser', 'is_staff'),
        }),
        ('Dates', {
            'fields': ('last_login', 'date_joined')
        })
    )

admin.site.register(FranchiseUser, FranchiseUserAdmin)
admin.site.register(Permission)