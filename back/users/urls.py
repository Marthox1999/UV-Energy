from rest_framework import routers
from .api import UserViewSet, ActiveManagerViewSet, ActiveOperatorViewSet

router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
router.register('activeManager', ActiveManagerViewSet, 'api-activemanager')
router.register('activeOperator', ActiveOperatorViewSet, 'api-activeoperator')


urlpatterns = router.urls