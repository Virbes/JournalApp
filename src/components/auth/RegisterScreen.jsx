import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    useTitle('Register'); // Change title page


    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const [inputValues, handleInputChange] = useForm({
        name: 'Grizx',
        email: 'nbxvg@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = inputValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        }

        if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'));
            return false;
        }

        if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleRegister}>

                {
                    msgError &&
                    <div className="auth__alert-error">{msgError}</div>
                }


                <input className='auth__input' type="text" name='name' value={name} onChange={handleInputChange} placeholder='Name' autoComplete='off' />
                <input className='auth__input' type="email" name='email' value={email} onChange={handleInputChange} placeholder='Email' autoComplete='off' />
                <input className='auth__input' type="password" name='password' value={password} onChange={handleInputChange} placeholder='Password' />
                <input className='auth__input' type="password" name='password2' value={password2} onChange={handleInputChange} placeholder='Confirm Password' />

                <button
                    className='btn btn-primary btn-block'
                    type="submit"
                >
                    Register
                </button>

                <Link className='link d-block mt-3' to='/auth/login'>Already registered?</Link>
            </form>
        </>
    );
}
