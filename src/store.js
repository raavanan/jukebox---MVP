import rootReducer from './rootReducer';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'

import RootSaga from './RootSaga'

const sagaMiddleware = createSagaMiddleware(),

composeStore = compose(applyMiddleware(sagaMiddleware),
		              typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)

export const store = createStore(rootReducer, composeStore)

sagaMiddleware.run(RootSaga)


