import { createReducer } from '@reduxjs/toolkit';

import { HANDLE_STORE_DATA, HANDLE_INSTANTIATE_DATA, HANDLE_EXECUTE_DATA, HANDLE_MIGRATE_DATA } from '../types';

export interface ICosmwasmState {
  store: {
    accessConfig: number;
    address: string;
  };
  instantiate: {
    codeId: string;
    funds: string;
    label: string;
    args: string;
  };
  execute: {
    address: string;
    funds: string;
    args: string;
  };
  migrate: {
    address: string;
    codeId: string;
    args: string;
  };
}

const initialState = {
  store: {
    accessConfig: 0,
    address: '',
  },
  instantiate: {
    codeId: '',
    funds: '',
    label: '',
    args: '',
  },
  execute: {
    address: '',
    funds: '',
    args: '',
  },
  migrate: {
    address: '',
    codeId: '',
    args: '',
  },
};

export default createReducer(initialState, {
  [HANDLE_STORE_DATA]: (state: ICosmwasmState, { accessConfig, address }) => {
    state.store.accessConfig = accessConfig;
    state.store.address = address;
  },
  [HANDLE_INSTANTIATE_DATA]: (state: ICosmwasmState, { codeId, funds, label, args }) => {
    state.instantiate.codeId = codeId;
    state.instantiate.funds = funds;
    state.instantiate.label = label;
    state.instantiate.args = args;
  },
  [HANDLE_EXECUTE_DATA]: (state: ICosmwasmState, { address, funds, args }) => {
    state.execute.address = address;
    state.execute.funds = funds;
    state.execute.args = args;
  },
  [HANDLE_MIGRATE_DATA]: (state: ICosmwasmState, { address, codeId, args }) => {
    state.migrate.address = address;
    state.migrate.codeId = codeId;
    state.migrate.args = args;
  },
});
