import React, { useState, useEffect } from 'react';

import { ResultContainer, RawLog } from './styles';

interface IProps {
  result: any;
}

const QueryResult = ({ result }: IProps) => {
  const [rawString, setRawString] = useState('');

  useEffect(() => {
    console.log(result);
    try {
      setRawString(JSON.stringify(result, null, 4));
    } catch (e) {
      console.log(e);
    }
  }, [result]);

  return (
    <ResultContainer>
      <RawLog>{rawString}</RawLog>
    </ResultContainer>
  );
};

export default React.memo(QueryResult);
