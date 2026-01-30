from django.urls import path
from .views import DeckListCreateView, FlashcardListCreateView, RevisoesHojeView, RegistrarRevisaoView

urlpatterns = [
    path('decks/', DeckListCreateView.as_view(), name='deck-list-create'),
    path('decks/<int:deck_id>/flashcards/', FlashcardListCreateView.as_view(), name='flashcard-list-create'),
    path('revisoes/', RevisoesHojeView.as_view(), name='revisoes-hoje'),
    path('revisoes/<int:flashcard_id>/', RegistrarRevisaoView.as_view(), name='registrar-revisao'),
]