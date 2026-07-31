"""
Lead capture view — the single API endpoint.

POST /api/leads/  ->  { name, business_name, phone, painpoint?, company? }

Flow: honeypot check -> validate -> store -> notify_operator -> 201.
Abuse guard: ScopedRateThrottle (5/hour/IP, configured in settings) + honeypot.

PRIVACY: only the lead's contact fields are stored (see models.Lead). We do NOT
log or analyse form values beyond the operator notification.
"""
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .notifications import notify_operator
from .serializers import LeadSerializer


class LeadCreateView(APIView):
    # Anonymous, public endpoint — throttled by client IP under the "leads" scope.
    throttle_scope = "leads"

    def post(self, request):
        data = request.data

        # --- Honeypot (server-side) ---------------------------------------
        # A filled `company` means a bot. Return a success-shaped 201 WITHOUT
        # storing anything, so the bot gets no useful signal.
        if str(data.get("company", "")).strip():
            return Response({"ok": True}, status=status.HTTP_201_CREATED)

        serializer = LeadSerializer(data=data)
        if not serializer.is_valid():
            # Field-keyed errors; the frontend maps these back onto inputs.
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        lead = serializer.save()

        # Notification stub — console log now, webhook slot for later.
        notify_operator(lead)

        return Response({"ok": True, "id": lead.id}, status=status.HTTP_201_CREATED)
