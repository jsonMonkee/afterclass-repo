import hashlib
import hmac
import json
from urllib.parse import quote

import httpx

from app.core.config import get_settings


class RazorpayNotConfigured(RuntimeError):
    pass


def is_configured() -> bool:
    settings = get_settings()
    return bool(settings.razorpay_key_id and settings.razorpay_key_secret)


def is_test_fallback_enabled() -> bool:
    settings = get_settings()
    return settings.app_env.lower() != "production" or settings.afterclass_enable_demo_accounts


def _authorization() -> tuple[str, str]:
    settings = get_settings()
    if not settings.razorpay_key_id or not settings.razorpay_key_secret:
        raise RazorpayNotConfigured("Razorpay is not configured.")
    return settings.razorpay_key_id, settings.razorpay_key_secret


def create_order(*, amount: int, receipt: str, notes: dict) -> dict:
    if not is_configured():
        if is_test_fallback_enabled():
            return {
                "id": f"order_test_{receipt[:18]}",
                "amount": amount,
                "currency": "INR",
                "receipt": receipt,
                "status": "created",
                "notes": notes,
                "is_test_mode": True,
            }
        raise RazorpayNotConfigured("Razorpay is not configured.")

    response = httpx.post(
        "https://api.razorpay.com/v1/orders",
        auth=_authorization(),
        json={"amount": amount, "currency": "INR", "receipt": receipt, "notes": notes},
        timeout=20,
    )
    response.raise_for_status()
    data = response.json()
    if not data.get("id"):
        raise RuntimeError("Razorpay order could not be created.")
    return data


def fetch_payment(payment_id: str) -> dict:
    if payment_id.startswith("pay_test_") and is_test_fallback_enabled():
        return {
            "id": payment_id,
            "entity": "payment",
            "amount": 29900,
            "currency": "INR",
            "status": "captured",
            "order_id": payment_id.replace("pay_", "order_"),
        }

    response = httpx.get(
        f"https://api.razorpay.com/v1/payments/{quote(payment_id, safe='')}",
        auth=_authorization(),
        timeout=20,
    )
    response.raise_for_status()
    data = response.json()
    if not data.get("id"):
        raise RuntimeError("Razorpay payment could not be verified.")
    return data


def _valid_hex_signature(signature: str | None, expected: str) -> bool:
    if not signature:
        return False
    try:
        bytes.fromhex(signature)
        bytes.fromhex(expected)
    except ValueError:
        return False
    return hmac.compare_digest(signature.lower(), expected.lower())


def verify_checkout_signature(order_id: str, payment_id: str, signature: str) -> bool:
    if is_test_fallback_enabled() and (order_id.startswith("order_test_") or payment_id.startswith("pay_test_")):
        return True

    secret = get_settings().razorpay_key_secret
    if not secret:
        return False
    expected = hmac.new(secret.encode(), f"{order_id}|{payment_id}".encode(), hashlib.sha256).hexdigest()
    return _valid_hex_signature(signature, expected)


def verify_webhook_signature(raw_body: bytes, signature: str | None) -> bool:
    secret = get_settings().razorpay_webhook_secret
    if not secret:
        return False
    expected = hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return _valid_hex_signature(signature, expected)
