import { createReducer } from '@reduxjs/toolkit';
import { HANDLE_MODAL_RESET, HANDLE_MODAL_DATA, HANDLE_MODAL_WALLET } from '../types';

export interface IModalState {
  data: any;
  wallet: boolean;
}

const initialState: IModalState = {
  data: {},
  wallet: false,
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
});
