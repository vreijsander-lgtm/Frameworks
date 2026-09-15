from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Pokemon
# Create your views here.
def pokemons(request):
    mypokemon = Pokemon.objects.all().values()
    template = loader.get_template('index.html')
    context = {'pokemons': mypokemon}
    return HttpResponse(template.render(context, request))
def detail(request, id):
    pokemon = Pokemon.objects.get(id=id)
    template = loader.get_template('detail.html')
    context = {'pokemons': pokemon}
    return HttpResponse(template.render(context, request))
