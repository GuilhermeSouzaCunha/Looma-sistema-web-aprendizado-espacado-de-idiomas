from django.contrib import admin
from .models import Idioma, User

@admin.register(Idioma)
class IdiomaAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nome') 
    search_fields = ('nome', 'codigo')  
    list_filter = ('nome',) 

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'nome_usuario', 'idioma_nativo', 'idioma_alvo', 'pontos', 'sequencia_atual')
    search_fields = ('email', 'nome_usuario')
    list_filter = ('idioma_nativo', 'idioma_alvo')