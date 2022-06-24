import React from 'react';
import { TextWrapper } from './styles';

interface IProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

const InputTextArea = ({ placeholder, value, setValue }: IProps) => {
  const onChangeEvent = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <TextWrapper onChange={onChangeEvent}>
      <textarea placeholder={placeholder} value={value} onChange={onChangeEvent}></textarea>
    </TextWrapper>
  );
};

export default React.memo(InputTextArea);
