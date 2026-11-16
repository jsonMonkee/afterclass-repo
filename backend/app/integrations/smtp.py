from email.message import EmailMessage
import logging
import smtplib

from app.core.config import get_settings

logger = logging.getLogger("afterclass.smtp")


def is_smtp_configured() -> bool:
    settings = get_settings()
    return bool(settings.smtp_host and settings.smtp_user and settings.smtp_password)


def send_email(
    *,
    to_email: str,
    subject: str,
    body_text: str,
    body_html: str | None = None,
) -> bool:
    if not is_smtp_configured():
        logger.info("Custom SMTP not configured; skipping direct email dispatch.")
        return False

    settings = get_settings()
    msg = EmailMessage()
    msg["Subject"] = subject
    from_addr = settings.smtp_from_email or settings.smtp_user
    msg["From"] = f"{settings.smtp_from_name} <{from_addr}>"
    msg["To"] = to_email
    msg.set_content(body_text)

    if body_html:
        msg.add_alternative(body_html, subtype="html")

    try:
        if settings.smtp_port == 465:
            with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, timeout=10) as server:
                server.login(settings.smtp_user, settings.smtp_password)
                server.send_message(msg)
        else:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
                server.starttls()
                server.login(settings.smtp_user, settings.smtp_password)
                server.send_message(msg)
        logger.info("Successfully sent email to %s via SMTP %s", to_email, settings.smtp_host)
        return True
    except Exception as exc:
        logger.error("Failed to send email to %s via SMTP %s: %s", to_email, settings.smtp_host, exc)
        return False
