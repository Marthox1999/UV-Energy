from rest_framework import routers
from .api import BillListViewSet

router = routers.DefaultRouter()
router.register(r'billList', BillListViewSet, 'billList')

urlpatterns = router.urls