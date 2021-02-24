
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';

const ROLE_CLAIM = process.env.REACT_APP_AUTH0_ROLE_CLAIM_PREFIX;

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser()

    if (!user) {
        return null
    }
    
    return isSessionExpired(user)
};

const isSessionExpired = (user) => {
    //FIXME: logic here could be vulnerable to a hack by changing the system time
    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
        console.warn('access token expired');
        return false;
    } else {
        return true;
    }
}

/**
 * Returns the logged in user, decoded
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    let user = cookies.get('user');
    user = user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;

    if (!user) {
        return null;
    }

    return jwtDecode(user.id_token);
};

/**
 * Returns the logged in user role
 */
const getLoggedInUserRole = () => {
    const user = getLoggedInUser();
    
    if (!user) {
        return null;
    }

    return getUserRole(user)
};


const getUserRole = (user) => {
    if (!user || (!user[ROLE_CLAIM] && !user[ROLE_CLAIM].length)){
        return null
    }
    return user[ROLE_CLAIM][0];
}

export { isUserAuthenticated, getLoggedInUser, getLoggedInUserRole, getUserRole, isSessionExpired };
