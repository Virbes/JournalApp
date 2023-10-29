import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useTitle } from '../../hooks/useTitle';

export const LoginScreen = () => {

    useTitle('Login');

    const dispatch = useDispatch();

    const [formValues, handleInputchange] = useForm({
        email: 'fran@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={handleLogin}>
                <input
                    className='auth__input'
                    type='email'
                    name='email'
                    autoComplete='off'
                    placeholder='Email'
                    value={email}
                    onChange={handleInputchange}
                />

                <input
                    className='auth__input'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleInputchange}
                />

                <button className='btn btn-primary btn-block' type="submit">Login</button>


                <div className='auth__social-networks'>
                    <p>Login with social networks</p>

                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className='link' to='/auth/register'>Create new account</Link>
            </form>
        </>
    );
}
