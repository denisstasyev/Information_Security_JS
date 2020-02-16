export interface SendState {
	method: string;
	text: string;
}

export const SET_SEND_METHOD = 'SET_SEND_METHOD';
export const SET_SEND_TEXT = 'SET_SEND_TEXT';

interface SetMethodAction {
	type: typeof SET_SEND_METHOD;
	method: string;
}

interface SetTextAction {
	type: typeof SET_SEND_TEXT;
	text: string;
}

export type SendActionTypes = SetMethodAction | SetTextAction;
