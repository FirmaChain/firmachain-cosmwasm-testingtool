import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/reducers';
import { modalActions, cosmwasmActions } from '../../redux/action';
import useFirma from '../../utils/wallet';

import InputFile from '../../components/inputFile';
import InputRadio from '../../components/inputRadio';
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
  InputWrapRight,
  Input,
  Label,
  GeneralButton,
  SmallButton,
  ClearWrapper,
  ClearButton,
} from './styles';

export interface TransactionResult {
  code: number;
  height: number;
  rawLog: string;
  transactionHash: string;
  gasUsed: number;
  gasWanted: number;
  pointContent: {
    name: '';
    value: '';
  };
}

const initializeTransactionResult: TransactionResult = {
  code: -1,
  height: 0,
  rawLog: '',
  transactionHash: '',
  gasUsed: 0,
  gasWanted: 0,
  pointContent: {
    name: '',
    value: '',
  },
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

  const { store, instantiate, execute, migrate } = useSelector((state: rootState) => state.cosmwasm);

  const [currentTab, setTab] = useState(0);
  const [storeWasmBinary, setStoreWasmBinary] = useState<Uint8Array>(new Uint8Array());
  // const [storeAccessConfig, setStoreAccessConfig] = useState(0);
  // const [storeAddress, setStoreAddress] = useState('');
  // const [instantiateCodeId, setInstantiateCodeId] = useState('');
  // const [instantiateFunds, setInstantiaFunds] = useState('');
  // const [instantiateLabel, setInstantiateLabel] = useState('');
  // const [instantiateArgs, setInstantiateArgs] = useState('');
  // const [executeContractAddress, setExecuteContractAddress] = useState('');
  // const [executeFunds, setExecuteFunds] = useState('');
  // const [executeArgs, setExecuteArgs] = useState('');
  // const [migrateContractAddress, setMigrateContractAddress] = useState('');
  // const [migrateCodeId, setMigrateCodeId] = useState('');
  // const [migrateArgs, setMigrateArgs] = useState('');

  const [isActiveStoreCode, setActiveStoreCode] = useState(false);
  const [isActiveInstantiateContract, setActiveInstantiateContract] = useState(false);
  const [isActiveExecuteContract, setActiveExecuteContract] = useState(false);
  const [isActiveMigrateContract, setActiveMigrateContract] = useState(false);

  const [txStoreResult, setTxStoreResult] = useState<TransactionResult>(initializeTransactionResult);
  const [txInstantiateResult, setTxInstantiateResult] = useState<TransactionResult>(initializeTransactionResult);
  const [txExecuteResult, setTxExecuteResult] = useState<TransactionResult>(initializeTransactionResult);
  const [txMigrateResult, setTxMigrateResult] = useState<TransactionResult>(initializeTransactionResult);

  useEffect(() => {
    setActiveStoreCode(
      walletState.mnemonic !== '' &&
        storeWasmBinary.length > 0 &&
        (store.accessConfig === 1 ? isValidAddress(store.address) : true)
    );
  }, [storeWasmBinary, store]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveInstantiateContract(walletState.mnemonic !== '' && instantiate.codeId !== '' && instantiate.label !== '');
  }, [instantiate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveExecuteContract(walletState.mnemonic !== '' && execute.address !== '');
  }, [execute]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveMigrateContract(walletState.mnemonic !== '' && migrate.codeId !== '' && migrate.address !== '');
  }, [migrate]); // eslint-disable-line react-hooks/exhaustive-deps

  const successTx = (result: any, txType: string, resolveTx: () => void) => {
    if (result.code === 0) {
      switch (txType) {
        case 'store':
          setTxStoreResult(result);
          break;
        case 'instantiate':
          setTxInstantiateResult(result);
          break;
        case 'execute':
          setTxExecuteResult(result);
          break;
        case 'migrate':
          setTxMigrateResult(result);
          break;
      }
      resolveTx();
    } else {
      throw result;
    }
  };

  const failedTx = (e: any, txType: string, rejectTx: () => void) => {
    console.log(e);

    if (e.code) {
      switch (txType) {
        case 'store':
          setTxStoreResult(e);
          break;
        case 'instantiate':
          setTxInstantiateResult(e);
          break;
        case 'execute':
          setTxExecuteResult(e);
          break;
        case 'migrate':
          setTxMigrateResult(e);
          break;
      }
    }
    rejectTx();
  };

  const txStoreCode = (resolveTx: () => void, rejectTx: () => void) => {
    cosmwasmStoreCode(walletState.mnemonic, storeWasmBinary, store.accessConfig, store.address)
      .then((result: any) => successTx(result, 'store', resolveTx))
      .catch((e) => failedTx(e, 'store', rejectTx));
  };

  const txInstantiateContract = (resolveTx: () => void, rejectTx: () => void) => {
    cosmwasmInstantiateContract(
      walletState.mnemonic,
      instantiate.codeId,
      instantiate.funds,
      instantiate.label,
      instantiate.args
    )
      .then((result: any) => successTx(result, 'instantiate', resolveTx))
      .catch((e) => failedTx(e, 'instantiate', rejectTx));
  };

  const txExecuteContract = (resolveTx: () => void, rejectTx: () => void) => {
    cosmwasmExecuteContract(walletState.mnemonic, execute.address, execute.funds, execute.args)
      .then((result: any) => successTx(result, 'execute', resolveTx))
      .catch((e) => failedTx(e, 'execute', rejectTx));
  };

  const txMigrateContract = (resolveTx: () => void, rejectTx: () => void) => {
    cosmwasmMigrateContract(walletState.mnemonic, migrate.address, migrate.codeId, migrate.args)
      .then((result: any) => successTx(result, 'migrate', resolveTx))
      .catch((e) => failedTx(e, 'migrate', rejectTx));
  };

  const tabList = [
    { name: 'Store', action: txStoreCode },
    { name: 'Instantiate', action: txInstantiateContract },
    { name: 'Execute', action: txExecuteContract },
    { name: 'Migrate', action: txMigrateContract },
  ];

  const changeTab = (tabIndex: number) => {
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

  const onClickJSONModal = (jsonData: string) => {
    modalActions.handleModalData({ jsonData });
    modalActions.handleModalJSON(true);
  };

  const setStoreAccessConfig = (value: number) => {
    cosmwasmActions.handleStoreData(value, store.address);
  };

  const setStoreAddress = (value: string) => {
    cosmwasmActions.handleStoreData(store.accessConfig, value);
  };

  const setInstantiateCodeId = (value: string) => {
    cosmwasmActions.handleInstantiateData(value, instantiate.funds, instantiate.label, instantiate.args);
  };

  const setInstantiaFunds = (value: string) => {
    cosmwasmActions.handleInstantiateData(instantiate.codeId, value, instantiate.label, instantiate.args);
  };

  const setInstantiateLabel = (value: string) => {
    cosmwasmActions.handleInstantiateData(instantiate.codeId, instantiate.funds, value, instantiate.args);
  };

  const setInstantiateArgs = (value: string) => {
    cosmwasmActions.handleInstantiateData(instantiate.codeId, instantiate.funds, instantiate.label, value);
  };

  const setExecuteContractAddress = (value: string) => {
    cosmwasmActions.handleExecuteData(value, execute.funds, execute.args);
  };

  const setExecuteFunds = (value: string) => {
    cosmwasmActions.handleExecuteData(execute.address, value, execute.args);
  };

  const setExecuteArgs = (value: string) => {
    cosmwasmActions.handleExecuteData(execute.address, execute.funds, value);
  };

  const setMigrateContractAddress = (value: string) => {
    cosmwasmActions.handleMigrateData(value, migrate.codeId, migrate.args);
  };

  const setMigrateCodeId = (value: string) => {
    cosmwasmActions.handleMigrateData(migrate.address, value, migrate.args);
  };

  const setMigrateArgs = (value: string) => {
    cosmwasmActions.handleMigrateData(migrate.address, migrate.codeId, value);
  };

  const onClickClearCosmwasm = () => {
    switch (currentTab) {
      case 0:
        cosmwasmActions.handleStoreData(0, '');
        break;
      case 1:
        cosmwasmActions.handleInstantiateData('', '', '', '');
        break;
      case 2:
        cosmwasmActions.handleExecuteData('', '', '');
        break;
      case 3:
        cosmwasmActions.handleMigrateData('', '', '');
        break;
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
          <ClearWrapper>
            <ClearButton onClick={() => onClickClearCosmwasm()}>Clear</ClearButton>
          </ClearWrapper>

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
                <InputRadio
                  optionList={['Everybody', 'Only Address']}
                  value={store.accessConfig}
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
                  disabled={store.accessConfig === 0}
                  value={store.address}
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
            <InputWrapRight>
              <Label>Transaction Result</Label>
              <TxResult result={txStoreResult} />
            </InputWrapRight>
          </RightContent>
        </TabContent>
        <TabContent>
          <ClearWrapper>
            <ClearButton onClick={() => onClickClearCosmwasm()}>Clear</ClearButton>
          </ClearWrapper>

          <LeftContent>
            <InputGroup>
              <InputWrapHalf>
                <Label>Code ID</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the Code number.'}
                    regExp={/^[0-9]*$/}
                    value={instantiate.codeId}
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
                    value={instantiate.funds}
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
                  value={instantiate.label}
                  setValue={setInstantiateLabel}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>
                Init args (JSON)
                <SmallButton onClick={() => onClickJSONModal(instantiate.args)}>Check JSON</SmallButton>
              </Label>
              <Input>
                <InputTextArea
                  placeholder={'Please enter the data valid JSON format'}
                  value={instantiate.args}
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
            <InputWrapRight>
              <Label>Transaction Result</Label>
              <TxResult result={txInstantiateResult} />
            </InputWrapRight>
          </RightContent>
        </TabContent>
        <TabContent>
          <ClearWrapper>
            <ClearButton onClick={() => onClickClearCosmwasm()}>Clear</ClearButton>
          </ClearWrapper>

          <LeftContent>
            <InputWrap>
              <Label>Contract Address</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the contract address.'}
                  regExp={/^[a-zA-Z0-9]*$/}
                  value={execute.address}
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
                  value={execute.funds}
                  setValue={setExecuteFunds}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>
                Send args (JSON)
                <SmallButton onClick={() => onClickJSONModal(execute.args)}>Check JSON</SmallButton>
              </Label>
              <Input>
                <InputTextArea
                  placeholder={'Please enter the data valid JSON format'}
                  value={execute.args}
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
            <InputWrapRight>
              <Label>Transaction Result</Label>
              <TxResult result={txExecuteResult} />
            </InputWrapRight>
          </RightContent>
        </TabContent>
        <TabContent>
          <ClearWrapper>
            <ClearButton onClick={() => onClickClearCosmwasm()}>Clear</ClearButton>
          </ClearWrapper>

          <LeftContent>
            <InputWrap>
              <Label>Contract Address</Label>
              <Input>
                <InputText
                  placeholder={'Please enter the contract address.'}
                  regExp={/^[a-zA-Z0-9]*$/}
                  value={migrate.address}
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
                  value={migrate.codeId}
                  setValue={setMigrateCodeId}
                />
              </Input>
            </InputWrap>
            <InputWrap>
              <Label>
                Migrate args (JSON)
                <SmallButton onClick={() => onClickJSONModal(migrate.args)}>Check JSON</SmallButton>
              </Label>
              <Input>
                <InputTextArea
                  placeholder={'Please enter the data valid JSON format'}
                  value={migrate.args}
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
            <InputWrapRight>
              <Label>Transaction Result</Label>
              <TxResult result={txMigrateResult} />
            </InputWrapRight>
          </RightContent>
        </TabContent>
      </TabContents>
    </CosmWasmContainer>
  );
};

export default React.memo(CosmWasm);
