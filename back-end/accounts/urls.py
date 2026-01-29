from django.urls import path
from .views.signup import SignupView
from .views.signin import SigninView
from .views.profile import ProfileView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('signin/', SigninView.as_view(), name='signin'),
    path('profile/', ProfileView.as_view(), name='profile'),
]