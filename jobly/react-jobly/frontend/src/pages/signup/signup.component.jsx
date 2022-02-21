import './signup.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = ({ signup }) => {
    const { isLoading, setIsLoading } = useState(true);
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        conpassword: '',
        fname: '',
        lname: '',
        email: '',
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await signup(formData);
        if (res.success) {
            history.push('/');
        } else {
            setFormErrors(res.errors);
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };


    return (
        <div className='signup'>
            <h1>signup</h1>
            <form>
                <FormInput name='username' type='text' autoComplete='new-username' label='username' required
                    value={formData.username} onChange={handleChange}
                />
                <FormInput name='password' type='password' autoComplete='new-password' label='password' required
                    value={formData.password} onChange={handleChange}
                />
                <FormInput name='conpassword' type='password' autoComplete='new-password' label='confirm password' required
                    value={formData.conpassword} onChange={handleChange}
                />
                <FormInput name='fname' type='text' autoComplete='first-name' label='first name' required
                    value={formData.fname} onChange={handleChange}
                />
                <FormInput name='lname' type='text' autoComplete='last-name' label='last name' required
                    value={formData.lname} onChange={handleChange}
                />
                <FormInput name='email' type='email' autoComplete='email' label='email' required
                    value={formData.email} onChange={handleChange}
                />
                <CustomButton text='sign up!' type='submit' onSubmit={handleSubmit} />
                <Link to='/login'>
                    <CustomButton text='i have an account' />
                </Link>
            </form>
        </div>
    );
};

export default Signup;