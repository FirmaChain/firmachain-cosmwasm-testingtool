import React, { useMemo, useState } from 'react';
import { Drawer } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

import { modalActions, queryActions } from '../../redux/action';
import { rootState } from '../../redux/reducers';
import useFirma from '../../utils/wallet';

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
  ClearButton,
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
  const { queryType, queryCode, queryContractAddress, queryHex, queryJSON, queryResult } = useSelector(
    (state: rootState) => state.query
  );

  const [isOpen, setOpen] = useState(false);
  const currentResult = useMemo(() => {
    return queryResult && queryResult[queryType] !== '' ? JSON.parse(queryResult[queryType]) : 'NULL';
  }, [queryResult, queryType]);

  const isActiveQuery = () => {
    switch (queryType) {
      case 0:
      case 2:
        return true;
      case 1:
      case 3:
        return queryCode !== '';
      case 4:
      case 5:
      case 6:
        return queryContractAddress !== '';
      case 7:
        return queryContractAddress !== '' && queryHex !== '';
      case 8:
        return queryContractAddress !== '' && queryJSON !== '';
    }

    return false;
  };

  const isEnableQueryCodeId = useMemo(() => {
    return [1, 3].includes(queryType);
  }, [queryType]);

  const isEnableQueryContractAddress = useMemo(() => {
    return [4, 5, 6].includes(queryType);
  }, [queryType]);

  const isEnableQueryHexString = useMemo(() => {
    return [7].includes(queryType);
  }, [queryType]);

  const isEnableQueryJSONData = useMemo(() => {
    return [8].includes(queryType);
  }, [queryType]);

  const successQuery = (result: any) => {
    queryActions.handleQueryResult(queryType, JSON.stringify(result));
  };

  const failedQuery = (e: any) => {
    enqueueSnackbar(e.message, {
      variant: 'error',
      autoHideDuration: 3000,
    });
    queryActions.handleQueryResult(queryType, 'ERROR');
  };

  const queryGetCodeList = () => {
    cosmwasmGetCodeList()
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetCodeData = () => {
    cosmwasmGetCodeData(queryCode)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetPinnedCodeList = () => {
    cosmwasmGetPinnedCodeList()
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetContractListFromCodeId = () => {
    cosmwasmGetContractListFromCodeId(queryCode)
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
    cosmwasmGetContractRawQueryData(queryContractAddress, queryHex)
      .then((result: any) => successQuery(result))
      .catch((e) => failedQuery(e));
  };

  const queryGetContractSmartQueryData = () => {
    cosmwasmGetContractSmartQueryData(queryContractAddress, queryJSON)
      .then((result: any) => successQuery({ result: JSON.parse(result.result) }))
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

  const onClickClearQueryData = () => {
    queryActions.handleQueryType(0);
    queryActions.handleQueryCode('');
    queryActions.handleQueryContractAddress('');
    queryActions.handleQueryHex('');
    queryActions.handleQueryJSON('');

    for (let i = 0; i < 9; i++) queryActions.handleQueryResult(i, '');
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
          <ClearButton onClick={() => onClickClearQueryData()}>Clear All</ClearButton>
          <TopContent>
            <InputWrap>
              <Label>Query</Label>
              <Input>
                <InputSelect optionList={queryList} value={queryType} setValue={queryActions.handleQueryType} />
              </Input>
            </InputWrap>
            {isEnableQueryCodeId && (
              <InputWrap>
                <Label>Code ID</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the Code number.'}
                    regExp={/^[0-9]*$/}
                    value={queryCode}
                    setValue={queryActions.handleQueryCode}
                  />
                </Input>
              </InputWrap>
            )}
            {(isEnableQueryContractAddress || isEnableQueryHexString || isEnableQueryJSONData) && (
              <InputWrap>
                <Label>Contract Address</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the contract address.'}
                    regExp={/^[a-zA-Z0-9]*$/}
                    value={queryContractAddress}
                    setValue={queryActions.handleQueryContractAddress}
                  />
                </Input>
              </InputWrap>
            )}
            {isEnableQueryHexString && (
              <InputWrap>
                <Label>Hex String</Label>
                <Input>
                  <InputText
                    placeholder={'Please enter the contract address.'}
                    value={queryHex}
                    setValue={queryActions.handleQueryHex}
                  />
                </Input>
              </InputWrap>
            )}
            {isEnableQueryJSONData && (
              <InputWrap>
                <Label>
                  JSON
                  <SmallButton onClick={() => onClickJSONModal(queryJSON)}>Check JSON</SmallButton>
                </Label>
                <Input>
                  <InputTextArea
                    placeholder={'Please enter the data valid JSON format'}
                    value={queryJSON}
                    setValue={queryActions.handleQueryJSON}
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
              <QueryResult result={currentResult} />
            </InputWrapRight>
          </BottomContent>
        </SidebarContainer>
      </Drawer>
    </>
  );
};

export default React.memo(CosmWasm);
