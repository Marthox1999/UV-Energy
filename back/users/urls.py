from rest_framework import routers
from .api import UserViewSet, ActiveAdminViewSet

router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
router.register('activeAdmin', ActiveAdminViewSet, 'api-activeadmin')

urlpatterns = router.urls