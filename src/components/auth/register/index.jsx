import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../actions/authActions'; // Redux Thunks
import logo from '../../../assets/logo.png';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Reset error message when the component mounts
        setErrorMessage('');
    }, []);

    useEffect(() => {
        // Handle error from Redux state
        if (error) {
            setErrorMessage(error);
        }
    }, [error]);

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
        setErrorMessage(''); // Reset the error message

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrorMessage(passwordError);
            return;
        }

        try {
            await dispatch(register(email, password));
            navigate('/home'); // Navigate after successful registration
        } catch (err) {
            setErrorMessage(err.message); // Handle any error during registration
        }
    };

    return (
        <>
            {isAuthenticated && <Navigate to={'/home'} replace={true} />}

            <main className="vh-80 d-flex justify-content-center align-items-center">
                <div className="w-50 text-dark p-4 shadow-lg border rounded bg-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center mb-4">
                        <img src={logo} alt="Logo" className='mb-4' style={{ height: '80px' }} />
                        <h3 className="text-dark text-xl font-semibold">Create an Account</h3>
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
                                autoComplete='new-password'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        {errorMessage && (
                            <div className="alert alert-danger" aria-live="polite">{errorMessage}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary w-100 ${loading ? 'disabled' : ''}`}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    <p className="text-center">
                        Already have an account? <Link to={'/'} className="font-weight-bold text-dark">Sign in</Link>
                    </p>
                </div>
            </main>
        </>
    );
};

export default Register;
