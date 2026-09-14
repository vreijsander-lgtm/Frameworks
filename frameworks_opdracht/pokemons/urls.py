from django.urls import path
from . import views
urlpatterns = [
    path('pokemons/', views.pokemons, name='Pokemons'),
]