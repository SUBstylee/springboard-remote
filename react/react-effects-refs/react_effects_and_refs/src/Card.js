import { useState } from 'react';
import './Card.scss'

const Card = ({ image, name }) => {
    const [{ angle, xPos, yPos }] = useState({
        angle: Math.random() * 90 - 45,
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20
    });

    let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
    return (
        <img style={{ transform: transform }} className="Card" src={image} alt={name} />
    );
};

export default Card;