from django.shortcuts import render
from ppatlov.forms import PpatlovClientForm
from ppatlov.tables import ForsquareResult


def index(request):
    """
        render client page method
    """
    # prepare client form
    form = PpatlovClientForm(request.POST)

    foursquare_content = ForsquareResult([{
            "name": "pizza",
            "phone_number": "5334430776",
            "checkin_count": "333"}
    ])

    # prepare render parameters
    context_prm = {
        "form": form,
        "foursquare_content": foursquare_content,
    }
    return render(request, 'index.html', context_prm)