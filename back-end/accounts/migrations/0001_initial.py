import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="Idioma",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("codigo", models.CharField(max_length=10, unique=True)),
                ("nome", models.CharField(max_length=100)),
            ],
            options={
                "verbose_name_plural": "Idiomas",
            },
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                ("nome_usuario", models.CharField(max_length=150)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("pontos", models.BigIntegerField(default=0)),
                ("sequencia_atual", models.IntegerField(default=0)),
                ("maior_sequencia", models.IntegerField(default=0)),
                ("ultima_atividade", models.DateField(blank=True, null=True)),
                ("tema", models.CharField(default="light", max_length=50)),
                ("criado_em", models.DateTimeField(default=django.utils.timezone.now)),
                ("is_active", models.BooleanField(default=True)),
                ("is_staff", models.BooleanField(default=False)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Os grupos aos quais este usuário pertence.",
                        related_name="custom_user_set",
                        to="auth.group",
                        verbose_name="grupos",
                    ),
                ),
                (
                    "idioma_alvo",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="usuarios_alvos",
                        to="accounts.idioma",
                    ),
                ),
                (
                    "idioma_nativo",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="usuarios_nativos",
                        to="accounts.idioma",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Permissões específicas para este usuário.",
                        related_name="custom_user_permissions_set",
                        to="auth.permission",
                        verbose_name="permissões de usuário",
                    ),
                ),
            ],
            options={
                "verbose_name": "Usuário",
                "verbose_name_plural": "Usuários",
            },
        ),
    ]
