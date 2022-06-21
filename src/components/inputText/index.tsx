import React from 'react';
import { TextWrapper } from './styles';

const InputText = () => {
  return (
    <TextWrapper>
      <input type={'text'} />
    </TextWrapper>
  );
};

export default React.memo(InputText);
