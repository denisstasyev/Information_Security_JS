import * as React from 'react';

import { checksumMethods } from '../../methods'; //TODO: fix bug with absolut imports with Typescript
import { countChecksum } from '../../methods/checksum';

export default function() {
  const [method, setMethod] = React.useState(checksumMethods[0]);
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');
  const [checksum, setChecksum] = React.useState('');

  const onSubmit = (event: any) => {
    event.preventDefault();
    setError('');

    if (text === '') {
      setError('Введите текст для которого необходимо найти контрольную сумму!');
      return;
    }

    setChecksum(countChecksum(method, text));
  };

  return (
    <>
      <h2>Контрольная сумма</h2>
      <div>1) Выберите метод нахождения контрольной суммы:</div>
      <select
        value={method.type}
        onChange={(event: any) =>
          setMethod(
            checksumMethods.find(method => method.type === event.target.value) ||
              checksumMethods[0],
          )
        }
      >
        {checksumMethods.map((method, index) => (
          <option value={method.type} key={index}>
            {method.name}
          </option>
        ))}
      </select>
      <div>2) Введите текст для которого требуется найти контрольную сумму:</div>
      <input
        value={text}
        type="text"
        placeholder="Ваш текст"
        onChange={(event: any) => setText(event.target.value)}
      />
      <button onClick={onSubmit}>Посчитать контрольную сумму!</button>

      {error ? (
        <div>Ошибка! {error}</div>
      ) : (
        checksum && (
          <>
            <h3>Ваш результат</h3>
            <div>1) Контрольная сумма:</div>
            <output>{checksum}</output>
          </>
        )
      )}
    </>
  );
}
