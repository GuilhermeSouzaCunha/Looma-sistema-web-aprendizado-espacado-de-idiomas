from fsrs import Card, Rating, Scheduler
from datetime import date, timezone, timedelta
from django.utils import timezone as dj_timezone

RATING_MAP = {
    1: Rating.Again,
    2: Rating.Hard,
    3: Rating.Good,
    4: Rating.Easy
}

def schedule_review(current_state, grade):
    scheduler = Scheduler()

    due_date = current_state.get('due_date')
    if due_date:
        if isinstance(due_date, date):
            due_date = dj_timezone.datetime.combine(
                due_date,
                dj_timezone.datetime.min.time()
            )
        if due_date.tzinfo is None:
            due_date = dj_timezone.make_aware(due_date, timezone.utc)
        else:
            due_date = due_date.astimezone(timezone.utc)

    card = Card(
        due=due_date,
        stability=float(current_state.get('estabilidade', 0.5)),
        difficulty=float(current_state.get('dificuldade', 5.0)),
    )

    now = dj_timezone.now().astimezone(timezone.utc)

    rating = RATING_MAP.get(grade)
    if rating is None:
        raise ValueError("Grade inválida: use 1 a 4")

    scheduler.review_card(card, rating, now)

    intervalo_days = 1
    if card.due:
        intervalo_days = max(
            1,
            round((card.due - now).total_seconds() / 86400)
        )

    nova_vencimento = (
        card.due.date()
        if card.due
        else (now + timedelta(days=intervalo_days)).date()
    )

    return {
        'stability': card.stability,
        'difficulty': card.difficulty,
        'due_date': nova_vencimento,
        'interval_days': intervalo_days,
        'retrievability': scheduler.get_card_retrievability(card, now)
    }
