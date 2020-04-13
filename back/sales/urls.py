from rest_framework import routers
from .api import BillViewSet, ActiveBillViewSet, BillListViewSet

router = routers.DefaultRouter()

router.register(r'bill', BillViewSet,'bill')
router.register(r'activeBill', ActiveBillViewSet, 'activeBill')
router.register('billList', BillListViewSet, 'billList')

urlpatterns = router.urls