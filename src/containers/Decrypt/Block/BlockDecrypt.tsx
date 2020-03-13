import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { Method } from 'store';

import { blockEncryptionMethods } from 'libmethods';
import { getDecryptedText } from 'libmethods/encryption/block';

export default function() {
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

  return (
    <>
      <ContentBox title="Блочное расшифрование">
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
      </ContentBox>

      {!error && encryptedText && (
        <ContentBox title="Ваш результат">
          <span>1) Открытый текст:</span>
          <textarea value={decryptedText} onChange={() => {}} />
        </ContentBox>
      )}
    </>
  );
}
