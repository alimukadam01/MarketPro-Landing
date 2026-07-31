"""
Lead serializer — server-side validation.

Mirrors the client validation so the API is safe even if the frontend is
bypassed: required name, required business_name, Pakistani-mobile phone
(normalised). painpoint is optional free text.

The honeypot field `company` is declared here as write-only and is NEVER
persisted — the view inspects it to drop bots.
"""
from rest_framework import serializers

from .models import Lead
from .validators import normalize_pk_mobile


class LeadSerializer(serializers.ModelSerializer):
    # Honeypot: humans never see this; a non-empty value signals a bot. Declared
    # write-only + not required so it round-trips through validation but is not
    # part of the stored model.
    company = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Lead
        fields = ["id", "name", "business_name", "phone", "painpoint", "company", "created_at", "status"]
        read_only_fields = ["id", "created_at", "status"]

    def validate_name(self, value: str) -> str:
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Naam zaroori hai.")
        return value

    def validate_business_name(self, value: str) -> str:
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Business ka naam zaroori hai.")
        return value

    def validate_phone(self, value: str) -> str:
        normalized = normalize_pk_mobile(value)
        if normalized is None:
            raise serializers.ValidationError("Sahih mobile number likhein (03XXXXXXXXX).")
        return normalized

    def create(self, validated_data: dict) -> Lead:
        # Drop the honeypot before persisting — it is not a model field.
        validated_data.pop("company", None)
        return super().create(validated_data)
