import heads from './img/heads.png';
import tails from './img/tails.png';

const Coin = (props) => {
    return <img src={props.info === 'heads' ? heads : tails} alt={props.info} />;
};

export default Coin;