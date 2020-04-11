import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { CIPHER_METHOD, ENCRYPTED_DATA, ENCRYPTED_DATA_BASE64 } from 'config';

import { Method } from 'store';
import { asymmetricEncryptionMethods } from 'libmethods';
import { getEncryptedText, AsymmetricEncryptionResult } from 'libmethods/encryption/asymmetric';

import Base64 from 'utils/base64';

export default function() {
  const [method, setMethod] = React.useState<Method>(asymmetricEncryptionMethods[0]);
  const [key, setKey] = React.useState('');
  const [plainText, setPlainText] = React.useState('');
  const [error, setError] = React.useState('');
  const [encryptedText, setEncryptedText] = React.useState('');

  const onSubmit = (event: any) => {
    event.preventDefault();
    setError('');

    if (key === '') {
      setError('Введите ключ шифрования!');
      return;
    }

    if (plainText === '') {
      setError('Введите открытый текст!');
      return;
    }

    const encryptedData: AsymmetricEncryptionResult = getEncryptedText(method, key, plainText);
    setEncryptedText(encryptedData.encryptedText);
  };

  const getJSON = (method: Method, encryptedText: string) => {
    let json = {
      [CIPHER_METHOD]: method.name,
      [ENCRYPTED_DATA]: encryptedText,
      [ENCRYPTED_DATA_BASE64]: Base64.encode(encryptedText),
    };
    return JSON.stringify(json, undefined, 2);
  };

  return (
    <>
      <ContentBox title="Ассиметричное шифрование">
        <span>1) Выберите метод ассиметричного шифрования:</span>
        <select
          value={method.type}
          onChange={(event: any) =>
            setMethod(
              asymmetricEncryptionMethods.find(method => method.type === event.target.value) ||
                asymmetricEncryptionMethods[0],
            )
          }
        >
          {asymmetricEncryptionMethods.map((method, index) => (
            <option value={method.type} key={index}>
              {method.name}
            </option>
          ))}
        </select>
        <span>2) Введите ключ для шифрования:</span>
        <input
          value={key}
          placeholder="Ваш ключ"
          onChange={(event: any) => setKey(event.target.value)}
        />
        <span>3) Введите открытый текст, который хотите зашифровать:</span>
        <textarea
          value={plainText}
          placeholder="Ваш открытый текст"
          onChange={(event: any) => setPlainText(event.target.value)}
        />
        {error && <Alarm type="error" text={`Ошибка! ${error}`} />}
        <button onClick={onSubmit}>Зашифровать!</button>
      </ContentBox>

      {!error && encryptedText && (
        <ContentBox title="Ваш результат">
          <span>1) Закрытый текст:</span>
          <textarea value={encryptedText} onChange={() => {}} />
          <span>2) JSON для отправки закрытого текста на сервер:</span>
          <textarea value={getJSON(method, encryptedText)} onChange={() => {}} />
        </ContentBox>
      )}
    </>
  );
}
