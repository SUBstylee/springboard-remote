import { useState } from 'react';
import Coin from './Coin';
import { randChoice } from './helpers';
import './CoinFlip.css';

const CoinFlip = (props) => {
    const flipCoin = () => {
        const coinFace = randChoice(props.coins);
        setCurCoin(coinFace)
        setNumFlips(numFlips + 1);
        setCurCoin(coinFace);
        coinFace.side === 'heads' ? setNumHeads(numHeads + 1) : setNumTails(numTails + 1);
    };
    const handleClick = (e) => {
        flipCoin();
    };

    const [curCoin, setCurCoin] = useState(null);
    const [numHeads, setNumHeads] = useState(0);
    const [numTails, setNumTails] = useState(0);
    const [numFlips, setNumFlips] = useState(0);
    return (
        <div className='CoinFlipper'>
            <h2>Flip a coin</h2>
            <div className='coinContainer'>
                {curCoin && <Coin info={curCoin} />}
            </div>
            <button onClick={() => handleClick()}>Flip the coin!</button>
            <p>Out of {numFlips} flips, there have been {numHeads} heads and {numTails} tails.</p>
        </div>
    );
};

CoinFlip.defaultProps = {
    coins: [
        { side: 'heads', imgSrc: '/static/media/heads.c18decbb77b5afdd2ebe.png' },
        { side: 'tails', imgSrc: '/static/media/heads.c18decbb77b5afdd2ebe.png' },
    ]
};

export default CoinFlip;