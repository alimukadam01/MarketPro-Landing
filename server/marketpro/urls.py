"""Root URL config — delegates the single API route to the leads app."""
from django.urls import include, path

urlpatterns = [
    path("api/", include("leads.urls")),
]
