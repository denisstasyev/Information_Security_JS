import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { Method } from 'store';

import { blockEncryptionMethods } from 'libmethods';
import { getDecryptedText } from 'libmethods/encryption/block';

export default function() {
  const [jsonMode, setJsonMode] = React.useState(false);
  const [json, setJson] = React.useState('');

  const [method, setMethod] = React.useState<Method>(blockEncryptionMethods[0]);
  const [key, setKey] = React.useState('');
  // const [iv, set] = React.useState('');
  const [encryptedText, setEncryptedText] = React.useState('');
  const [error, setError] = React.useState('');
  const [decryptedText, setDecryptedText] = React.useState('');

  const onSubmit = (event: any) => {
    event.preventDefault();
    setError('');

    if (key === '') {
      setError('Введите ключ расшифрования!');
      return;
    }

    if (encryptedText === '') {
      setError('Введите закрытый текст!');
      return;
    }

    setDecryptedText(getDecryptedText(method, key, encryptedText, ''));
  };

  const onSubmitJson = (event: any) => {};

  return (
    <>
      <ContentBox title="Блочное расшифрование">
        <span>0) Выберите решим расшифрования:</span>
        <button
          onClick={() => {
            setJsonMode(!jsonMode);
            setError('');
            setDecryptedText('');
          }}
        >
          {jsonMode
            ? 'Перейти в режим обычного расшифрования'
            : 'Перейти в режим расшифрования JSON'}
        </button>
        {jsonMode ? (
          <>
            <span>1) Введите JSON для блочного расшифрования:</span>
            <textarea
              value={json}
              placeholder="Ваш JSON для расшифрования"
              onChange={(event: any) => setJson(event.target.value)}
            />
            <span>2) Введите ключ для блочного расшифрования:</span>
            <input
              value={key}
              placeholder="Ваш ключ"
              onChange={(event: any) => setKey(event.target.value)}
            />
            {error && <Alarm type="error" text={`Ошибка! ${error}`} />}
            <button onClick={onSubmitJson}>Расшифровать!</button>
          </>
        ) : (
          <>
            <span>1) Выберите метод блочного расшифрования:</span>
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
            <span>2) Введите ключ для расшифрования:</span>
            <input
              value={key}
              placeholder="Ваш ключ"
              onChange={(event: any) => setKey(event.target.value)}
            />
            <span>3) Введите закрытый текст, который хотите расшифровать:</span>
            <textarea
              value={encryptedText}
              placeholder="Ваш закрытый текст"
              onChange={(event: any) => setEncryptedText(event.target.value)}
            />
            {error && <Alarm type="error" text={`Ошибка! ${error}`} />}
            <button onClick={onSubmit}>Расшифровать!</button>
          </>
        )}
      </ContentBox>

      {!error && decryptedText && (
        <ContentBox title="Ваш результат">
          <span>1) Открытый текст:</span>
          <textarea value={decryptedText} onChange={() => {}} />
        </ContentBox>
      )}
    </>
  );
}
