from django.contrib import admin
from .models import Pokemon

# Register your models here.]


class PokemonAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    ordering = ('name',)
    #complete the name input field that pokémon from the pokapi autocompletes what name you are typing and also input the description
    class Media:
        js = ('js/pokemon.js',)



admin.site.register(Pokemon, PokemonAdmin)


# admin.site.register(Pokemon)