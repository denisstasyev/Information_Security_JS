import { SendState, SendActionTypes, SET_SEND_METHOD, SET_SEND_TEXT, RESET_SEND } from './types';
import { methods } from 'config';

const initialState: SendState = {
	method: methods[0],
	text: '',
};

export default function(state = initialState, action: SendActionTypes): SendState {
	switch (action.type) {
		case SET_SEND_METHOD:
			state.method = action.method;
			return Object.assign({}, state);
		case SET_SEND_TEXT:
			state.text = action.text;
			return Object.assign({}, state);
		case RESET_SEND:
			state.method = methods[0];
			state.text = '';
			return Object.assign({}, state);
		default:
			return state;
	}
}
