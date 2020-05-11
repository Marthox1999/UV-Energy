from rest_framework import routers
from .api import BillListViewSet, PaidBillListViewSet, PendingBillListViewSet, GenerateBillViewSet

router = routers.DefaultRouter()
router.register(r'billList', BillListViewSet, 'billList')
router.register(r'paidbillList', PaidBillListViewSet, 'paidbillList')
router.register(r'pendingbillList', PendingBillListViewSet, 'pendingbillList')
router.register(r'generatepdf', GenerateBillViewSet, 'api-generatepdf')

urlpatterns = router.urls