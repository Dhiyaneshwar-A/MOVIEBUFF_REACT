import { 
    SIGNIN_SUCCESS, 
    SIGNIN_FAILURE, 
    SIGNOUT_SUCCESS, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE, 
    SET_LOADING 
} from '../actions/actionTypes';

const initialState = {
    currentUser: null,
    errorMessage: '',
    loading: false,
    userLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            console.log('SIGNIN_SUCCESS payload:', action.payload);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload // Assuming you have a user object in state
        };
        case REGISTER_SUCCESS: {
            // Only store necessary user information to avoid circular references
            const { uid, email, displayName } = action.payload;
            return {
                ...state,
                currentUser: { uid, email, displayName: displayName || email }, // Store only serializable data, fallback to email
                userLoggedIn: true,
                errorMessage: '',
                loading: false,
            };
        }
        case SIGNIN_FAILURE:
        case REGISTER_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload, // Keep the error message for display
                userLoggedIn: false,
                currentUser: null, // Ensure to clear currentUser on failure
                loading: false,
            };
        }
        case SIGNOUT_SUCCESS: {
            return {
                ...state,
                currentUser: null,
                userLoggedIn: false,
                errorMessage: '',
                loading: false,
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        default:
            return state;
    }
};
