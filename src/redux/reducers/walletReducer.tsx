import { createReducer } from '@reduxjs/toolkit';
import { HANDLE_WALLET_DATA, HANDLE_WALLET_BALANCE } from '../types';

export interface IWalletState {
  address: string;
  mnemonic: string;
  privateKey: string;
  balance: string;
}

const initialState = {
  address: '',
  mnemonic: '',
  privateKey: '',
  balance: '',
};

export default createReducer(initialState, {
  [HANDLE_WALLET_DATA]: (state: IWalletState, { address, mnemonic, privateKey }) => {
    state.address = address;
    state.mnemonic = mnemonic;
    state.privateKey = privateKey;
  },
  [HANDLE_WALLET_BALANCE]: (state: IWalletState, { balance }) => {
    state.balance = balance;
  },
});
