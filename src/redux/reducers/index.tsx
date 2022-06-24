import { combineReducers } from 'redux';
import walletReducer, { IWalletState } from './walletReducer';
import modalReducer, { IModalState } from './modalReducer';

export interface rootState {
  wallet: IWalletState;
  modal: IModalState;
}

export default combineReducers({
  wallet: walletReducer,
  modal: modalReducer,
});
