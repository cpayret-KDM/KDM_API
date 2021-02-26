
import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { authProtectedRoutes as routes } from '../../routes';
import { initMenuSuccess, changeActiveMenuFromLocationSuccess } from './actions';
import { INIT_MENU, CHANGE_ACTIVE_MENU_FROM_LOCATION } from './constants';
import assignIds from './utils';

/**
 * Activate menu items from location
 * @param {*} menuItems
 */
const getActivatedMenuItemIds = menuItems => {
    var matchingItems = [];
    for (var menuItem of menuItems) {
        if (window.location.pathname.indexOf(menuItem.path) === 0) {
            matchingItems.push(menuItem.id);
        }

        if (typeof menuItem.children !== 'undefined') {
            matchingItems = [...matchingItems, ...getActivatedMenuItemIds(menuItem.children)];
        }
    }
    return matchingItems;
};

/**
 * Initilizes the menu
 */
function* initMenuAndItems() {
    const menuItems = assignIds(routes);
    yield put(initMenuSuccess(menuItems));
}

/**
 * change the active menu item based on location
 */
function* changeActiveMenuFromLocation() {
    const menuItems = assignIds(routes);
    const activatedMenuItemIds = yield call(getActivatedMenuItemIds, menuItems);
    yield put(changeActiveMenuFromLocationSuccess(activatedMenuItemIds));
}

/**
 * Watchers
 */
export function* watchMenuInit() {
    yield takeEvery(INIT_MENU, initMenuAndItems);
}

export function* watchMenuChange() {
    yield takeEvery(CHANGE_ACTIVE_MENU_FROM_LOCATION, changeActiveMenuFromLocation);
}

function* appMenuSaga() {
    yield all([fork(watchMenuInit), fork(watchMenuChange)]);
}

export default appMenuSaga;
