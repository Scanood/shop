from django import forms


class AddressForm(forms.Form):
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    province = forms.CharField(required=True)
    city = forms.CharField(required=True)
    street_address = forms.CharField(required=True)
    phone = forms.CharField(required=True, max_length=11)
