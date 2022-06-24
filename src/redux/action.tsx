import { bindActionCreators } from 'redux';

import * as walletAction from './actions/walletAction';
import * as modalAction from './actions/modalAction';

import store from './store';

const { dispatch } = store;

export const walletActions = bindActionCreators(walletAction, dispatch);
export const modalActions = bindActionCreators(modalAction, dispatch);
