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
            console.log('Attempting to sign in with Google');
            const user = await doSignInWithGoogle();
            const { uid, email: userEmail, displayName } = user; // Destructure user data

            // Dispatch success action with user info
            dispatch({ 
                type: SIGNIN_SUCCESS, 
                payload: { uid, email: userEmail, displayName } 
            });
        } catch (error) {
            console.error('Google SignIn error:', error);
            // Dispatch failure action with error message
            dispatch({ 
                type: SIGNIN_FAILURE, 
                payload: error.message || "Failed to sign in with Google" 
            });
        } finally {
            // Reset loading state
            dispatch({ type: SET_LOADING, payload: false });
        }
    };
};

// Action to sign out
export const signOut = () => {
    return async (dispatch) => {
        try {
            await doSignOut();
            // Dispatch sign out success action
            
            dispatch({ type: SIGNOUT_SUCCESS });
        } catch (error) {
            console.error('SignOut failed:', error);
            // Optionally dispatch a failure action or handle it accordingly
        }
    };
};

// Action to register a new user with email and password
export const register = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: true });

        try {
            const user = await doCreateUserWithEmailAndPassword(email, password);
            const { uid, email: userEmail, displayName } = user; // Destructure user data

            // Dispatch success action with user info
            dispatch({ 
                type: REGISTER_SUCCESS, 
                payload: { uid, email: userEmail, displayName } 
            });
        } catch (error) {
            console.error('Registration error:', error);
            // Dispatch failure action with error message
            dispatch({ 
                type: REGISTER_FAILURE, 
                payload: error.message || "Failed to register" 
            });
        } finally {
            // Reset loading state
            dispatch({ type: SET_LOADING, payload: false });
        }
    };
};
