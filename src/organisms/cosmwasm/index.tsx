import React, { useState } from 'react';
import InputFile from '../../components/inputFile';
import InputSelect from '../../components/inputSelect';
import InputText from '../../components/inputText';
import { CosmWasmContainer, TabMenuList, TabMenu, TabContents, InputWrap, Input, Label, GeneralButton } from './styles';

const CosmWasm = () => {
  const [currentTab, setTab] = useState(0);

  return (
    <CosmWasmContainer>
      <TabMenuList currentTab={currentTab}>
        <TabMenu onClick={() => setTab(0)}>Store</TabMenu>
        <TabMenu onClick={() => setTab(1)}>Instantiate</TabMenu>
        <TabMenu onClick={() => setTab(2)}>Execute</TabMenu>
        <TabMenu onClick={() => setTab(3)}>Migrate</TabMenu>
      </TabMenuList>
      <TabContents>
        <InputWrap>
          <Label>Wasm binary file</Label>
          <Input>
            <InputFile />
          </Input>
        </InputWrap>

        <InputWrap>
          <Label>Access config</Label>
          <Input>
            <InputSelect
              optionList={[
                { value: 0, name: 'EVERYBODY' },
                { value: 1, name: 'ONLY ADDRESS' },
              ]}
            />
          </Input>
        </InputWrap>

        <InputWrap>
          <Label>Address</Label>
          <Input>
            <InputText />
          </Input>
        </InputWrap>
        <GeneralButton>Store Code</GeneralButton>
      </TabContents>
    </CosmWasmContainer>
  );
};

export default React.memo(CosmWasm);
