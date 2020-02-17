export interface SendState {
	method: string;
	text: string;
}

export const SET_SEND_METHOD = 'SET_SEND_METHOD';
export const SET_SEND_TEXT = 'SET_SEND_TEXT';
export const RESET_SEND = 'RESET_SEND';

interface SetMethodAction {
	type: typeof SET_SEND_METHOD;
	method: string;
}

interface SetTextAction {
	type: typeof SET_SEND_TEXT;
	text: string;
}

interface ResetAction {
	type: typeof RESET_SEND;
}

export type SendActionTypes = SetMethodAction | SetTextAction | ResetAction;
