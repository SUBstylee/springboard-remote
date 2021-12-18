import './Pokedex.css'
import Pokecard from './Pokecard';

function Pokedex(props) {
    let status;
    if (props.isWinner) {
        status = <h1 className='PokedexWinner'>WINNER!</h1>
    } else {
        status = <h1 className='PokedexLoser'>LOSER!</h1>
    }
    return (
        <div className='Pokedex'>
            <h4>Total Experience: {props.exp}</h4>
            {status}
            <div className='PokedexCards'>
                {props.pokemon.map(p => (
                    <Pokecard
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        type={p.type}
                        base_experience={p.base_experience}
                    />
                ))}
            </div>
        </div>
    );
};

export default Pokedex;