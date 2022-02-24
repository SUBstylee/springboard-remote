import './NewMemeForm.scss';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import MemeInput from '../MemeInput/MemeInput';
import MemeButton from '../MemeButton/MemeButton';



const DEFAULT_FORM = {
    url: '',
    topText: '',
    bottomText: ''
};

const NewMemeForm = ({ addMeme }) => {

    const [form, setForm] = useState(DEFAULT_FORM);

    const handleSubmit = (e) => {
        e.preventDefault();
        addMeme({ ...form, id: uuidv4() })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(data => ({ ...data, [name]: value }));
        console.log(name, value);
    };

    return (
        <div className='NewMemeForm'>
            <form onSubmit={handleSubmit}>
                <MemeInput
                    text='URL'
                    type='text'
                    name='url'
                    id='formUrl'
                    onChange={handleChange}
                    value={form.url}
                />
                <MemeInput
                    text='Top Text'
                    type='text'
                    name='topText'
                    id='formTopText'
                    onChange={handleChange}
                    value={form.topText}
                />
                <MemeInput
                    text='Bottom Text'
                    type='text'
                    name='bottomText'
                    id='formBottomText'
                    onChange={handleChange}
                    value={form.bottomText}
                />
                <MemeButton text='Make Meme' />
            </form>
        </div>
    );
};

export default NewMemeForm;