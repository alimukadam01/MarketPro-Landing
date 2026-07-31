"""
Django settings — Market Pro lead-capture backend.

Minimal by design: one app (`leads`), one endpoint, SQLite storage, DRF for
validation + IP throttling. No auth, no payments, no dashboards — lead-gen only.
"""
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# --- Security ---------------------------------------------------------------
# DEV secret key. In production, load from an env var and NEVER commit a real
# one. This value is safe to ship only because this service stores no secrets
# and has no auth surface.
SECRET_KEY = "dev-insecure-marketpro-key-change-in-production"

# Toggle off in production. Leaving True here for local development.
DEBUG = True

# Frontend is served same-origin via the Vite dev proxy (/api → :8000), so no
# CORS package is required. Add hosts here for real deployments.
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"]

# --- Apps -------------------------------------------------------------------
INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",  # required by contenttypes; no login is exposed
    "rest_framework",
    "leads",
]

MIDDLEWARE = [
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "marketpro.urls"
WSGI_APPLICATION = "marketpro.wsgi.application"

TEMPLATES = []  # No server-rendered templates — API only.

# --- Database ---------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "leads.sqlite3",
    }
}

# --- DRF: IP rate-limit (abuse guard) --------------------------------------
# ScopedRateThrottle keys on client IP for anonymous requests. The lead endpoint
# is capped at 5 submissions/hour/IP per the brief.
REST_FRAMEWORK = {
    # JSON only. Without this, DRF also enables the Browsable API
    # (BrowsableAPIRenderer), which renders an HTML template — but this backend
    # has no template engine (TEMPLATES = []), so a browser GET would crash with
    # TemplateDoesNotExist: rest_framework/api.html. JSON-only keeps it an API.
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.ScopedRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "leads": "5/hour",
    },
    # No authentication classes — the endpoint is public and anonymous.
    "DEFAULT_AUTHENTICATION_CLASSES": [],
    "DEFAULT_PERMISSION_CLASSES": [],
}

# --- Logging ----------------------------------------------------------------
# Surface the `notify_operator` stub on the console so new leads are visible in
# dev. In production this handler would route to a real sink.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
    },
    "loggers": {
        "leads": {"handlers": ["console"], "level": "INFO", "propagate": False},
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
USE_TZ = True
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Karachi"
