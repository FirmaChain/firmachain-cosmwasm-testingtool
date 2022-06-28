import React from 'react';
import { TransactionResult } from '../cosmwasm';

import { ResultContainer, StatusTypo, Label, HashLink, Divider, RawLog } from './styles';

interface IProps {
  result: TransactionResult;
}

const TxResult = ({ result }: IProps) => {
  return (
    <ResultContainer>
      {result.code !== -1 && (
        <>
          <StatusTypo isSuccess={result.code === 0}>{result.code === 0 ? 'Success' : 'Failed'}</StatusTypo>
          <Label>hash</Label>
          <HashLink
            onClick={() => window.open(`${process.env.REACT_APP_EXPLORER}/transactions/${result.transactionHash}`)}
          >
            {result.transactionHash}
          </HashLink>
          <Divider />
          <Label>rawLog</Label>
          <RawLog>{result.rawLog}</RawLog>
        </>
      )}
    </ResultContainer>
  );
};

export default React.memo(TxResult);
