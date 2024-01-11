import { combineReducers } from 'redux';
import walletReducer, { IWalletState } from './walletReducer';
import modalReducer, { IModalState } from './modalReducer';
import queryReducer, { IQueryState } from './queryReducer';
import cosmwasmReducer, { ICosmwasmState } from './cosmwasmReducer';

export interface rootState {
  wallet: IWalletState;
  modal: IModalState;
  query: IQueryState;
  cosmwasm: ICosmwasmState;
}

export default combineReducers({
  wallet: walletReducer,
  modal: modalReducer,
  query: queryReducer,
  cosmwasm: cosmwasmReducer,
});
