from rest_framework.response import Response
from rest_framework import status
from accounts.authentication import Authentication
from accounts.serializers import UserSerializer
from .base import BaseAPIView
from rest_framework.permissions import AllowAny

class SignupView(BaseAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        try:
            user = Authentication().signup(
                nome_usuario=data.get('nome_usuario'),
                email=data.get('email'),
                password=data.get('password'),
                idioma_nativo_id=data.get('idioma_nativo_id'),
                idioma_alvo_id=data.get('idioma_alvo_id'),
            )
            serializer = UserSerializer(user)
            return Response(
                {"user": serializer.data},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )