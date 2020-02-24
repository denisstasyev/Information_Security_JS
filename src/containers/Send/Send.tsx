import * as React from 'react';
import { connect } from 'react-redux';

// import styles from './send.module.scss';

import { AppState } from 'store';
import { CipherState } from 'store/encrypt/types';
import { setMethod, setText, setKey, encryptData } from 'store/encrypt/actions';

import { Header } from 'components/Header';
import { methodsEncrypt } from 'config';

interface CipherStateProps extends CipherState {
	setMethod: typeof setMethod;
	setText: typeof setText;
	setKey: typeof setKey;
	encryptData: typeof encryptData;
}

const EncryptForm: React.SFC<CipherStateProps> = props => {
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
				<h2>Режим шифрования</h2>
				<div>1) Выберите метод для шифрования:</div>
				<select value={props.method} onChange={onChangeMethod}>
					{Object.values(methodsEncrypt).map((value, index) => (
						<option value={value} key={index}>
							{value}
						</option>
					))}
				</select>
				<div>2) Введите ключ:</div>
				<input
					value={props.cipherKey}
					type="text"
					placeholder="Ваш ключ"
					onChange={onChangeKey}
				/>
				<div>3) Введите открытый текст, который хотите зашифровать:</div>
				<input
					value={props.text}
					type="text"
					placeholder="Ваш открытый текст"
					onChange={onChangeText}
				/>
				<button onClick={onSubmit}>Зашифровать!</button>

				{props.error.name && <div>Ошибка: {props.error.message}</div>}
				{props.cipherText && (
					<>
						<h3>Ваш результат</h3>
						<div>1) Закрытый текст:</div>
						<output>{props.cipherText}</output>
						<div>2) JSON для отправки на сервер для расшифрования:</div>
						<output>
							{JSON.stringify({
								cipher_algorithm: props.method,
								encrypted_data: props.cipherText,
							})}
						</output>
					</>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	method: state.encryptReducer.method,
	error: state.encryptReducer.error,
	text: state.encryptReducer.text,
	cipherKey: state.encryptReducer.cipherKey,
	cipherCode: state.encryptReducer.cipherCode,
	cipherText: state.encryptReducer.cipherText,
});

export default connect(mapStateToProps, { setMethod, setText, setKey, encryptData })(EncryptForm);
