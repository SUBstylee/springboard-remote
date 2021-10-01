// **** Pokemon Cards -- Makes 3 cards on button click.  Uncomment console.logs to see data coming in from api in console.

const apiUrl = 'https://pokeapi.co/api/v2/';
const $pokeButton = $('#pokeButton')
const $cardContainer = $('#cardContainer')

$pokeButton.click(async function getPokemon() {
    $cardContainer.empty();
    let pokeArr = [];
    const data = await $.getJSON(`${apiUrl}pokemon`);
    // console.log(data);
    for (let i = 0; i < 3; i++) {
        pokeArr.push(Math.floor(Math.random() * data.count));
    };
    try {
        const pokemonData = await Promise.all(pokeArr.map(num => $.getJSON(`${apiUrl}pokemon/${num}`)));
        // console.log(pokemonData)
        const nameSprite = pokemonData.map(p => ({
            name: p.name,
            sprite: p.sprites.front_default,
        }));
        // console.log(nameSprite);
        const speciesData = await Promise.all(pokeArr.map(num => $.getJSON(`${apiUrl}pokemon-species/${num}`)));
        // console.log(speciesData);
        speciesData.forEach((data, index) => {
            // console.log(data, index);
            const dataText = data.flavor_text_entries.find((text) => text.language.name === 'en');
            const description = dataText ? dataText.flavor_text : 'No description available.';
            const { name, sprite } = nameSprite[index];
            // console.log(name, sprite, description);
            // **** Moved logic into a function (pokemonCard()) to clean up a bit
            $cardContainer.append(pokemonCard(name, sprite, description))
        });
    }
    // **** This catch is recursive on a 404 error. If one or more of the pokemon are missing, it will rerun the function until 3 existing pokemon are found.
    catch (err) {
        if (err.status === 404) getPokemon();
        else return $('#errMsg').text('There was an error getting data from the API, reload the page and try again!');
    }
});

function pokemonCard(name, sprite, description) {
    return `
        <div class-'col'>
            <div class="card h-100">
                <img class="card-img-top" src="${sprite}" alt="Image of ${name}">
                <div class="card-body">
                    <h5 class="card-title text-center">${name}</h5>
                    <p class="card-text">${description}</p>
                </div>
            </div>
        </div>
    `;
};