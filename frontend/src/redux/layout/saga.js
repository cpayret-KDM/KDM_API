import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import * as layoutConstants from '../../constants';
import {
    changeLayoutWidth as changeLayoutWidthAction,
    changeSidebarTheme as changeLeftSidebarThemeAction,
    changeSidebarType as changeSidebarTypeAction,
} from './actions';
import {
    CHANGE_LAYOUT,
    CHANGE_LAYOUT_WIDTH,
    CHANGE_SIDEBAR_THEME,
    CHANGE_SIDEBAR_TYPE,
    TOGGLE_RIGHT_SIDEBAR,
    SHOW_RIGHT_SIDEBAR,
    HIDE_RIGHT_SIDEBAR,
} from './constants';

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute, value) {
    if (document.body) { document.body.setAttribute(attribute, value); }
    return true;
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
function manageBodyClass(cssClass, action = 'toggle') {
    switch (action) {
        case 'add':
            if (document.body) { document.body.classList.add(cssClass); }
            break;
        case 'remove':
            if (document.body) { document.body.classList.remove(cssClass); }
            break;
        default:
            if (document.body) { document.body.classList.toggle(cssClass); }
            break;
    }

    return true;
}

/**
 * ---------------------------------------------------------------------------------------------------------------------------
 * Note: Following are the functions which allows you to save the user prefrences on backend side by making an api request.
 * For now, we are just applying the required logic on frontend side
 * ----------------------------------------------------------------------------------------------------------------------------
 */

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayout({ payload: layout }) {
    yield call(changeBodyAttribute, 'data-layout', layout);
    if (layout === layoutConstants.LAYOUT_VERTICAL) {
        yield put(changeLeftSidebarThemeAction(layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT));
        yield put(changeSidebarTypeAction(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED));
    }

    if (layout === layoutConstants.LAYOUT_HORIZONTAL) {
        yield put(changeLeftSidebarThemeAction(layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT));
        yield put(changeSidebarTypeAction(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED));
    }

    if (layout === layoutConstants.LAYOUT_DETACHED) {
        yield put(changeLayoutWidthAction(layoutConstants.LAYOUT_WIDTH_FLUID));
        yield put(changeSidebarTypeAction(layoutConstants.LEFT_SIDEBAR_TYPE_SCROLLABLE));
        yield put(changeLeftSidebarThemeAction(layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT));
    }
}

/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidth({ payload: width }) {
    yield call(changeBodyAttribute, 'data-layout-mode', width);
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme({ payload: theme }) {
    yield call(changeBodyAttribute, 'data-leftbar-theme', theme);
}

/**
 * Changes the left sidebar type
 * @param {*} param0
 */
function* changeLeftSidebarType({ payload: type }) {
    yield call(changeBodyAttribute, 'data-leftbar-compact-mode', type);
}

/**
 * Toggles the rightsidebar
 */
function* toggleRightSidebar() {
    yield call(manageBodyClass, 'right-bar-enabled');
}

/**
 * Show the rightsidebar
 */
function* showRightSidebar() {
    yield call(manageBodyClass, 'right-bar-enabled', 'add');
}

/**
 * Hides the rightsidebar
 */
function* hideRightSidebar() {
    yield call(manageBodyClass, 'right-bar-enabled', 'remove');
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
    yield takeEvery(CHANGE_LAYOUT, changeLayout);
}

export function* watchChangeLayoutWidth() {
    yield takeEvery(CHANGE_LAYOUT_WIDTH, changeLayoutWidth);
}

export function* watchChangeLeftSidebarTheme() {
    yield takeEvery(CHANGE_SIDEBAR_THEME, changeLeftSidebarTheme);
}

export function* watchChangeLeftSidebarType() {
    yield takeEvery(CHANGE_SIDEBAR_TYPE, changeLeftSidebarType);
}

export function* watchToggleRightSidebar() {
    yield takeEvery(TOGGLE_RIGHT_SIDEBAR, toggleRightSidebar);
}

export function* watchShowRightSidebar() {
    yield takeEvery(SHOW_RIGHT_SIDEBAR, showRightSidebar);
}

export function* watchHideRightSidebar() {
    yield takeEvery(HIDE_RIGHT_SIDEBAR, hideRightSidebar);
}

function* LayoutSaga() {
    yield all([
        fork(watchChangeLayoutType),
        fork(watchChangeLayoutWidth),
        fork(watchChangeLeftSidebarTheme),
        fork(watchChangeLeftSidebarType),
        fork(watchToggleRightSidebar),
        fork(watchShowRightSidebar),
        fork(watchHideRightSidebar),
    ]);
}

export default LayoutSaga;
