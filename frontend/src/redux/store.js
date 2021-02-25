
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export function configureStore(initialState: {}) {
    const composeEnhancers = compose;

    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));
    sagaMiddleware.run(sagas);
    return store;
}
