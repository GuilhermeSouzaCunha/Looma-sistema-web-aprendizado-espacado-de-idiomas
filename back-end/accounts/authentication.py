from django.contrib.auth.hashers import check_password, make_password
from rest_framework.exceptions import AuthenticationFailed, APIException
from .models import User

class Authentication:
    def signin(self, email, password):
        if not email or not password:
            raise AuthenticationFailed("Email e senha são obrigatórios")
        user = User.objects.filter(email=email).first()
        if not user or not check_password(password, user.password):
            raise AuthenticationFailed("Credenciais inválidas")
        return user

    def signup(self, nome_usuario, email, password, idioma_nativo_id=None, idioma_alvo_id=None):
        if not nome_usuario or not email or not password:
            raise APIException("Preencha todos os campos obrigatórios")
        if User.objects.filter(email=email).exists():
            raise APIException("Este email já está cadastrado")
        hashed = make_password(password)
        user = User.objects.create(
            nome_usuario=nome_usuario,
            email=email,
            password=hashed,
            idioma_nativo_id=idioma_nativo_id,
            idioma_alvo_id=idioma_alvo_id,
        )
        return user