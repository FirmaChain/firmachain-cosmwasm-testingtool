import { HANDLE_WALLET_DATA, HANDLE_WALLET_BALANCE } from '../types';

export const handleWalletData = (address: string, mnemonic: string, privateKey: string) => ({
  type: HANDLE_WALLET_DATA,
  address,
  mnemonic,
  privateKey,
});

export const handleWalletBalance = (balance: string) => ({
  type: HANDLE_WALLET_BALANCE,
  balance,
});
