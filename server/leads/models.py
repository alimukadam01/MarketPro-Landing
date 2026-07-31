"""
Lead model.

PRIVACY CONSTRAINT (per brief): store ONLY the contact fields needed to follow
up on a demo request. No analytics, no tracking, no derived profiling of form
values. The columns below are the whole record.
"""
from django.db import models


class Lead(models.Model):
    STATUS_NEW = "new"
    STATUS_CHOICES = [
        (STATUS_NEW, "New"),
        ("contacted", "Contacted"),
        ("closed", "Closed"),
    ]

    name = models.CharField(max_length=120)
    business_name = models.CharField(max_length=160)
    # Stored in canonical local form 03XXXXXXXXX (normalised by the serializer).
    phone = models.CharField(max_length=15)
    # Free-text: the shopkeeper's biggest manual-bookkeeping pain. Optional.
    painpoint = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_NEW)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} ({self.phone}) — {self.business_name}"
