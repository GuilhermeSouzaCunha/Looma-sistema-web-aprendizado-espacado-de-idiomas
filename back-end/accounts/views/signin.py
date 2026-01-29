from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.authentication import Authentication
from accounts.serializers import UserSerializer
from .base import BaseAPIView
from rest_framework.permissions import AllowAny

class SigninView(BaseAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Authentication().signin(email, password)
            refresh = RefreshToken.for_user(user)

            serializer = UserSerializer(user)
            extras = self.get_user_data(user)

            return Response({
                "user": serializer.data,
                "extras": extras,
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            })
        except Exception as e:return Response({"error": str(e)},status=401)