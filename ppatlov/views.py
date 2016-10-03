# -*- coding: utf-8 -*-
import sys
import settings
import requests
from datetime import date
from django.shortcuts import render
from ppatlov.forms import PpatlovClientForm
from ppatlov.tables import ForsquareResult

reload(sys)
sys.setdefaultencoding('utf-8')

def get_foursquare_data(looking_for, location):
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
    #
    json_data = requests.get(settings.FOURSQUARE_API_QUERY % fours_api_prm).json()
    print(json_data.keys())

    return []

def index(request):
    """
        render client page method
    """
    table_data = []
    if request.method == 'POST':
        post_prm = request.POST
        # call foursquare api request
        table_data = get_foursquare_data(post_prm["looking_for"], post_prm["location"])
        # parse json data
        table_data = [{
            "name": "pizza",
            "phone_number": "5334430776",
            "checkin_count": "333"}
        ]

    # set result to table
    foursquare_content = ForsquareResult(table_data)

    # prepare client form
    form = PpatlovClientForm(request.POST)

    # prepare render parameters
    context_prm = {
        "form": form,
        "foursquare_content": foursquare_content,
    }
    return render(request, 'index.html', context_prm)