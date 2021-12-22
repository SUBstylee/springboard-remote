import heads from './img/heads.png';
import tails from './img/tails.png';

const Coin = (props) => {
    console.log(props);
    return <img src={props.info.side === 'heads' ? heads : tails} alt={props.info.side} />;
};

export default Coin;