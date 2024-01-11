import {
  HANDLE_QUERY_TYPE,
  HANDLE_QUERY_CODE,
  HANDLE_QUERY_CONTRACT_ADDRESS,
  HANDLE_QUERY_HEX,
  HANDLE_QUERY_JSON,
  HANDLE_QUERY_RESULT,
} from '../types';

export const handleQueryType = (queryType: number) => ({
  type: HANDLE_QUERY_TYPE,
  queryType,
});

export const handleQueryCode = (queryCode: string) => ({
  type: HANDLE_QUERY_CODE,
  queryCode,
});

export const handleQueryContractAddress = (queryContractAddress: string) => ({
  type: HANDLE_QUERY_CONTRACT_ADDRESS,
  queryContractAddress,
});

export const handleQueryHex = (queryHex: string) => ({
  type: HANDLE_QUERY_HEX,
  queryHex,
});

export const handleQueryJSON = (queryJSON: string) => ({
  type: HANDLE_QUERY_JSON,
  queryJSON,
});

export const handleQueryResult = (index: number, queryResult: string) => ({
  type: HANDLE_QUERY_RESULT,
  index,
  queryResult,
});
