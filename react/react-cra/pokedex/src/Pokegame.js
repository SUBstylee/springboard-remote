import './Pokegame.css';
import './Pokedex';
import Pokedex from './Pokedex';

function Pokegame(props) {
    let player1 = [];
    let player2 = [...props.pokemon];
    while (player1.length < player2.length) {
        const rand = Math.floor(Math.random() * player2.length);
        const card = player2.splice(rand, 1)[0];
        player1.push(card);
    }
    const exp1 = player1.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
    const exp2 = player2.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
    return (
        <div>
            <h1>POKEMON!</h1>
            <Pokedex pokemon={player1} exp={exp1} isWinner={exp1 > exp2} />
            <Pokedex pokemon={player2} exp={exp2} isWinner={exp2 > exp1} />
        </div>
    );
};

Pokegame.defaultProps = {
    pokemon: [
        { id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
        { id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
        { id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
        { id: 12, name: 'Butterfree', type: 'flying', base_experience: 178 },
        { id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
        { id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95 },
        { id: 94, name: 'Gengar', type: 'poison', base_experience: 225 },
        { id: 133, name: 'Eevee', type: 'normal', base_experience: 65 }
    ]
};

export default Pokegame;