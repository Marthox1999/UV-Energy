from rest_framework import routers
from .api import UserViewSet, ActiveManagerViewSet, ActiveOperatorViewSet, ActiveAdminViewSet
router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
router.register('activeManager', ActiveManagerViewSet, 'api-activemanager')
router.register('activeOperator', ActiveOperatorViewSet, 'api-activeoperator')
router.register('activeAdmin', ActiveAdminViewSet, 'api-activeadmin')

urlpatterns = router.urls