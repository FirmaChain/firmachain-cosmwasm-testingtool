import { bindActionCreators } from 'redux';

import * as walletAction from './actions/walletAction';

import store from './store';

const { dispatch } = store;

export const walletActions = bindActionCreators(walletAction, dispatch);
