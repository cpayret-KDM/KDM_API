import { all } from 'redux-saga/effects';
import appMenuSaga from './appMenu/saga';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import loanSaga from './loan/saga';
import propertySaga from './property/saga';
import ratingSaga from './rating/saga';
import securitySaga from './security/saga';
import sponsorSaga from './sponsor/saga';

export default function* rootSaga() {
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
