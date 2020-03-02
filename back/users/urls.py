from rest_framework import routers
from .api import UserViewSet, ActiveManagerViewSet

router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
router.register('activeManager', ActiveManagerViewSet, 'api-activemanager')


urlpatterns = router.urls