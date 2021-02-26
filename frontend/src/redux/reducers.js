import { combineReducers } from 'redux';
import AppMenu from './appMenu/reducers';
import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Loan from './loan/reducers';
import Property from './property/reducers';
import Rating from './rating/reducers';
import Security from './security/reducers';
import Sponsor from './sponsor/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Loan,
    Property,
    Sponsor,
    Security,
    Rating,
});
