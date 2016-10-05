# -*- coding: utf-8 -*-
import sys
from django import forms
# from django.core.validators import RegexValidator
reload(sys)
sys.setdefaultencoding('utf-8')

class PpatlovClientForm(forms.Form):
    # Username is for information purposes only. Will be printed in the template.

    looking_for = forms.CharField(
        max_length=255,
        widget=forms.TextInput(attrs={
            'placeholder': "I am looking for...",
            "class": "no-label form-control"
            }
        ),
    )

    location = forms.CharField(
        max_length=255,
        widget=forms.TextInput(attrs={
            'placeholder': "Location",
            "class": "no-label form-control"
            }
        ),
    )

    def __init__(self, *args, **kwargs):
        self.spawns_classes = {}
        self.settings = {}
        if "prm" in kwargs.keys():
            self._prm = kwargs.pop('prm')

        super(PpatlovClientForm, self).__init__(*args, **kwargs)

        # add Search Button
        self.buttons = [
            {"id": "search_button",
             "class": "btn btn-primary",
             "type": "submit",
             "name": "search_button",
             "value": "%s" % "Search".encode("utf-8")},
        ]