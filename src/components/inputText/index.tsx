import React from 'react';
import { TextWrapper } from './styles';

interface IProps {
  placeholder: string;
  regExp?: RegExp | null;
  disabled?: boolean;
  value: string;
  setValue: (value: string) => void;
}

const InputText = ({ placeholder, regExp = null, disabled = false, value, setValue }: IProps) => {
  const onChangeEvent = (e: any) => {
    if (regExp !== null) {
      if (regExp.test(e.target.value) || e.target.value === '') {
        setValue(e.target.value);
      }
    } else {
      setValue(e.target.value);
    }
  };
  return (
    <TextWrapper>
      <input type={'text'} placeholder={placeholder} disabled={disabled} onChange={onChangeEvent} value={value} />
    </TextWrapper>
  );
};

export default React.memo(InputText);
