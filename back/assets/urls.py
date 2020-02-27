from rest_framework import routers
from .api import ElectricTransformerViewSet, SubStationViewSet

router = routers.DefaultRouter()

router.register(r'ElectricTransformer',
                ElectricTransformerViewSet,
                'ElectricTransformer')

router.register(r'Substation',
                SubStationViewSet,
                'Substation')

urlpatterns = router.urls
