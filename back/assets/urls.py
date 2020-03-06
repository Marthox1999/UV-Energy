from rest_framework import routers
from .api import ElectricTransformerViewSet, SubStationViewSet, ActiveSubStationViewSet

router = routers.DefaultRouter()

router.register(r'ElectricTransformer',
                ElectricTransformerViewSet,
                'ElectricTransformer')

router.register(r'Substation',
                SubStationViewSet,
                'Substation')

router.register(r'activeSubstation', ActiveSubStationViewSet, 'activeSubstation')

urlpatterns = router.urls
