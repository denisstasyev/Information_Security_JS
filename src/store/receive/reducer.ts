import { ReceiveState, ReceiveActionTypes, SET_RECEIVE_METHOD, SET_RECEIVE_TEXT } from './types';

const initialState: ReceiveState = {
	method: '',
	text: '',
};

export default function(state = initialState, action: ReceiveActionTypes): ReceiveState {
	switch (action.type) {
		case SET_RECEIVE_METHOD:
			state.method = action.method;
			return Object.assign({}, state);
		case SET_RECEIVE_TEXT:
			state.text = action.text;
			return Object.assign({}, state);
		default:
			return state;
	}
}
