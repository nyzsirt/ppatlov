# -*- coding: utf-8 -*-
import sys
import settings
import requests
from pprint import pprint
from datetime import date
from django.db import transaction
from django.shortcuts import render
# from ppatlov.models import ManageSearches
from ppatlov.models import Searches
from ppatlov.forms import PpatlovClientForm
from ppatlov.tables import ForsquareResult

reload(sys)
sys.setdefaultencoding('utf-8')

def get_foursquare_data(looking_for, location, mode="post"):
    """
    get data and create list from request result.
    :return:
    """
    # produce true date format
    today = str(date.today().year)
    today += str(date.today().month) if date.today().month / 10 >= 1 else "0" + str(date.today().month)
    today += str(date.today().day) if date.today().day / 10 >= 1 else "0" + str(date.today().day)
    # prepare api parameter
    fours_api_prm = {
        "clid": settings.FOURSQUARE_CLIENT_ID,
        "clsec": settings.FOURSQUARE_CLIENT_SECRET,
        "location": location,
        "looking_for": looking_for,
        "date": today,
    }

    try:
        # call foursquare api
        data = requests.get(settings.FOURSQUARE_API_QUERY % fours_api_prm).json()
    except:
        return []

    return_table_data = []
    # parse api result according to table model
    if data["meta"]["code"] == 200:
        # dont save search when search come from previous search link
        if mode == "post":
            Searches(looking_for=looking_for, location=location).save()

        for venue in data["response"]["venues"]:
            new_venue = {}
            new_venue["name"] = venue["name"]
            new_venue["phone_number"] = ""
            if venue["contact"]:
                new_venue["phone_number"] = venue["contact"].get("formattedPhone", venue["contact"].get("phone", ""))

            new_venue["checkin_count"] = venue["stats"]["checkinsCount"]
            return_table_data.append(new_venue)

    return return_table_data


def index(request):
    """
        render client page method
    """
    table_data = []
    # get previous searches and prepare search list
    search_content = []
    for search in Searches.objects.order_by("-_key")[:20]:
        search_content.append({
            "text": "%s in %s." % (search.looking_for, search.location,),
            "looking_for": search.looking_for,
            "location": search.location,
        })

    # get data previous search coming from link
    get_prm = request.GET
    if get_prm:
        if get_prm.get("looking_for") and get_prm.get("looking_for"):
            table_data = get_foursquare_data(get_prm["looking_for"], get_prm["location"], "get")

    if request.method == 'POST':
        post_prm = request.POST

        # call foursquare api request
        table_data = get_foursquare_data(post_prm["looking_for"], post_prm["location"])

    # set result to table
    foursquare_content = ForsquareResult(table_data)

    # prepare client form
    form = PpatlovClientForm(request.POST)

    # prepare render parameters
    context_prm = {
        "form": form,
        "foursquare_content": foursquare_content,
        "search_content": search_content,
    }
    return render(request, 'index.html', context_prm)