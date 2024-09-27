import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import logo from '../../../assets/logo.png';

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages

        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage('Failed to sign in. Please try again.');
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch((err) => {
                setIsSigningIn(false);
            });
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="vh-80 d-flex justify-content-center align-items-center ">
                <div className="w-50 text-dark p-4 shadow-lg border rounded bg-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center mb-4">
                        <img src={logo} alt="Logo" className='mb-4' style={{ height: '80px' }} />
                        <h3 className="text-dark text-xl font-semibold">Welcome Back</h3>
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
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        {errorMessage && (
                            <div className="alert alert-danger">{errorMessage}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`btn btn-primary w-100 ${isSigningIn ? 'disabled' : ''}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center">
                        Don't have an account? <Link to={'/register'} className="font-weight-bold text-dark">Sign up</Link>
                    </p>

                    <div className='text-center mb-3'>
                        <span className='text-muted'>OR</span>
                    </div>

                    <button
                        disabled={isSigningIn}
                        onClick={onGoogleSignIn}
                        className={`btn btn-outline-danger w-100`}
                    >
                        Sign in with Google
                    </button>
                </div>
            </main>
        </>
    );
};

export default Login;
