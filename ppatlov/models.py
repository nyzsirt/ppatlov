# -*- coding: utf-8 -*-
import sys
from django.db import models
reload(sys)
sys.setdefaultencoding('utf-8')


class Searches(models.Model):
    """
        Search table
    """
    _key = models.BigIntegerField(unique=True, primary_key=True)
    looking_for = models.CharField(max_length=100)
    location = models.CharField(max_length=100)


class ManageSearches(models.Manager):
    """
       This class db process for Search table
    """
    @staticmethod
    def initialize_values(id=1):
        search = Searches(_key=id)
        search.save()
        return search

    @staticmethod
    def get(_key):
        try:
            search = Searches.objects.get(_key=_key)
        except:
            search = ManageSearches.initialize_values(id=_key)
        return search
