from rest_framework import routers
from .api import UserViewSet, ProfileViewSet

router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
router.register('profile', ProfileViewSet, base_name='profile')


urlpatterns = router.urls