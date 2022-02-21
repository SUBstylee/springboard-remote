import './signup.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const { isLoading, setIsLoading } = useState(true);

    return (
        <div className='signup'>
            <h1>signup</h1>
            <form>
                <FormInput name='username' type='text' autoComplete='new-username' defaultValue='' label='username' required />
                <FormInput name='password' type='password' autoComplete='new-password' defaultValue='' label='password' required />
                <FormInput name='con-password' type='password' autoComplete='new-password' defaultValue='' label='confirm password' required />
                <FormInput name='first-name' type='text' autoComplete='first-name' defaultValue='' label='first name' required />
                <FormInput name='last-name' type='text' autoComplete='last-name' defaultValue='' label='last name' required />
                <FormInput name='email' type='email' autoComplete='email' defaultValue='' label='email' required />
                <CustomButton text='sign up!' />
                <Link to='/login'>
                    <CustomButton text='i have an account' />
                </Link>
            </form>
        </div>
    );
};

export default Signup;