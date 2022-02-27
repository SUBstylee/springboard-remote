import FormInputs from "../FormInputs/FormInputs";
import { useState } from "react";

const PostForm = ({ save, cancel }) => {

    const [postData, setPostData] = useState({
        title: '',
        description: '',
        body: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');
        save();
    };

    const handleChange = (e) => {
        console.log('change');
        const { name, value } = e.target;
        setPostData(data => ({ ...data, [name]: value }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormInputs
                    name='title'
                    text='Title:'
                    handleChange={handleChange}
                    value={postData.title}
                />
                <FormInputs
                    name='description'
                    text='Description'
                    handleChange={handleChange}
                    value={postData.description}
                />
                <div className="form-group">
                    <label htmlFor="body">Body:</label>
                    <textarea
                        onChange={handleChange}
                        className='form-control'
                        id="body"
                        name="body"
                        rows={10}
                        value={postData.body}
                    />
                </div>
                <button className="btn btn-primary mr-2">SAVE</button>
                <button onClick={cancel} className="btn btn-warning">CANCEL</button>
            </form>
        </div>
    )
};

export default PostForm;