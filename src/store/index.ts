import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import sendReducer from './send/reducer';
import receiveReducer from './receive/reducer';

const rootReducer = combineReducers({
	sendReducer,
	receiveReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function() {
	const middlewares = [thunkMiddleware];
	const middleWareEnhancer = applyMiddleware(...middlewares);

	const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

	return store;
}
