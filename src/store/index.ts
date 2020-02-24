import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import encryptReducer from './encrypt/reducer';
// import receiveReducer from './receive/reducer';

const rootReducer = combineReducers({
	encryptReducer,
	// receiveReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function() {
	const middlewares = [thunkMiddleware];
	const middleWareEnhancer = applyMiddleware(...middlewares);

	const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

	return store;
}

export interface Method {
	type: string;
	name: string;
}

export interface EncryptedData {
	code: number[];
	text: string;
}
