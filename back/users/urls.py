from rest_framework import routers
<<<<<<< HEAD
from .api import UserViewSet, ActiveManagerViewSet, ActiveOperatorViewSet
=======
from .api import UserViewSet, ActiveManagerViewSet, ActiveAdminViewSet
>>>>>>> 252118337ee25df853407b8072411748fc8f857b

router = routers.DefaultRouter()

router.register('user', UserViewSet, 'api-user')
router.register('activeManager', ActiveManagerViewSet, 'api-activemanager')
<<<<<<< HEAD
router.register('activeOperator', ActiveOperatorViewSet, 'api-activeoperator')
=======
router.register('activeAdmin', ActiveAdminViewSet, 'api-activeadmin')
>>>>>>> 252118337ee25df853407b8072411748fc8f857b


urlpatterns = router.urls