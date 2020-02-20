import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'store';
import { SendState } from 'store/send/types';
import { setMethod, setText, send } from 'store/send/actions';

import { Header } from 'components/Header';
import { methods } from 'config';

interface SendProps extends SendState {
	setMethod: typeof setMethod;
	setText: typeof setText;
	send: typeof send;
}

const Send: React.SFC<SendProps> = props => {
	const onChangeMethod = (event: any) => {
		event.preventDefault();
		props.setMethod(event.target.value);
	};

	const onChangeText = (event: any) => {
		event.preventDefault();
		props.setText(event.target.value);
	};

	const onSubmit = (event: any) => {
		event.preventDefault();
		props.send(props.method, props.text);
	};

	return (
		<>
			<Header />
			<div>
				<h2>Send</h2>
				<select value={props.method} onChange={onChangeMethod}>
					{methods.map((method, index) => (
						<option value={method} key={index}>
							{method}
						</option>
					))}
				</select>
				<input
					value={props.text}
					type="text"
					placeholder="Enter text to send"
					onChange={onChangeText}
				/>
				<button onClick={onSubmit}>Send</button>
			</div>
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	method: state.sendReducer.method,
	text: state.sendReducer.text,
});

export default connect(mapStateToProps, { setMethod, setText, send })(Send);
