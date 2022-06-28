import React from 'react';
import { SelectWrapper } from './styles';

interface IProps {
  optionList: Array<any>;
  value: number;
  setValue: (value: number) => void;
}

const InputSelect = ({ optionList, value, setValue }: IProps) => {
  const onChangeEvent = (e: any) => {
    setValue(Number(e.target.value));
  };
  return (
    <SelectWrapper>
      <select value={value} onChange={onChangeEvent}>
        {optionList.map((option: any, index: number) => {
          return (
            <option key={index} value={index}>
              {option.name}
            </option>
          );
        })}
      </select>
    </SelectWrapper>
  );
};

export default React.memo(InputSelect);
