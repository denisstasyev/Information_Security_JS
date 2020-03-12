import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { hashingMethods } from 'libmethods';
import { calculateHash } from 'libmethods/hashing';

export default function() {
  const [method, setMethod] = React.useState(hashingMethods[0]);
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');
  const [hash, setHash] = React.useState<number[]>([]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setError('');

    if (text === '') {
      setError('Введите текст от которого необходимо посчитать хеш!');
      return;
    }

    setHash(calculateHash(method, text));
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
          <output>
            <pre>[{hash.join(',\n')}]</pre>
          </output>
        </ContentBox>
      )}
    </>
  );
}
