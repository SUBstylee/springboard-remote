import './login.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link } from 'react-router-dom';

const Login = () => (
    <div className='login'>
        <h1>login</h1>
        <form>
            <FormInput name='username' type='text' autoComplete='current-username' defaultValue='' label='username' required />
            <FormInput name='password' type='password' autoComplete='current-password' defaultValue='' label='password' required />
            <CustomButton text='sign in!' />
            <Link to='/signup'>
                <CustomButton text='create account' />
            </Link>
        </form>
    </div>
);

export default Login;