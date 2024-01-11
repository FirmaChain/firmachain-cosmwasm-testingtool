import { bindActionCreators } from 'redux';

import * as walletAction from './actions/walletAction';
import * as modalAction from './actions/modalAction';
import * as queryAction from './actions/queryAction';
import * as cosmwasmAction from './actions/cosmwasmAction';

import store from './store';

const { dispatch } = store;

export const walletActions = bindActionCreators(walletAction, dispatch);
export const modalActions = bindActionCreators(modalAction, dispatch);
export const queryActions = bindActionCreators(queryAction, dispatch);
export const cosmwasmActions = bindActionCreators(cosmwasmAction, dispatch);
