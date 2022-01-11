import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.scss';

const DECK_BASE_URL = 'http://deckofcardsapi.com/api/deck/';
const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [keepDrawing, setKeepDrawing] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function getDeck() {
            let deck = await axios.get(`${DECK_BASE_URL}new/shuffle/?deck_count=1`);
            setDeck(deck.data);
        };
        getDeck();
    }, [setDeck]);
    useEffect(() => {
        async function dealCard() {
            let deckId = deck.deck_id;
            try {
                let cardUrl = `${DECK_BASE_URL}${deckId}/draw`;
                let cardRes = await axios.get(cardUrl)
                if (!cardRes.data.success) {
                    setKeepDrawing(false);
                    throw new Error('No cards remaining!')
                }
                let card = cardRes.data.cards[0];
                setDrawn(d => [
                    ...d,
                    {
                        id: card.code,
                        name: `${card.suit} ${card.value}`,
                        image: card.image
                    }
                ]);
            } catch (err) {
                alert(err);
            };
        }
        if (keepDrawing && !timerRef.current) {
            timerRef.current = setInterval(async () => {
                await dealCard();
            }, 1000)
        };
        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [keepDrawing, setKeepDrawing, deck]);

    const toggleKeepDrawing = () => {
        setKeepDrawing(a => !a);
    };

    const cards = drawn.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ));

    return (
        <div className='Deck'>
            <h1>Card Dealer</h1>
            <button className='Deck-btn' onClick={toggleKeepDrawing}>Deal Card</button>

            <div className='Deck-cardholder'>{cards}</div>
        </div>
    );
};

export default Deck;