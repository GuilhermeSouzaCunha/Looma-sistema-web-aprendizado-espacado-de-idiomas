from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.serializers import UserSerializer
from .base import BaseAPIView

class ProfileView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        extras = self.get_user_data(user)
        return Response({
            "user": serializer.data,
            "extras": extras
        })