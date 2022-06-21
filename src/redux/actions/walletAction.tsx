import { HANDLE_WALLET_ADDRESS, HANDLE_WALLET_INIT, HANDLE_WALLET_LEDGER } from '../types';

export const handleWalletAddress = (address: string) => ({ type: HANDLE_WALLET_ADDRESS, address });
export const handleWalletInit = (isInit: boolean) => ({ type: HANDLE_WALLET_INIT, isInit });
export const handleWalletLedger = (isLedger: boolean) => ({ type: HANDLE_WALLET_LEDGER, isLedger });
