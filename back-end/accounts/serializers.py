from rest_framework import serializers
from .models import User, Idioma

class IdiomaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idioma
        fields = ['id', 'codigo', 'nome']

class UserSerializer(serializers.ModelSerializer):
    idioma_nativo = IdiomaSerializer(read_only=True)
    idioma_alvo = IdiomaSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'nome_usuario', 'email', 'idioma_nativo', 'idioma_alvo',
            'pontos', 'sequencia_atual', 'maior_sequencia', 'ultima_atividade',
            'tema', 'criado_em'
        ]
        read_only_fields = ['id', 'pontos', 'sequencia_atual', 'maior_sequencia', 'ultima_atividade', 'criado_em']