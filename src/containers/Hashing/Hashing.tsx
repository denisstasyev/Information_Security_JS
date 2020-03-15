import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { Method } from 'store';

import { HASH_METHOD, HASH_VALUE, HASH_VALUE_BASE64 } from 'config';

import { hashingMethods } from 'libmethods';
import { calculateHash } from 'libmethods/hashing';

import Base64 from 'utils/base64';

export default function() {
  const [method, setMethod] = React.useState<Method>(hashingMethods[0]);
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');
  const [hash, setHash] = React.useState('');

  const onSubmit = (event: any) => {
    event.preventDefault();
    setError('');

    if (text === '') {
      setError('Введите текст от которого необходимо посчитать хеш!');
      return;
    }

    setHash(calculateHash(method, text));
  };

  const getJSON = (method: Method, hash: string) => {
    let json = {
      [HASH_METHOD]: method.name,
      [HASH_VALUE]: hash,
      [HASH_VALUE_BASE64]: Base64.encode(hash),
    };
    return JSON.stringify(json, undefined, 2);
  };

  return (
    <>
      <ContentBox title="Хеширование">
        <span>1) Выберите метод для подсчета хеша:</span>
        <select
          value={method.type}
          onChange={(event: any) =>
            setMethod(
              hashingMethods.find(method => method.type === event.target.value) ||
                hashingMethods[0],
            )
          }
        >
          {hashingMethods.map((method, index) => (
            <option value={method.type} key={index}>
              {method.name}
            </option>
          ))}
        </select>
        <span>2) Введите текст для которого требуется найти хеш:</span>
        <textarea
          value={text}
          placeholder="Ваш текст"
          onChange={(event: any) => setText(event.target.value)}
        />
        {error && <Alarm type="error" text={`Ошибка! ${error}`} />}
        <button onClick={onSubmit}>Посчитать хеш!</button>
      </ContentBox>

      {!error && hash.length !== 0 && (
        <ContentBox title="Ваш результат">
          <span>1) Вычисленный хеш:</span>
          <textarea value={hash} onChange={() => {}} />
          <span>2) JSON для отправки хешей на сервер:</span>
          <textarea value={getJSON(method, hash)} onChange={() => {}} />
        </ContentBox>
      )}
    </>
  );
}
