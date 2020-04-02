from rest_framework import routers

from .api import UserViewSet, ActiveManagerViewSet, ActiveAdminViewSet, ActiveOperatorViewSet, ProfileViewSet

router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
router.register('activeManager', ActiveManagerViewSet, 'api-activemanager')
router.register('activeAdmin', ActiveAdminViewSet, 'api-activeadmin')
router.register('activeOperator', ActiveOperatorViewSet, 'api-activeoperator')
router.register('profile', ProfileViewSet, base_name='profile')


urlpatterns = router.urls
