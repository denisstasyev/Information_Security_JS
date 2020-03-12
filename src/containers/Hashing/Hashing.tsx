import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { hashingMethods } from 'libmethods';
import { calculateHash } from 'libmethods/hashing';

export default function() {
  const [method, setMethod] = React.useState(hashingMethods[0]);
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');
  const [hash, setHash] = React.useState([]);

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
        {/* <span>2) Введите текст для которого требуется найти контрольную сумму:</span>
        <textarea
          value={text}
          placeholder="Ваш текст"
          onChange={(event: any) => setText(event.target.value)}
        /> */}
        <span>2) Введите текст для которого требуется найти контрольную сумму:</span>
        <textarea
          value={text}
          placeholder="Ваш текст"
          onChange={(event: any) => setText(event.target.value)}
        />
        {error && <Alarm type="error" text={`Ошибка! ${error}`} />}
        <button onClick={onSubmit}>Посчитать контрольную сумму!</button>
      </ContentBox>

      {!error && checksum && (
        <ContentBox title="Ваш результат">
          <span>1) Контрольные суммы:</span>
          <table>
            <thead>
              <tr>
                <th>Алгоритм</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              {checksum.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.name}
                    {'version' in item ? '/' + item.version : ''}
                  </td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContentBox>
      )}
    </>
  );
}
