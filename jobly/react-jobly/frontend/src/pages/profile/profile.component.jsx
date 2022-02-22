import { useState, useContext, useEffect } from 'react';
import './profile.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../UserContext';

const Profile = ({ changeInfo, error }) => {
    let initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push('/login');
        }

        initialState = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            password: '',
        };

        setFormData(initialState);
    }, [user, history]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await changeInfo(formData);
            if (updated) {
                history.push('/');
            };
        } catch (e) {
            alert(e);
        };
    };

    return (
        <div className='login'>
            <h1>Profile for {user ? user.username.toUpperCase() : ''}</h1>
            <form onSubmit={handleSubmit}>
                <FormInput name='firstName' type='text' autoComplete='first-name' value={formData.firstName} label='first name' required
                    onChange={handleChange}
                />
                <FormInput name='lastName' type='text' autoComplete='last-name' value={formData.lastName} label='last name' required
                    onChange={handleChange}
                />
                <FormInput name='email' type='email' autoComplete='email' value={formData.email} label='email' required
                    onChange={handleChange}
                />
                <FormInput name='password' type='password' autoComplete='current-password' defaultValue='' label='confirm password to make changes' required
                    onChange={handleChange}
                />
                <CustomButton text='save changes' />
            </form>
        </div>
    );
};

export default Profile;