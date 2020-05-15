from rest_framework import routers

from .api import ElectricTransformerViewSet, SubStationViewSet, ActiveETViewSet, ActiveSubStationViewSet

router = routers.DefaultRouter()

router.register(r'ElectricTransformer',
                ElectricTransformerViewSet,
                'ElectricTransformer')

router.register(r'Substation',
                SubStationViewSet,
                'Substation')

router.register(r'ActiveET', ActiveETViewSet, 'activeET')

router.register(r'activeSubstation', ActiveSubStationViewSet, 'activeSubstation')

urlpatterns = router.urls
