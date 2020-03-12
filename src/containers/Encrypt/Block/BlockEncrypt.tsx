import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { Method } from 'store';

import { CIPHER_METHOD, ENCRYPTED_DATA } from 'config';

import { blockEncryptionMethods } from 'libmethods';
import { getEncryptedText } from 'libmethods/encryption/block';

export default function() {
  const [method, setMethod] = React.useState<Method>(blockEncryptionMethods[0]);
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

    setEncryptedText(getEncryptedText(method, key, plainText));
  };

  const getJSON = (method: Method, encryptedText: string) => {
    let json = {
      [CIPHER_METHOD]: method.name,
      [ENCRYPTED_DATA]: encryptedText,
    };
    return JSON.stringify(json, undefined, 2);
  };

  return (
    <>
      <ContentBox title="Блочное шифрование">
        <span>1) Выберите метод блочного шифрования:</span>
        <select
          value={method.type}
          onChange={(event: any) =>
            setMethod(
              blockEncryptionMethods.find(method => method.type === event.target.value) ||
                blockEncryptionMethods[0],
            )
          }
        >
          {blockEncryptionMethods.map((method, index) => (
            <option value={method.type} key={index}>
              {method.name}
            </option>
          ))}
        </select>
        <span>2) Введите ключ для шифрования:</span>
        <textarea
          value={key}
          placeholder="Ваш ключ"
          onChange={(event: any) => setKey(event.target.value)}
        />
        <span>2) Введите открытый текст, который хотите зашифровать:</span>
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
          <span>1) Закрытый ключ:</span>
          <textarea value={encryptedText} onChange={() => {}} />
          <span>2) JSON для отправки закрытого текста на сервер:</span>
          <textarea value={getJSON(method, encryptedText)} onChange={() => {}} />
        </ContentBox>
      )}
    </>
  );
}
