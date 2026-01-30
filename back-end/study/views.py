from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.db import transaction

from .models import Deck, Flashcard, CardState, ReviewHistory
from .serializers import DeckSerializer, FlashcardSerializer
from .utils.fsrs_scheduler import schedule_review

class DeckListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        decks = Deck.objects.filter(usuario=request.user)
        serializer = DeckSerializer(decks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DeckSerializer(data=request.data)
        if serializer.is_valid():
            deck = serializer.save(usuario=request.user)
            return Response(
                DeckSerializer(deck).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FlashcardListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, deck_id):
        flashcards = Flashcard.objects.filter(
            deck_id=deck_id,
            deck__usuario=request.user
        )
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data)

    def post(self, request, deck_id):
        try:
            deck = Deck.objects.get(id=deck_id, usuario=request.user)
        except Deck.DoesNotExist:
            return Response(
                {"error": "Deck não encontrado ou não pertence a você"},
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()
        data['deck'] = deck.id

        serializer = FlashcardSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RevisoesHojeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        agora = timezone.now()

        estados = CardState.objects.filter(
            usuario=request.user,
            data_vencimento__lte=agora
        ).select_related('flashcard', 'flashcard__deck')

        dados = []
        for estado in estados:
            fc = estado.flashcard
            dados.append({
                "flashcard_id": fc.id,
                "deck_nome": fc.deck.nome,
                "texto_origem": fc.texto_origem,
                "texto_alvo": fc.texto_alvo,
                "url_imagem": fc.url_imagem,
                "url_audio": fc.url_audio,
                "tipo": fc.tipo,
                "dificuldade_atual": float(estado.dificuldade),
                "estabilidade_atual": float(estado.estabilidade),
                "recuperabilidade_atual": float(estado.recuperabilidade),
            })

        return Response({
            "revisoes_pendentes": len(dados),
            "cartoes": dados
        })

class RegistrarRevisaoView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, flashcard_id):

        try:
            flashcard = Flashcard.objects.get(
                id=flashcard_id,
                deck__usuario=request.user
            )
        except Flashcard.DoesNotExist:
            return Response(
                {"error": "Flashcard não encontrado ou não pertence a você"},
                status=status.HTTP_404_NOT_FOUND
            )

        estado, created = CardState.objects.get_or_create(
            flashcard=flashcard,
            usuario=request.user,
            defaults={
                'dificuldade': 5.0,
                'estabilidade': 0.5,
                'data_vencimento': timezone.now(),
                'recuperabilidade': 0.9,
                'parametros': {},
            }
        )

        avaliacao = request.data.get('avaliacao')
        try:
            avaliacao = int(avaliacao)
        except (TypeError, ValueError):
            return Response(
                {"error": "Avaliação inválida"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if avaliacao not in [1, 2, 3, 4]:
            return Response(
                {"error": "Avaliação deve ser 1, 2, 3 ou 4"},
                status=status.HTTP_400_BAD_REQUEST
            )

        current_state = {
            'estabilidade': estado.estabilidade,
            'dificuldade': estado.dificuldade,
            'due_date': estado.data_vencimento,
        }

        novo_estado = schedule_review(current_state, avaliacao)

        estabilidade_antes = estado.estabilidade
        dificuldade_antes = estado.dificuldade

        estado.estabilidade = novo_estado['stability']
        estado.dificuldade = novo_estado['difficulty']
        estado.data_vencimento = novo_estado['due_date']
        estado.recuperabilidade = novo_estado['retrievability']
        estado.data_ultima_revisao = timezone.now()
        estado.save()

        ReviewHistory.objects.create(
            usuario=request.user,
            flashcard=flashcard,
            avaliacao=avaliacao,
            estabilidade_antes=estabilidade_antes,
            estabilidade_depois=novo_estado['stability'],
            dificuldade_antes=dificuldade_antes,
            dificuldade_depois=novo_estado['difficulty'],
            intervalo_dias=novo_estado['interval_days']
        )

        pontos_ganhos = [0, 5, 10, 20][avaliacao - 1]
        user = request.user
        user.pontos += pontos_ganhos

        hoje = timezone.now().date()
        if user.ultima_atividade == hoje:
            user.sequencia_atual += 1
        else:
            user.sequencia_atual = 1

        user.maior_sequencia = max(user.maior_sequencia, user.sequencia_atual)
        user.ultima_atividade = hoje
        user.save()

        return Response({
            "mensagem": "Revisão registrada com sucesso",
            "novo_intervalo_dias": novo_estado['interval_days'],
            "proxima_revisao": novo_estado['due_date'].strftime('%Y-%m-%d'),
            "pontos_ganhos": pontos_ganhos,
            "sequencia_atual": user.sequencia_atual
        })
