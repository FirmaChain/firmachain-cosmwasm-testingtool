import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/reducers';
import { modalActions } from '../../redux/action';
import useFirma from '../../utils/wallet';

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
  InputGroup,
  InputWrapHalf,
  InputWrap,
  Input,
  Label,
  GeneralButton,
} from './styles';

export interface TransactionResult {
  code: number;
  height: number;
  rawLog: string;
  transactionHash: string;
  gasUsed: number;
  gasWanted: number;
}

const initializeTransactionResult: TransactionResult = {
  code: -1,
  height: 0,
  rawLog: '',
  transactionHash: '',
  gasUsed: 0,
  gasWanted: 0,
};

const CosmWasm = () => {
  const {
    isValidAddress,
    cosmwasmStoreCode,
    cosmwasmInstantiateContract,
    cosmwasmExecuteContract,
    cosmwasmMigrateContract,
  } = useFirma();
  const walletState = useSelector((state: rootState) => state.wallet);

  const [currentTab, setTab] = useState(0);
  const [storeWasmBinary, setStoreWasmBinary] = useState<Uint8Array>(new Uint8Array());
  const [storeAccessConfig, setStoreAccessConfig] = useState(0);
  const [storeAddress, setStoreAddress] = useState('');
  const [instantiateCodeId, setInstantiateCodeId] = useState('');
  const [instantiateFunds, setInstantiaFunds] = useState('');
  const [instantiateLabel, setInstantiateLabel] = useState('');
  const [instantiateArgs, setInstantiateArgs] = useState('');
  const [executeContractAddress, setExecuteContractAddress] = useState('');
  const [executeFunds, setExecuteFunds] = useState('');
  const [executeArgs, setExecuteArgs] = useState('');
  const [migrateContractAddress, setMigrateContractAddress] = useState('');
  const [migrateCodeId, setMigrateCodeId] = useState('');
  const [migrateArgs, setMigrateArgs] = useState('');

  const [isActiveStoreCode, setActiveStoreCode] = useState(false);
  const [isActiveInstantiateContract, setActiveInstantiateContract] = useState(false);
  const [isActiveExecuteContract, setActiveExecuteContract] = useState(false);
  const [isActiveMigrateContract, setActiveMigrateContract] = useState(false);
  // const [isActiveQuery, setActiveQuery] = useState(false);

  const [txStoreCodeResult, setTxStoreCodeResult] = useState<TransactionResult>(initializeTransactionResult);
  const [txInstantiateContractResult, setTxInstantiateContractResult] =
    useState<TransactionResult>(initializeTransactionResult);
  const [txExecuteContractResult, setTxExecuteContractResult] =
    useState<TransactionResult>(initializeTransactionResult);
  const [txMigrateContractResult, setTxMigrateContractResult] =
    useState<TransactionResult>(initializeTransactionResult);

  useEffect(() => {
    setActiveStoreCode(
      walletState.mnemonic !== '' &&
        storeWasmBinary.length > 0 &&
        (storeAccessConfig === 1 ? isValidAddress(storeAddress) : true)
    );
  }, [storeWasmBinary, storeAccessConfig, storeAddress]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveInstantiateContract(walletState.mnemonic !== '' && instantiateCodeId !== '' && instantiateLabel !== '');
  }, [instantiateCodeId, instantiateFunds, instantiateLabel, instantiateArgs]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveExecuteContract(walletState.mnemonic !== '' && executeContractAddress !== '');
  }, [executeContractAddress, executeFunds, executeArgs]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveMigrateContract(walletState.mnemonic !== '' && migrateCodeId !== '' && migrateContractAddress !== '');
  }, [migrateContractAddress, migrateCodeId, migrateArgs]); // eslint-disable-line react-hooks/exhaustive-deps

  const successTx = (result: any, resolveTx: () => void, setTxResult: (txResult: TransactionResult) => void) => {
    if (result.code === 0) {
      setTxResult(result);
      resolveTx();
    } else {
      throw result;
    }
  };

  const failedTx = (e: any, rejectTx: () => void, setTxResult: (txResult: TransactionResult) => void) => {
    console.log(e);

    if (e.code) {
      setTxResult(e);
    }
    rejectTx();
  };

  const txStoreCode = (resolveTx: () => void, rejectTx: () => void) => {
    cosmwasmStoreCode(walletState.mnemonic, storeWasmBinary, storeAccessConfig, storeAddress)
      .then((result: any) => successTx(result, resolveTx, setTxStoreCodeResult))
      .catch((e) => failedTx(e, rejectTx, setTxStoreCodeResult));
  };

  const txInstantiateContract = (resolveTx: () => void, rejectTx: () => void) => {
    console.log(instantiateArgs);
    console.log(JSON.stringify(instantiateArgs));

    cosmwasmInstantiateContract(
      walletState.mnemonic,
      instantiateCodeId,
      instantiateFunds,
      instantiateLabel,
      instantiateArgs
    )
      .then((result: any) => successTx(result, resolveTx, setTxInstantiateContractResult))
      .catch((e) => failedTx(e, rejectTx, setTxInstantiateContractResult));
  };

  const txExecuteContract = (resolveTx: () => void, rejectTx: () => void) => {
    cosmwasmExecuteContract(walletState.mnemonic, executeContractAddress, executeFunds, executeArgs)
      .then((result: any) => successTx(result, resolveTx, setTxExecuteContractResult))
      .catch((e) => failedTx(e, rejectTx, setTxExecuteContractResult));
  };

  const txMigrateContract = (resolveTx: () => void, rejectTx: () => void) => {
    cosmwasmMigrateContract(walletState.mnemonic, migrateContractAddress, migrateCodeId, migrateArgs)
      .then((result: any) => successTx(result, resolveTx, setTxMigrateContractResult))
      .catch((e) => failedTx(e, rejectTx, setTxMigrateContractResult));
  };

  const tabList = [
    { name: 'Store', action: txStoreCode },
    { name: 'Instantiate', action: txInstantiateContract },
    { name: 'Execute', action: txExecuteContract },
    { name: 'Migrate', action: txMigrateContract },
    { name: 'Query', action: () => {} },
  ];

  const resetTab = () => {
    setStoreWasmBinary(new Uint8Array());
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
    setTxStoreCodeResult(initializeTransactionResult);
    setTxInstantiateContractResult(initializeTransactionResult);
    setTxExecuteContractResult(initializeTransactionResult);
    setTxMigrateContractResult(initializeTransactionResult);
  };

  const changeTab = (tabIndex: number) => {
    resetTab();
    setTab(tabIndex);
  };

  const onClickButtonInTab = (tabIndex: number, isActive: boolean) => {
    if (isActive) {
      modalActions.handleModalData({
        txAction: tabList[tabIndex].action,
      });
      modalActions.handleModalQueueTx(true);
    }
  };

  return (
    <CosmWasmContainer>
      <TabMenuList currentTab={currentTab}>
        {tabList.map((tab: any, index: number) => (
          <TabMenu onClick={() => changeTab(index)} key={index}>
            <TabText>{tab.name}</TabText>
          </TabMenu>
        ))}
      </TabMenuList>
      <TabContents currentTab={currentTab}>
        <TabContent>
          <LeftContent>
            <InputWrap>
              <Label>Wasm binary file</Label>
              <Input>
                <InputFile value={storeWasmBinary} setValue={setStoreWasmBinary} />
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
            <GeneralButton
              active={isActiveStoreCode}
              onClick={() => {
                onClickButtonInTab(0, isActiveStoreCode);
              }}
            >
              Store Code
            </GeneralButton>
          </LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult result={txStoreCodeResult} />
            </InputWrap>
          </RightContent>
        </TabContent>
        <TabContent>
          <LeftContent>
            <InputGroup>
              <InputWrapHalf>
                <Label>Code ID</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the Code number.'}
                    regExp={/^[0-9]*$/}
                    value={instantiateCodeId}
                    setValue={setInstantiateCodeId}
                  />
                </Input>
              </InputWrapHalf>
              <InputWrapHalf>
                <Label>FCT Amount (Funds)</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the fct amount'}
                    regExp={/^[0-9.]*$/}
                    value={instantiateFunds}
                    setValue={setInstantiaFunds}
                  />
                </Input>
              </InputWrapHalf>
            </InputGroup>
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
            <GeneralButton
              active={isActiveInstantiateContract}
              onClick={() => {
                onClickButtonInTab(1, isActiveInstantiateContract);
              }}
            >
              Instantiate Contract
            </GeneralButton>
          </LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult result={txInstantiateContractResult} />
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
            <GeneralButton
              active={isActiveExecuteContract}
              onClick={() => {
                onClickButtonInTab(2, isActiveExecuteContract);
              }}
            >
              Execute Contract
            </GeneralButton>
          </LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult result={txExecuteContractResult} />
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
            <GeneralButton
              active={isActiveMigrateContract}
              onClick={() => {
                onClickButtonInTab(3, isActiveMigrateContract);
              }}
            >
              Migrate Contract
            </GeneralButton>
          </LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult result={txMigrateContractResult} />
            </InputWrap>
          </RightContent>
        </TabContent>
        <TabContent>
          <LeftContent></LeftContent>
          <RightContent>
            <InputWrap>
              <Label>Transaction Result</Label>
              <TxResult result={initializeTransactionResult} />
            </InputWrap>
          </RightContent>
        </TabContent>
      </TabContents>
    </CosmWasmContainer>
  );
};

export default React.memo(CosmWasm);
