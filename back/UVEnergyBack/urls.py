from django.contrib import admin
from django.urls import path, include
from assets import urls
from rest_framework import routers
from users import api as api_users
from users.api import CustomObtainAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/assets/', include('assets.urls')),
    path('api/sales/', include('sales.urls')),
    path('api/users/auth/', CustomObtainAuthToken.as_view()),
    path('api/users/', include('users.urls')),
]

router = routers.DefaultRouter()
