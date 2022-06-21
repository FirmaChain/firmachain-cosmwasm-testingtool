import React from 'react';
import { SelectWrapper } from './styles';

interface optionItem {
  value: number;
  name: string;
}

interface IProps {
  optionList: Array<optionItem>;
}

const InputSelect = ({ optionList }: IProps) => {
  return (
    <SelectWrapper>
      <select>
        {optionList.map((value: optionItem, index: number) => {
          return (
            <option key={index} value={value.value}>
              {value.name}
            </option>
          );
        })}
      </select>
    </SelectWrapper>
  );
};

export default React.memo(InputSelect);
