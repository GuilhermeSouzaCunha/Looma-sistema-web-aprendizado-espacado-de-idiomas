from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class Idioma(models.Model):
    codigo = models.CharField(max_length=10, unique=True)  # ex: 'pt', 'en', 'es'
    nome = models.CharField(max_length=100)               # ex: 'Português', 'Inglês'

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = "Idiomas"

class UserManager(BaseUserManager):
    def create_user(self, email, nome_usuario, password=None, **extra_fields):
        if not email:
            raise ValueError('Usuário deve ter um email')
        email = self.normalize_email(email)
        user = self.model(email=email, nome_usuario=nome_usuario, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nome_usuario, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, nome_usuario, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    nome_usuario = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    idioma_nativo = models.ForeignKey(Idioma, related_name='usuarios_nativos', null=True, blank=True, on_delete=models.SET_NULL)
    idioma_alvo = models.ForeignKey(Idioma, related_name='usuarios_alvos', null=True, blank=True, on_delete=models.SET_NULL)
    pontos = models.BigIntegerField(default=0)
    sequencia_atual = models.IntegerField(default=0)
    maior_sequencia = models.IntegerField(default=0)
    ultima_atividade = models.DateField(null=True, blank=True)
    tema = models.CharField(max_length=50, default='light')
    criado_em = models.DateTimeField(default=timezone.now)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome_usuario']

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='Os grupos aos quais este usuário pertence.',
        verbose_name='grupos',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Permissões específicas para este usuário.',
        verbose_name='permissões de usuário',
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"