import PostForm from "../PostForm/PostForm";
import { useNavigate } from 'react-router-dom';
const NewPost = () => {
    const navigate = useNavigate();

    const save = () => {
        console.log('saved');
        navigate('/')
    };
    const cancel = () => {
        console.log('cancelled');
        navigate('/');
    };

    return (
        <div className="container">
            <h1>New Post</h1>
            <PostForm save={save} cancel={cancel} />
        </div>
    )
};

export default NewPost;