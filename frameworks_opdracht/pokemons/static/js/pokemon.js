document.addEventListener("DOMContentLoaded", async function () {
    const nameInput = document.getElementById("id_name");
    const description_in = document.getElementById("id_description");

    if (!nameInput || !description_in) {
        return;
    }

    const datalist = document.createElement("datalist");
    datalist.id = "pokemonlist";

    document.body.appendChild(datalist);

    nameInput.setAttribute("list", "pokemonlist");

    let pokenames = [];

    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon-species?limit=2000"
        );

        const x = await response.json();

        pokenames = x.results.map(function (pokemon) {
            return pokemon.name;
        });
    } catch (error) {
        print(error)
    }

    nameInput.addEventListener("input", function () {
        const search = nameInput.value.toLowerCase();

        datalist.innerHTML = "";

        if (search.length < 2) {
            return;
        }

        const matches = pokenames
            .filter(function (name) {
                return name.startsWith(search);
            }).slice(0, 10);

        matches.forEach(function (name) {
            const option = document.createElement("option");
            option.value = name;
            datalist.appendChild(option);
        });
    });

    nameInput.addEventListener("change", async function () {
        const input = nameInput.value.toLowerCase().trim();

        if (!pokenames.includes(input)) {
            return;
        }

        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${input}`
            );

            if (!response.ok) {
                return;
            }

            const x = await response.json();

            const description = x.flavor_text_entries.find(
                function (entry) {
                    return entry.language.name === "en";
                }
            );

            if (description) {
                description_in.value = description.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ");
            }
        } catch (error) {
            print(error)
        }
    });
});
// function capitalizeFirstLetter(val) {
//     return String(val).charAt(0).toUpperCase() + String(val).slice(1);
// }