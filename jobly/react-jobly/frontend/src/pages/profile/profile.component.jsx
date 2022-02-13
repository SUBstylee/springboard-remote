import './profile.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link } from 'react-router-dom';

const Profile = () => (
    <div className='login'>
        <h1>login</h1>
        <form>
            <FormInput name='first-name' type='text' autoComplete='first-name' defaultValue='' label='first name' required />
            <FormInput name='last-name' type='text' autoComplete='last-name' defaultValue='' label='last name' required />
            <FormInput name='email' type='email' autoComplete='email' defaultValue='' label='email' required />
            <FormInput name='con-password' type='password' autoComplete='current-password' defaultValue='' label='confirm password to make changes' required />
            <CustomButton text='save changes' />
        </form>
    </div>
);

export default Profile;