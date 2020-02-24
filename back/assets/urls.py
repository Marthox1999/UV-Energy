from rest_framework import routers
from .api import ElectricTransformerViewSet

router = routers.DefaultRouter()
router.register('/ElectricTransformer',
                ElectricTransformerViewSet,
                'ElectricTransformer')

urlpatterns = router.urls
