import './Meme.scss';
import MemeButton from '../MemeButton/MemeButton';

const Meme = ({ topText, bottomText, url, id, deleteMeme }) => {

    const handleDelete = () => {
        deleteMeme(id);
    };

    return (
        <div id={id} className='Meme'>
            <div className='container'>
                <span className='top-text'>{topText}</span>
                <img src={url} alt='meme image' />
                <span className='bottom-text'>{bottomText}</span>
                <MemeButton onClick={handleDelete} text='DELETE' />
            </div>
        </div>
    );
};

export default Meme;