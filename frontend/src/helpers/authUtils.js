
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';

const ROLE_CLAIM = process.env.REACT_APP_AUTH0_ROLE_CLAIM_PREFIX;

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    const decoded = jwtDecode(user.id_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    } else {
        return true;
    }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

/**
 * Returns the logged in user role
 */
const getLoggedInUserRole = () => {
    const user = getLoggedInUser();
    if (!user) {
        return null;
    }

    const decoded = jwtDecode(user.id_token);
    if (!decoded[ROLE_CLAIM] && !decoded[ROLE_CLAIM].lenght){
        return null
    }
    
    return decoded[ROLE_CLAIM][0];
};

export { isUserAuthenticated, getLoggedInUser, getLoggedInUserRole };
