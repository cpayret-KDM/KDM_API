
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import loanSaga from './loan/saga';
import propertySaga from './property/saga';
import sponsorSaga from './sponsor/saga';
import securitySaga from './security/saga';
import ratingSaga from './rating/saga';

export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    layoutSaga(),
    appMenuSaga(),

    loanSaga(),
    propertySaga(),
    sponsorSaga(),
    securitySaga(),
    ratingSaga(),
  ]);
}
