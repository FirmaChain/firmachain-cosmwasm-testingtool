import { combineReducers } from 'redux';
import walletReducer, { IWalletState } from './walletReducer';

export interface rootState {
  wallet: IWalletState;
}

export default combineReducers({
  wallet: walletReducer,
});
