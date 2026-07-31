"""
Operator notification stub.

On each new lead we call `notify_operator(lead)`. For v1 this just logs to the
console. The clearly-marked slot below is where an email / WhatsApp webhook
integration drops in later — nothing else in the flow needs to change.
"""
import logging

from .models import Lead

logger = logging.getLogger("leads")


def notify_operator(lead: Lead) -> None:
    """Alert the operator that a new demo request arrived."""
    logger.info(
        "NEW LEAD #%s: %s | %s | %s | painpoint=%s",
        lead.id,
        lead.name,
        lead.business_name,
        lead.phone,
        lead.painpoint or "-",
    )

    # ---------------------------------------------------------------------
    # INTEGRATION SLOT (future): send an email or POST to a WhatsApp webhook.
    # Example:
    #   requests.post(settings.WHATSAPP_WEBHOOK_URL, json={
    #       "to": settings.OPERATOR_NUMBER,
    #       "text": f"New Market Pro lead: {lead.name} {lead.phone}",
    #   })
    # Keep it best-effort and non-blocking so a webhook outage never breaks
    # lead capture.
    # ---------------------------------------------------------------------
