from rest_framework import routers

from .api import UserViewSet, ActiveManagerViewSet, ActiveAdminViewSet, ActiveOperatorViewSet, ActiveClientViewSet,ProfileViewSet, CreateClientViewSet

router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
router.register('activeManager', ActiveManagerViewSet, 'api-activemanager')
router.register('activeAdmin', ActiveAdminViewSet, 'api-activeadmin')
router.register('activeOperator', ActiveOperatorViewSet, 'api-activeoperator')
router.register('activeClient', ActiveClientViewSet, 'api-activeclient')
router.register('createClient', CreateClientViewSet, 'createClient')


urlpatterns = router.urls
