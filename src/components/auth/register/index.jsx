import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import logo from '../../../assets/logo.png';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = (password) => {
        const minLength = 6;
        const alphanumerical = /^(?=.*[A-Za-z])(?=.*\d)/;
        const specialCharacter = /[@$!%*#?&]/;

        if (password.length < minLength) {
            return 'Password must be at least 6 characters long';
        }
        if (!alphanumerical.test(password)) {
            return 'Password must contain at least one number';
        }
        if (!specialCharacter.test(password)) {
            return 'Password must contain at least one special character';
        }
        return '';
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrorMessage(passwordError);
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home'); // Redirect to home page after successful registration
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('Email is already in use');
                } else {
                    setErrorMessage('Failed to create an account. Please try again.');
                }
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <main className="vh-80 d-flex justify-content-center align-items-center">
                <div className="w-50 text-dark p-4 shadow-lg border rounded bg-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center mb-4">
                        <img src={logo} alt="Logo" className='mb-4' style={{ height: '80px' }} />
                        <h3 className="text-dark text-xl font-semibold">Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="mb-3">
                        <div className="form-group">
                            <label className="font-weight-bold text-dark">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-dark">Password</label>
                            <input
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-dark">Confirm Password</label>
                            <input
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        {errorMessage && (
                            <div className="alert alert-danger">{errorMessage}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`btn btn-primary w-100 ${isRegistering ? 'disabled' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-center">
                        Already have an account? <Link to={'/'} className="font-weight-bold text-dark">Log in</Link>
                    </p>

                    
                </div>
            </main>
        </>
    );
};

export default Register;
