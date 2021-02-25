
import jwtDecode from 'jwt-decode';
import { useReducer } from 'react';
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
    
    const decoded = jwtDecode(user.id_token)
    return isSessionValid(decoded)
};

const isSessionValid = (user) => {
    //check input, typescript would save us here
    if (!user || !user.exp) {
        return false
    }
    //FIXME: logic here could be vulnerable to a hack by changing the system time
    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
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

    if (typeof user == 'object') {
        return user
    }
    else {
        return JSON.parse(user)
    }
};

/**
 * Returns the logged in user role
 */
const getLoggedInUserRole = () => {
    const user = getLoggedInUser();
    
    if (!user) {
        return null;
    }

    const decoded = jwtDecode(user.id_token)
    return getUserRole(decoded)
};


const getUserRole = (user) => {
    if (user && user[ROLE_CLAIM] && user[ROLE_CLAIM].length) {
        return user[ROLE_CLAIM][0]
    }
    else {
        return null
    }
    
}

export { isUserAuthenticated, getLoggedInUser, getLoggedInUserRole, getUserRole, isSessionValid };
