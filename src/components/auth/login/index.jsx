import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signInWithGoogle } from '../../../actions/authActions';
import logo from '../../../assets/logo.png';

const Login = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (error) {
            // Clear error on input change
            dispatch({ type: 'CLEAR_ERROR' });
        }
    }, [error, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            dispatch(signIn(email, password));
        }
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        if (!loading) {
            dispatch(signInWithGoogle());
        }
    };

    // Check for redirection at the top of the component
    if (isAuthenticated) {
        return <Navigate to={'/home'} replace={true} />;
    }

    return (
        <main className="vh-80 d-flex justify-content-center align-items-center">
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

                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-100 ${loading ? 'disabled' : ''}`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center">
                    Don't have an account? <Link to={'/register'} className="font-weight-bold text-dark">Sign up</Link>
                </p>

                <div className='text-center mb-3'>
                    <span className='text-muted'>OR</span>
                </div>

                <button
                    disabled={loading}
                    onClick={onGoogleSignIn}
                    className={`btn btn-outline-danger w-100`}
                >
                    {loading ? 'Loading...' : 'Sign in with Google'}
                </button>
            </div>
        </main>
    );
};

export default Login;
