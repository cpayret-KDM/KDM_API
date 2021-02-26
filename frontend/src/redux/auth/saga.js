
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
} from './actions';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD } from './constants';

const DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const GRANT_TYPE = process.env.REACT_APP_AUTH0_GRANT_TYPE;
const REALM = process.env.REACT_APP_AUTH0_REALM;
const CLIENT = process.env.REACT_APP_AUTH0_CLIENT;

/**
 * Sets the session
 * @param {*} user
 */
const setSession = user => {
    let cookies = new Cookies();
    if (user) {
        cookies.set('user', JSON.stringify(user), { path: '/' });
    }
    else {
        cookies.remove('user', { path: '/' });
    }
};

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {
    const options = {
        body: JSON.stringify({ 
            username: username, 
            password: password, 
            client_id: CLIENT_ID, 
            grant_type: GRANT_TYPE, 
            realm: REALM }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth0-client':CLIENT },
    };
    try {
        const response = yield call(fetchJSON, `${DOMAIN}/oauth/token`, options);
        if (response.error) {
            var error = new Error(response.error_description);
            error.status = 401;
            throw error;
        }
        setSession(response);
        yield put(loginUserSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(loginUserFailed(message));
        setSession(null);
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    setSession(null);
    yield call(() => {
        history.push('/account/login');
    });
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password } }) {
    const options = {
        body: JSON.stringify({ fullname, email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, '/users/register', options);
        yield put(registerUserSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(registerUserFailed(message));
    }
}

/**
 * Forget Password
 */
function* forgetPassword({ payload: { username } }) {
    const options = {
        body: JSON.stringify({ username }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, '/users/password-reset', options);
        yield put(forgetPasswordSuccess(response.message));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchRegisterUser), fork(watchForgetPassword)]);
}

export default authSaga;
