import { createReducer } from '@reduxjs/toolkit';
import {
  HANDLE_QUERY_TYPE,
  HANDLE_QUERY_CODE,
  HANDLE_QUERY_CONTRACT_ADDRESS,
  HANDLE_QUERY_HEX,
  HANDLE_QUERY_JSON,
  HANDLE_QUERY_RESULT,
} from '../types';

export interface IQueryState {
  queryType: number;
  queryCode: string;
  queryContractAddress: string;
  queryHex: string;
  queryJSON: string;
  queryResult: Array<string>;
}

const initialState = {
  queryType: 0,
  queryCode: '',
  queryContractAddress: '',
  queryHex: '',
  queryJSON: '',
  queryResult: ['', '', '', '', '', '', '', '', ''],
};

export default createReducer(initialState, {
  [HANDLE_QUERY_TYPE]: (state: IQueryState, { queryType }) => {
    state.queryType = queryType;
  },
  [HANDLE_QUERY_CODE]: (state: IQueryState, { queryCode }) => {
    state.queryCode = queryCode;
  },
  [HANDLE_QUERY_CONTRACT_ADDRESS]: (state: IQueryState, { queryContractAddress }) => {
    state.queryContractAddress = queryContractAddress;
  },
  [HANDLE_QUERY_HEX]: (state: IQueryState, { queryHex }) => {
    state.queryHex = queryHex;
  },
  [HANDLE_QUERY_JSON]: (state: IQueryState, { queryJSON }) => {
    state.queryJSON = queryJSON;
  },
  [HANDLE_QUERY_RESULT]: (state: IQueryState, { index, queryResult }) => {
    state.queryResult[index] = queryResult;
  },
});
