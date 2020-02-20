export interface ReceiveState {
	method: string;
	text: string;
}

export const SET_RECEIVE_METHOD = 'SET_RECEIVE_METHOD';
export const SET_RECEIVE_TEXT = 'SET_RECEIVE_TEXT';

interface SetMethodAction {
	type: typeof SET_RECEIVE_METHOD;
	method: string;
}

interface SetTextAction {
	type: typeof SET_RECEIVE_TEXT;
	text: string;
}

export type ReceiveActionTypes = SetMethodAction | SetTextAction;
