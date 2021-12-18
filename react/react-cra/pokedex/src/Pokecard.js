import './Pokecard.css';

const PokeAPI = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

function Pokecard(props) {
    let imgSrc = `${PokeAPI}${props.id}.png`
    return (
        <div className='Pokecard'>
            <h1 className='PokecardTitle'>{props.name}</h1>
            <img className='PokecardImg' src={imgSrc} alt='' />
            <div className='PokecardInfo'>Type: {props.type}</div>
            <div className='PokecardInfo'>Experience: {props.base_experience}</div>
        </div>
    );
};

export default Pokecard;