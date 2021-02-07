

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';

import Loan from './loan/reducers';
import Property from './property/reducers';
import Sponsor from './sponsor/reducers';
import Security from './security/reducers';
import Rating from './rating/reducers';
// import Borrower from './borrower/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,

    Loan,
    Property,
    Sponsor,
    Security,
    Rating,
    // Borrower,
});
