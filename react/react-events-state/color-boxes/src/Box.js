import { useState } from 'react';
import './Box.css'
import { choice } from './helpers';

const Box = (props) => {
    const [color, setColor] = useState(choice(props.colors));

    const randColor = () => {
        let newColor;
        do {
            newColor = choice(props.colors);
        } while (newColor === color);
        setColor(newColor);
    };
    const handleClick = () => {
        randColor();
        console.log('clicked');
    }

    return (
        <div className='Box'
            style={{ backgroundColor: color }}
            onClick={handleClick} >
            <p>{color}</p>
        </div >
    );
};

export default Box;