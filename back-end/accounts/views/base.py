from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

class BaseAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def get_user_data(self, user):
        return {
            "pontos": user.pontos,
            "sequencia_atual": user.sequencia_atual,
            "maior_sequencia": user.maior_sequencia,
        }
