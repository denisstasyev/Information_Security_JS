import * as React from 'react';
import { connect } from 'react-redux';

// import styles from './send.module.scss';

import { AppState } from 'store';
import { CipherState } from 'store/encrypt/types';
import { setMethod, setText, setKey, encryptData } from 'store/encrypt/actions';

import { Header } from 'components/Header';
import { methods } from 'config';

interface CipherStateProps extends CipherState {
	setMethod: typeof setMethod;
	setText: typeof setText;
	setKey: typeof setKey;
	encryptData: typeof encryptData;
}

const Send: React.SFC<CipherStateProps> = props => {
	const onChangeMethod = (event: any) => {
		event.preventDefault();
		props.setMethod(event.target.value);
	};

	const onChangeText = (event: any) => {
		event.preventDefault();
		props.setText(event.target.value);
	};

	const onChangeKey = (event: any) => {
		event.preventDefault();
		props.setKey(event.target.value);
	};

	const onSubmit = (event: any) => {
		event.preventDefault();
		props.encryptData(props.method, props.text, props.cipherKey);
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
					value={props.cipherKey}
					type="text"
					placeholder="Enter key"
					onChange={onChangeKey}
				/>
				<input
					value={props.text}
					type="text"
					placeholder="Enter text to encrypt"
					onChange={onChangeText}
				/>
				<button onClick={onSubmit}>Encrypt</button>
				<output>{props.cipherText}</output>
			</div>
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	method: state.encryptReducer.method,
	text: state.encryptReducer.text,
	cipherKey: state.encryptReducer.cipherKey,
	cipherCode: state.encryptReducer.cipherCode,
	cipherText: state.encryptReducer.cipherText,
});

export default connect(mapStateToProps, { setMethod, setText, setKey, encryptData })(Send);
