import * as React from 'react';
import { connect } from 'react-redux';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { CIPHER_METHOD, ENCRYPTED_DATA, ENCRYPTED_DATA_BASE64 } from 'config';

import { AppState, Method } from 'store';
import { DecryptState } from 'store/decrypt/types';
import { setMethod, setKey, setText, setError, decryptData } from 'store/decrypt/actions';

import { encryptionMethods, encryptionTypes } from 'libmethods';

import Base64 from 'utils/base64';

interface DecryptStateProps extends DecryptState {
  setMethod: typeof setMethod;
  setText: typeof setText;
  setKey: typeof setKey;
  setError: typeof setError;
  decryptData: typeof decryptData;
}

const Decrypt: React.SFC<DecryptStateProps> = props => {
  const [isJSONMode, setIsJSONMode] = React.useState(false);

  const onChangeMethod = (event: any) => {
    event.preventDefault();
    const method: Method =
      encryptionMethods.find(method => method.type === event.target.value) || encryptionMethods[0];
    props.setMethod(method);

    if (
      event.target.value === encryptionTypes.caesar &&
      props.decryptionKey !== parseInt(props.decryptionKey).toString()
    ) {
      props.setKey('');
    }
  };

  const onChangeText = (event: any) => {
    event.preventDefault();
    props.setText(event.target.value);
  };

  const clearError = () => {
    if (props.errorMessage !== '') {
      props.setError('');
    }
  };

  const onChangeKey = (event: any) => {
    event.preventDefault();

    if (props.method.type === encryptionTypes.caesar && event.target.value !== '') {
      if (event.target.value === parseInt(event.target.value).toString()) {
        props.setKey(event.target.value);
        clearError();
      } else {
        props.setError('Некорретный ключ: введите целое значение!');
      }
    } else {
      props.setKey(event.target.value);
      clearError();
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (props.decryptionKey === '') {
      props.setError('Введите ключ расшифрования!');
      return;
    }
    if (props.encryptedText === '') {
      props.setError('Введите текст, который необходимо расшифровать!');
      return;
    }
    props.decryptData(props.method, props.encryptedText, props.decryptionKey);
  };

  const onChangeJSON = (event: any) => {
    event.preventDefault();
    setPropsData(event.target.value);
  };

  const setPropsData = (json: string) => {
    let objectJSON = {};
    try {
      objectJSON = JSON.parse(json);
    } catch (e) {
      props.setError('JSON не валидный!');
    }

    const methodName =
      // @ts-ignore
      objectJSON[CIPHER_METHOD] === undefined ? '' : objectJSON[CIPHER_METHOD];
    const method: Method = encryptionMethods.find(method => method.name === methodName) || {
      name: '',
      type: '',
    };
    props.setMethod(method);

    let encryptedText: string = '';
    // @ts-ignore
    if (objectJSON[ENCRYPTED_DATA_BASE64] === undefined) {
      encryptedText =
        // @ts-ignore
        objectJSON[ENCRYPTED_DATA] === undefined ? '' : objectJSON[ENCRYPTED_DATA];
    } else {
      // @ts-ignore
      encryptedText = Base64.decode(objectJSON[ENCRYPTED_DATA_BASE64]);
    }
    props.setText(encryptedText);
  };

  const onSubmitJSON = (event: any) => {
    event.preventDefault();

    if (props.decryptionKey === '') {
      props.setError('Введите ключ расшифрования!');
      return;
    }

    if (props.method.name === '') {
      props.setError(`Введите метод шифрования в JSON (свойство: ${CIPHER_METHOD})!`);
      return;
    }

    if (props.encryptedText === '') {
      props.setError(
        `Введите текст в JSON, который необходимо расшифровать (свойство: ${ENCRYPTED_DATA})!`,
      );
      return;
    }

    props.decryptData(props.method, props.encryptedText, props.decryptionKey);
  };

  return (
    <>
      <ContentBox title="Расшифрование">
        <span>0) Выберите режим расшифрования:</span>
        <button onClick={() => setIsJSONMode(!isJSONMode)}>
          {isJSONMode ? 'Перейти в обычный режим' : 'Расшифровать JSON'}
        </button>
        {isJSONMode ? (
          <>
            <span>1) Введите JSON, который хотите расшифровать:</span>
            <textarea placeholder="Ваш JSON" onChange={onChangeJSON} />
            <span>2) Введите ключ:</span>
            <input
              value={props.decryptionKey}
              type="text"
              placeholder="Ваш ключ"
              onChange={onChangeKey}
            />
            {props.errorMessage && <Alarm type="error" text={`Ошибка! ${props.errorMessage}`} />}
            <button onClick={onSubmitJSON}>Расшифровать!</button>
          </>
        ) : (
          <>
            <span>1) Выберите метод для расшифрования:</span>
            <select value={props.method.type} onChange={onChangeMethod}>
              {encryptionMethods.map((method, index) => (
                <option value={method.type} key={index}>
                  {method.name}
                </option>
              ))}
            </select>
            <span>2) Введите ключ:</span>
            <input
              value={props.decryptionKey}
              type="text"
              placeholder="Ваш ключ"
              onChange={onChangeKey}
            />
            <span>3) Введите закрытый (зашифрованный) текст, который хотите расшифровать:</span>
            <textarea
              value={props.encryptedText}
              placeholder="Ваш зашифрованный текст"
              onChange={onChangeText}
            />
            {props.errorMessage && <Alarm type="error" text={`Ошибка! ${props.errorMessage}`} />}
            <button onClick={onSubmit}>Расшифровать!</button>
          </>
        )}
      </ContentBox>

      {!props.errorMessage && props.decryptedData.text && (
        <ContentBox title="Ваш результат">
          <span>1) Открытый текст:</span>
          <textarea value={props.decryptedData.text} onChange={() => {}} />
        </ContentBox>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  method: state.decryptReducer.method,
  decryptionKey: state.decryptReducer.decryptionKey,
  encryptedText: state.decryptReducer.encryptedText,
  errorMessage: state.decryptReducer.errorMessage,
  decryptedData: state.decryptReducer.decryptedData,
});

export default connect(mapStateToProps, { setMethod, setText, setKey, setError, decryptData })(
  Decrypt,
);
