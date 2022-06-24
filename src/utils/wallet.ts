import { FirmaSDK } from '@firmachain/firma-js';
import { FIRMACHAIN_CONFIG } from '../config';

const useFirma = () => {
  const firmaSDK = new FirmaSDK(FIRMACHAIN_CONFIG);

  const getNewWallet = async () => {
    const wallet = await firmaSDK.Wallet.newWallet();
    const mnemonic = wallet.getMnemonic();
    const address = await wallet.getAddress();

    return {
      mnemonic,
      address,
    };
  };

  const getRecoverWallet = async (mnemonic: string) => {
    const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic);
    const address = await wallet.getAddress();

    return {
      mnemonic,
      address,
    };
  };

  const getUserBalance = async (mnemonic: string) => {
    const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic);
    const address = await wallet.getAddress();
    const balance = await firmaSDK.Bank.getBalance(address);

    return {
      balance,
    };
  };

  return {
    getNewWallet,
    getRecoverWallet,
    getUserBalance,
  };
};

export default useFirma;
