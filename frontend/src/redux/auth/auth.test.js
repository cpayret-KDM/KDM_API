import { expectSaga } from 'redux-saga-test-plan';

import { fetchJSON } from '../../helpers/api';
import * as actions from './actions';
import authReducer from './reducers';
import { watchLoginUser} from './saga';

const DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;

describe('login flow', () => {
    const user = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', role: 'Admin' };
    it('success', () => {
        return expectSaga(watchLoginUser)
            .withReducer(authReducer)
            .provide({
                call(effect, next) {
                    // Check for the API call to return fake value
                    if (effect.fn === fetchJSON) {
                        if (effect.args[0] === `${DOMAIN}/oauth/token`) {
                            return user;
                        }
                    }
                    // Allow Redux Saga to handle other `call` effects
                    return next();
                },
            })
            .dispatch(actions.loginUser('test', 'test'))
            .hasFinalState({ user: user, loading: false, error: null })
            .silentRun();
    });

    it('error', () => {
        const error = new Error('Username or password is incorrect');

        return expectSaga(watchLoginUser)
            .withReducer(authReducer)
            .provide({
                call(effect, next) {
                    // Check for the API call to return fake value
                    if (effect.fn === fetchJSON) {
                        if (effect.args[0] === `${DOMAIN}/oauth/token`) {
                            throw error;
                        }
                    }
                    // Allow Redux Saga to handle other `call` effects
                    return next();
                },
            })
            .dispatch(actions.loginUser('test1', 'test'))
            .hasFinalState({ user: null, loading: false, error: error })
            .silentRun();
    });
});
