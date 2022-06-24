import React, { useState } from 'react';
import InputFile from '../../components/inputFile';
import InputSelect from '../../components/inputSelect';
import InputText from '../../components/inputText';
import InputTextArea from '../../components/inputTextArea';
import TxResult from '../txResult';
import {
  CosmWasmContainer,
  TabMenuList,
  TabMenu,
  TabText,
  TabContents,
  TabContent,
  LeftContent,
  RightContent,
  InputWrap,
  Input,
  Label,
  GeneralButton,
} from './styles';

const CosmWasm = () => {
  const [currentTab, setTab] = useState(0);
  const [storeAccessConfig, setStoreAccessConfig] = useState(0);
  const [storeAddress, setStoreAddress] = useState('');
  const [instantiateCodeId, setInstantiateCodeId] = useState('');
  const [instantiateLabel, setInstantiateLabel] = useState('');
  const [instantiateArgs, setInstantiateArgs] = useState('');
  const [executeContractAddress, setExecuteContractAddress] = useState('');
  const [executeFunds, setExecuteFunds] = useState('');
  const [executeArgs, setExecuteArgs] = useState('');
  const [migrateContractAddress, setMigrateContractAddress] = useState('');
  const [migrateCodeId, setMigrateCodeId] = useState('');
  const [migrateArgs, setMigrateArgs] = useState('');

  const tabList = ['Store', 'Instantiate', 'Excute', 'Migrate', 'Query'];

  const resetTab = () => {
    setStoreAccessConfig(0);
    setStoreAddress('');
    setInstantiateCodeId('');
    setInstantiateLabel('');
    setInstantiateArgs('');
    setExecuteContractAddress('');
    setExecuteFunds('');
    setExecuteArgs('');
    setMigrateContractAddress('');
    setMigrateCodeId('');
    setMigrateArgs('');
  };

  const changeTab = (tabIndex: number) => {
    resetTab();
    setTab(tabIndex);
  };

  return (
    <CosmWasmContainer>
      <TabMenuList currentTab={currentTab}>
        {tabList.map((tabName: string, index: number) => (
          <TabMenu onClick={() => changeTab(index)} key={index}>
            <TabText>{tabName}</TabText>
          </TabMenu>
        ))}
      </TabMenuList>
      <TabContents currentTab={currentTab}>
        <TabContent>
          <LeftContent>
            <InputWrap>
              <Label>Wasm binary file</Label>
              <Input>
                <InputFile />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>Access Config</Label>
              <Input>
                <InputSelect
                  optionList={['Everybody', 'Only Address']}
                  value={storeAccessConfig}
                  setValue={setStoreAccessConfig}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>Address</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the only address when selecting it.'}
                  regExp={/^[a-zA-Z0-9]*$/}
                  disabled={storeAccessConfig === 0}
                  value={storeAddress}
                  setValue={setStoreAddress}
                />
              </Input>
            </InputWrap>
            <GeneralButton>Store Code</GeneralButton>
          </LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult />
            </InputWrap>
          </RightContent>
        </TabContent>
        <TabContent>
          <LeftContent>
            <InputWrap>
              <Label>Code ID</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the Code number.'}
                  regExp={/^[0-9]*$/}
                  value={instantiateCodeId}
                  setValue={setInstantiateCodeId}
                />
              </Input>
            </InputWrap>

            <InputWrap>
              <Label>Label</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the contract label.'}
                  value={instantiateLabel}
                  setValue={setInstantiateLabel}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>Init args (JSON)</Label>
              <Input>
                <InputTextArea
                  placeholder={'Please enter the data valid JSON format'}
                  value={instantiateArgs}
                  setValue={setInstantiateArgs}
                />
              </Input>
            </InputWrap>
            <GeneralButton>Instantiate Code</GeneralButton>
          </LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult />
            </InputWrap>
          </RightContent>
        </TabContent>
        <TabContent>
          <LeftContent>
            <InputWrap>
              <Label>Contract Address</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the contract address.'}
                  regExp={/^[a-zA-Z0-9]*$/}
                  value={executeContractAddress}
                  setValue={setExecuteContractAddress}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>FCT Amount (Funds)</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the fct amount'}
                  regExp={/^[0-9.]*$/}
                  value={executeFunds}
                  setValue={setExecuteFunds}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>Send args (JSON)</Label>
              <Input>
                <InputTextArea
                  placeholder={'Please enter the data valid JSON format'}
                  value={executeArgs}
                  setValue={setExecuteArgs}
                />
              </Input>
            </InputWrap>
            <GeneralButton>Execute Code</GeneralButton>
          </LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult />
            </InputWrap>
          </RightContent>
        </TabContent>
        <TabContent>
          <LeftContent>
            <InputWrap>
              <Label>Contract Address</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the contract address.'}
                  regExp={/^[a-zA-Z0-9]*$/}
                  value={migrateContractAddress}
                  setValue={setMigrateContractAddress}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>Code ID</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the Code number.'}
                  regExp={/^[0-9]*$/}
                  value={migrateCodeId}
                  setValue={setMigrateCodeId}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>Migrate args (JSON)</Label>
              <Input>
                <InputTextArea
                  placeholder={'Please enter the data valid JSON format'}
                  value={migrateArgs}
                  setValue={setMigrateArgs}
                />
              </Input>
            </InputWrap>
            <GeneralButton>Migrate Code</GeneralButton>
          </LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult />
            </InputWrap>
          </RightContent>
        </TabContent>
        <TabContent>
          <LeftContent></LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult />
            </InputWrap>
          </RightContent>
        </TabContent>
      </TabContents>
    </CosmWasmContainer>
  );
};

export default React.memo(CosmWasm);
