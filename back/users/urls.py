from rest_framework import routers
<<<<<<< HEAD
from .api import UserViewSet, ActiveManagerViewSet, ActiveAdminViewSet
=======
from .api import UserViewSet, ProfileViewSet
>>>>>>> emily-163046

router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
<<<<<<< HEAD
router.register('activeManager', ActiveManagerViewSet, 'api-activemanager')
router.register('activeAdmin', ActiveAdminViewSet, 'api-activeadmin')
=======
router.register('profile', ProfileViewSet, base_name='profile')
>>>>>>> emily-163046


urlpatterns = router.urls