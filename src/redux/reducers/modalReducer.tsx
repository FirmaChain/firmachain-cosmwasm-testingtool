import { createReducer } from '@reduxjs/toolkit';
import {
  HANDLE_MODAL_RESET,
  HANDLE_MODAL_DATA,
  HANDLE_MODAL_WALLET,
  HANDLE_MODAL_QUEUETX,
  HANDLE_MODAL_JSON,
} from '../types';

export interface IModalState {
  data: any;
  wallet: boolean;
  queueTx: boolean;
  json: boolean;
}

const initialState: IModalState = {
  data: {},
  wallet: false,
  queueTx: false,
  json: false,
};

export default createReducer(initialState, {
  [HANDLE_MODAL_RESET]: (state: IModalState) => {
    return {
      ...initialState,
    };
  },
  [HANDLE_MODAL_DATA]: (state: IModalState, { data }) => {
    state.data = data;
  },
  [HANDLE_MODAL_WALLET]: (state: IModalState, { isVisible }) => {
    state.wallet = isVisible;
  },
  [HANDLE_MODAL_QUEUETX]: (state: IModalState, { isVisible }) => {
    state.queueTx = isVisible;
  },
  [HANDLE_MODAL_JSON]: (state: IModalState, { isVisible }) => {
    state.json = isVisible;
  },
});
