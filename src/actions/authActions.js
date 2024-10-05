import { 
    SIGNIN_SUCCESS, 
    SIGNIN_FAILURE, 
    SIGNOUT_SUCCESS, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE, 
    SET_LOADING 
} from './actionTypes';
import { 
    doSignInWithEmailAndPassword, 
    doSignInWithGoogle, 
    doCreateUserWithEmailAndPassword, 
    doSignOut 
} from '../firebase/auth';

// Action to sign in with email and password
export const signIn = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: true });

        try {
            console.log('Attempting to sign in with:', { email, password });
            const user = await doSignInWithEmailAndPassword(email, password);
            console.log('Sign in successful:', user);
            const { uid, email: userEmail, displayName } = user;
            dispatch({ type: SIGNIN_SUCCESS, payload: { uid, email: userEmail, displayName } });
        } catch (error) {
            console.error('SignIn error:', error);
            // Check for specific error message related to user not existing
            
            alert("User does not exist. Please check your email or register.");
            dispatch({ type: SIGNIN_FAILURE, payload: error.message || "Failed to sign in" });
        } finally {
            dispatch({ type: SET_LOADING, payload: false });
        }
    };
};

// Action to sign in with Google
export const signInWithGoogle = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const user = await doSignInWithGoogle();
            const { uid, email, displayName } = user;
            dispatch({ type: SIGNIN_SUCCESS, payload: { uid, email, displayName } });
        } catch (error) {
            console.error('Google SignIn error:', error);
            dispatch({ type: SIGNIN_FAILURE, payload: error.message || "Failed to sign in with Google" });
        } finally {
            dispatch({ type: SET_LOADING, payload: false });
        }
    };
};

// Action to sign out
export const signOut = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            await doSignOut();
            dispatch({ type: SIGNOUT_SUCCESS });
        } catch (error) {
            console.error('SignOut error:', error);
        } finally {
            dispatch({ type: SET_LOADING, payload: false });
        }
    };
};

// Action to register a new user
export const register = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const user = await doCreateUserWithEmailAndPassword(email, password);
            const { uid, email: userEmail, displayName } = user;
            dispatch({ type: REGISTER_SUCCESS, payload: { uid, email: userEmail, displayName } });
        } catch (error) {
            console.error('Register error:', error);
            dispatch({ type: REGISTER_FAILURE, payload: error.message || "Failed to register" });
        } finally {
            dispatch({ type: SET_LOADING, payload: false });
        }
    };
};

// Clear error action
export const clearError = () => {
    return {
        type: 'CLEAR_ERROR',
    };
};
