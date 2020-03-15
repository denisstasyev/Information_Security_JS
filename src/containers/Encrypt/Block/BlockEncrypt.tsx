import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import {
  CIPHER_METHOD,
  ENCRYPTED_DATA,
  ENCRYPTED_DATA_BASE64,
  INITIALIZATION_VECTOR,
} from 'config';

import { BlockMethod, blockEncryptionMethods } from 'libmethods';
import { getEncryptedText, BlockEncryptionResult } from 'libmethods/encryption/block';
import { getNormalizedIv } from 'libmethods/encryption/block/utils';

import Base64 from 'utils/base64';

export default function() {
  const [method, setMethod] = React.useState<BlockMethod>(blockEncryptionMethods[0]);
  const [iv, setIv] = React.useState('');
  const [ivOutput, setIvOutput] = React.useState<number[] | undefined>(undefined);
  const [IvInputBool, setIvInputBool] = React.useState(false);
  const [key, setKey] = React.useState('');
  const [plainText, setPlainText] = React.useState('');
  const [error, setError] = React.useState('');
  const [encryptedText, setEncryptedText] = React.useState('');

  const onSubmit = (event: any) => {
    event.preventDefault();
    setError('');

    if (method.withIv && IvInputBool && getNormalizedIv(iv) === undefined) {
      setError('Введите корректный вектор инициализации (массив из 16 чисел)!');
      return;
    }

    if (key === '') {
      setError('Введите ключ шифрования!');
      return;
    }

    if (plainText === '') {
      setError('Введите открытый текст!');
      return;
    }

    let encryptedData: BlockEncryptionResult = getEncryptedText(
      method,
      key,
      plainText,
      getNormalizedIv(iv),
    );
    setEncryptedText(encryptedData.encryptedText);
    if (method.withIv) {
      setIvOutput(encryptedData.iv);
    }
  };

  const getJSON = (method: BlockMethod, encryptedText: string) => {
    let json = {
      [CIPHER_METHOD]: method.name,
      [ENCRYPTED_DATA]: encryptedText,
      [ENCRYPTED_DATA_BASE64]: Base64.encode(encryptedText),
    };
    if (method.withIv) {
      // @ts-ignore
      json[INITIALIZATION_VECTOR] = ivOutput;
    }
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
        {method.withIv && (
          <>
            <span>2) Ввести вектор инициализации вручную:</span>
            <input
              type="checkbox"
              checked={IvInputBool}
              onChange={() => setIvInputBool(!IvInputBool)}
            />
          </>
        )}
        {IvInputBool && (
          <>
            <span>2.1) Введите вектор инициализации:</span>
            <input
              value={iv}
              placeholder="Ваш вектор инициализации"
              onChange={(event: any) => setIv(event.target.value)}
            />
          </>
        )}
        <span>3) Введите ключ для шифрования:</span>
        <input
          value={key}
          placeholder="Ваш ключ"
          onChange={(event: any) => setKey(event.target.value)}
        />
        <span>4) Введите открытый текст, который хотите зашифровать:</span>
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
