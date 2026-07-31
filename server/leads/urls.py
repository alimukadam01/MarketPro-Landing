"""Leads app URLs — the one endpoint."""
from django.urls import path

from .views import LeadCreateView

urlpatterns = [
    # Trailing slash matches the frontend api client (/api/leads/).
    path("leads/", LeadCreateView.as_view(), name="lead-create"),
]
