import * as React from 'react';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { CHECKSUM_METHOD, CHECKSUM_TEXT, CHECKSUM_VALUE } from 'config';

import { checksumMethods } from 'libmethods';
import { countChecksum, TypesCheckSum } from 'libmethods/checksum';

export default function() {
  const [method, setMethod] = React.useState(checksumMethods[0]);
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');
  const [checksum, setChecksum] = React.useState<TypesCheckSum[] | undefined>();

  const onSubmit = (event: any) => {
    event.preventDefault();
    setError('');

    if (text === '') {
      setError('Введите текст для которого необходимо найти контрольную сумму!');
      return;
    }

    setChecksum(countChecksum(method, text));
  };

  const getJSON = (method: TypesCheckSum, text: string) => {
    const methodName = `${method.name}${'version' in method ? '/' + method.version : ''}`;
    let json = {
      [CHECKSUM_METHOD]: methodName,
      [CHECKSUM_TEXT]: text,
      [CHECKSUM_VALUE]: method.value,
    };
    return JSON.stringify(json, undefined, 2);
  };

  return (
    <>
      <ContentBox title="Контрольная сумма">
        <span>1) Выберите метод нахождения контрольной суммы:</span>
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
          <span>2) JSON для отправки на сервер контрольных сумм:</span>
          <output>
            <pre>{getJSON(checksum[0], text)}</pre>
          </output>
        </ContentBox>
      )}
    </>
  );
}
