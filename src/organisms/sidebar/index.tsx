import React, { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import { modalActions } from '../../redux/action';
import useFirma from '../../utils/wallet';
import { useSnackbar } from 'notistack';

import InputSelect from '../../components/inputSelect';
import InputText from '../../components/inputText';
import InputTextArea from '../../components/inputTextArea';
import QueryResult from '../queryResult';
import {
  SidebarContainer,
  TopContent,
  BottomContent,
  InputWrap,
  InputWrapRight,
  Input,
  Label,
  GeneralButton,
  SmallButton,
  QueryButton,
} from './styles';

const CosmWasm = () => {
  const {
    cosmwasmGetCodeList,
    cosmwasmGetCodeData,
    cosmwasmGetPinnedCodeList,
    cosmwasmGetContractListFromCodeId,
    cosmwasmGetContractInfo,
    cosmwasmGetContractHistory,
    cosmwasmGetContractState,
    cosmwasmGetContractRawQueryData,
    cosmwasmGetContractSmartQueryData,
  } = useFirma();

  const { enqueueSnackbar } = useSnackbar();

  const [queryType, setQueryType] = useState(0);
  const [queryCodeId, setQueryCodeId] = useState('');
  const [queryContractAddress, setQueryContractAddress] = useState('');
  const [queryHexString, setQueryHexString] = useState('');
  const [queryJSONString, setQueryJSONString] = useState('');

  const [isOpen, setOpen] = useState(false);

  const [queryResult, setQueryResult] = useState<any>();

  useEffect(() => {
    setQueryCodeId('');
    setQueryContractAddress('');
    setQueryResult(null);
  }, [queryType]);

  const isActiveQuery = () => {
    switch (queryType) {
      case 0:
      case 2:
        return true;
      case 1:
      case 3:
        return queryCodeId !== '';
      case 4:
      case 5:
      case 6:
        return queryContractAddress !== '';
      case 7:
        return queryContractAddress !== '' && queryHexString !== '';
      case 8:
        return queryContractAddress !== '' && queryJSONString !== '';
    }

    return false;
  };

  const isEnableQueryCodeId = () => {
    return [1, 3].includes(queryType);
  };

  const isEnableQueryContractAddress = () => {
    return [4, 5, 6].includes(queryType);
  };

  const isEnableQueryHexString = () => {
    return [7].includes(queryType);
  };

  const isEnableQueryJSONData = () => {
    return [8].includes(queryType);
  };

  const successQuery = (result: any) => {
    setQueryResult(result);
  };

  const failedQuery = (e: any) => {
    enqueueSnackbar(e.message, {
      variant: 'error',
      autoHideDuration: 3000,
    });
    setQueryResult('ERROR');
  };

  const queryGetCodeList = () => {
    cosmwasmGetCodeList()
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetCodeData = () => {
    cosmwasmGetCodeData(queryCodeId)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetPinnedCodeList = () => {
    cosmwasmGetPinnedCodeList()
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetContractListFromCodeId = () => {
    cosmwasmGetContractListFromCodeId(queryCodeId)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetContractInfo = () => {
    cosmwasmGetContractInfo(queryContractAddress)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetContractHistory = () => {
    cosmwasmGetContractHistory(queryContractAddress)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetContractState = () => {
    cosmwasmGetContractState(queryContractAddress)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetContractRawQueryData = () => {
    cosmwasmGetContractRawQueryData(queryContractAddress, queryHexString)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetContractSmartQueryData = () => {
    cosmwasmGetContractSmartQueryData(queryContractAddress, queryJSONString)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryList = [
    { name: 'GetCodeList', action: queryGetCodeList },
    { name: 'GetCodeData', action: queryGetCodeData },
    { name: 'GetPinnedCodeList', action: queryGetPinnedCodeList },
    { name: 'GetContractListFromCodeId', action: queryGetContractListFromCodeId },
    { name: 'GetContractInfo', action: queryGetContractInfo },
    { name: 'GetContractHistory', action: queryGetContractHistory },
    { name: 'GetContractState', action: queryGetContractState },
    { name: 'GetContractRawQueryData', action: queryGetContractRawQueryData },
    { name: 'GetContractSmartQueryData', action: queryGetContractSmartQueryData },
  ];

  const onClickButtonInQuery = () => {
    if (isActiveQuery()) {
      queryList[queryType].action();
    }
  };

  const onClickJSONModal = (jsonData: string) => {
    modalActions.handleModalData({ jsonData });
    modalActions.handleModalJSON(true);
  };

  const toggleDrawer = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <QueryButton isOpen={isOpen} onClick={toggleDrawer}>
        Query
      </QueryButton>

      <Drawer
        transitionDuration={300}
        anchor='right'
        open={isOpen}
        ModalProps={{
          onBackdropClick: toggleDrawer,
        }}
        PaperProps={{
          sx: {
            width: '600px',
            height: 'calc(100% - 40px)',
            padding: '20px',
            backgroundColor: 'rgb(42, 44, 51)',
          },
        }}
      >
        <SidebarContainer>
          <TopContent>
            <InputWrap>
              <Label>Query</Label>
              <Input>
                <InputSelect optionList={queryList} value={queryType} setValue={setQueryType} />
              </Input>
            </InputWrap>
            {isEnableQueryCodeId() && (
              <InputWrap>
                <Label>Code ID</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the Code number.'}
                    regExp={/^[0-9]*$/}
                    value={queryCodeId}
                    setValue={setQueryCodeId}
                  />
                </Input>
              </InputWrap>
            )}
            {(isEnableQueryContractAddress() || isEnableQueryHexString() || isEnableQueryJSONData()) && (
              <InputWrap>
                <Label>Contract Address</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the contract address.'}
                    regExp={/^[a-zA-Z0-9]*$/}
                    value={queryContractAddress}
                    setValue={setQueryContractAddress}
                  />
                </Input>
              </InputWrap>
            )}
            {isEnableQueryHexString() && (
              <InputWrap>
                <Label>Hex String</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the contract address.'}
                    value={queryHexString}
                    setValue={setQueryHexString}
                  />
                </Input>
              </InputWrap>
            )}
            {isEnableQueryJSONData() && (
              <InputWrap>
                <Label>
                  JSON
                  <SmallButton onClick={() => onClickJSONModal(queryJSONString)}>Check JSON</SmallButton>
                </Label>
                <Input>
                  <InputTextArea
                    placeholder={'Please enter the data valid JSON format'}
                    value={queryJSONString}
                    setValue={setQueryJSONString}
                  />
                </Input>
              </InputWrap>
            )}
            <GeneralButton
              active={isActiveQuery()}
              onClick={() => {
                onClickButtonInQuery();
              }}
            >
              Query
            </GeneralButton>
          </TopContent>
          <BottomContent>
            <InputWrapRight>
              <Label>Result</Label>
              <QueryResult result={queryResult} />
            </InputWrapRight>
          </BottomContent>
        </SidebarContainer>
      </Drawer>
    </>
  );
};

export default React.memo(CosmWasm);
