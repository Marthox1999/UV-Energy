from rest_framework import routers
from .api import BillViewSet, ActiveBillViewSet

router = routers.DefaultRouter()

router.register('bill', BillViewSet,'bill')
router.register('activeBill', ActiveBillViewSet, 'activeBill')

urlpatterns = router.urls