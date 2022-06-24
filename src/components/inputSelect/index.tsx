import React from 'react';
import { SelectWrapper, OptionItem } from './styles';

interface IProps {
  optionList: Array<string>;
  value: number;
  setValue: (value: number) => void;
}

const InputSelect = ({ optionList, value, setValue }: IProps) => {
  return (
    <SelectWrapper>
      {optionList.map((name: string, index: number) => {
        return (
          <OptionItem onClick={() => setValue(index)} key={index}>
            <input
              type='radio'
              key={index}
              value={index}
              name='access'
              checked={value === index}
              onChange={(e) => {
                setValue(Number(e.target.value));
              }}
            />
            {name}
          </OptionItem>
        );
      })}
    </SelectWrapper>
  );
};

export default React.memo(InputSelect);
