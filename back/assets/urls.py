from rest_framework import routers
from .api import ElectricTransformerViewSet, SubStationViewSet

router = routers.DefaultRouter()

router.register('ElectricTransformer',
                ElectricTransformerViewSet,
                'ElectricTransformer')

router.register('Substation',
                SubStationViewSet,
                'Substation')

urlpatterns = router.urls
