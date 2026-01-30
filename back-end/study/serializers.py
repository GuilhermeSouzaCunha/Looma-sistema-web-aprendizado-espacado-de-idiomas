from rest_framework import serializers
from .models import Deck, Flashcard, CardState

class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['id', 'nome', 'descricao', 'idioma', 'criado_em']
        read_only_fields = ['id', 'criado_em', 'usuario']

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'deck', 'texto_origem', 'texto_alvo', 'url_imagem', 'url_audio', 'tipo', 'criado_em']
        read_only_fields = ['criado_em']