from django.db import models
from django.conf import settings
from accounts.models import Idioma

class Deck(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='decks')
    nome = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    idioma = models.ForeignKey(Idioma, on_delete=models.SET_NULL, null=True, related_name='decks')
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome} ({self.usuario.nome_usuario})"

    class Meta:
        ordering = ['-criado_em']

class Flashcard(models.Model):
    TIPOS = (
        ('basic', 'Básico (frente/verso)'),
        ('translation', 'Tradução com imagem'),
        ('sentence', 'Frase'),
        ('dialog', 'Diálogo'),
    )

    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name='flashcards')
    texto_origem = models.TextField()         
    texto_alvo = models.TextField()
    url_imagem = models.URLField(blank=True, null=True)
    url_audio = models.URLField(blank=True, null=True)
    tipo = models.CharField(max_length=20, choices=TIPOS, default='basic')
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.texto_origem[:50]}... → {self.texto_alvo[:50]}..."

    class Meta:
        ordering = ['criado_em']

class CardState(models.Model):
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE, related_name='estados')
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='card_states')
    dificuldade = models.FloatField(default=5.0)
    estabilidade = models.FloatField(default=0.5)
    data_vencimento = models.DateTimeField()
    data_ultima_revisao = models.DateTimeField(null=True, blank=True)
    recuperabilidade = models.FloatField(default=0.9)
    parametros = models.JSONField(default=dict)

    class Meta:
        unique_together = ('flashcard', 'usuario')
        indexes = [models.Index(fields=['data_vencimento'])]

    def __str__(self):
        return f"Estado de {self.flashcard} para {self.usuario}"

class ReviewHistory(models.Model):
    AVALIACOES = (
        (1, 'Again'),
        (2, 'Hard'),
        (3, 'Good'),
        (4, 'Easy'),
    )

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE)
    avaliacao = models.PositiveSmallIntegerField(choices=AVALIACOES)
    data_revisao = models.DateTimeField(auto_now_add=True)
    estabilidade_antes = models.FloatField()
    estabilidade_depois = models.FloatField()
    dificuldade_antes = models.FloatField()
    dificuldade_depois = models.FloatField()
    intervalo_dias = models.PositiveIntegerField()

    class Meta:
        ordering = ['-data_revisao']
        
class FsrsConfig(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    weights = models.JSONField()
    atualizado_em = models.DateTimeField(auto_now=True)