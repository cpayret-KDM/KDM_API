

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';

import Loan from './loan/reducers';
import Property from './property/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,

    Loan,
    Property,
});
