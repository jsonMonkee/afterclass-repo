from fastapi import APIRouter

from app.modules.dhanda.businesses import router as businesses_router
from app.modules.dhanda.listings import router as listings_router
from app.modules.dhanda.portal import router as portal_router
from app.modules.dhanda.promotions import router as promotions_router
from app.modules.dhanda.registrations import router as registrations_router

router = APIRouter()
router.include_router(listings_router)
router.include_router(registrations_router)
router.include_router(businesses_router)
router.include_router(portal_router)
router.include_router(promotions_router)
