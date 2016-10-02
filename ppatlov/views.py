from django.template import RequestContext
from django.shortcuts import render_to_response
from ppatlov.forms import PpatlovClientForm


def index(request):
    prm = { }
    form = PpatlovClientForm(request.POST, prm=prm)
    return render_to_response(
        'index.html',
        {
            "form": form,
        },
        context_instance=RequestContext(request))