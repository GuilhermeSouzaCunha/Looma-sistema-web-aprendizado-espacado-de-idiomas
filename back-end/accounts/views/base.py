from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class BaseAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get_user_data(self, user):
        return {
            "pontos": user.pontos,
            "sequencia_atual": user.sequencia_atual,
            "maior_sequencia": user.maior_sequencia,
        }