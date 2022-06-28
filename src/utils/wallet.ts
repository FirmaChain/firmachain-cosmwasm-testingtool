import { FirmaSDK, FirmaUtil } from '@firmachain/firma-js';
import { AccessConfig, AccessType } from 'cosmjs-types/cosmwasm/wasm/v1/types';

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

    return FirmaUtil.getFCTStringFromUFCTStr(balance);
  };

  const cosmwasmStoreCode = async (
    mnemonic: string,
    wasmBinary: Uint8Array,
    accessConfigType: number,
    accessAddress: string
  ) => {
    const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic);

    let accessConfig: AccessConfig = { permission: AccessType.UNRECOGNIZED, address: '' };
    if (accessConfigType === 0) {
      accessConfig.permission = AccessType.ACCESS_TYPE_EVERYBODY;
      accessConfig.address = '';
    } else if (accessConfigType === 1) {
      accessConfig.permission = AccessType.ACCESS_TYPE_ONLY_ADDRESS;
      accessConfig.address = accessAddress;
    } else {
      accessConfig.permission = AccessType.ACCESS_TYPE_EVERYBODY;
      accessConfig.address = '';
    }

    const gas = 3000000;
    const fee = FirmaUtil.getUFCTFromFCT(0.3);

    let result = await firmaSDK.CosmWasm.storeCode(wallet, wasmBinary, accessConfig, { gas, fee });

    let pointContent = { name: '', value: '' };
    if (result.code === 0) {
      let rawJSONData = JSON.parse(result.rawLog!);
      pointContent = {
        name: 'Code ID',
        value: rawJSONData[0]['events'][1]['attributes'][0]['value'],
      };
    }

    return {
      ...result,
      pointContent,
    };
  };

  const cosmwasmInstantiateContract = async (
    mnemonic: string,
    codeId: string,
    fundFCT: string,
    label: string,
    jsonStringData: string
  ) => {
    const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic);
    const address = await wallet.getAddress();

    const gas = 3000000;
    const fee = FirmaUtil.getUFCTFromFCT(0.3);

    let funds: any = [];
    if (fundFCT !== '') {
      funds = [{ denom: 'ufct', amount: FirmaUtil.getUFCTStringFromFCTStr(fundFCT) }];
    }

    let data = '{}';
    if (jsonStringData !== '') {
      data = jsonStringData;
    }

    let result = await firmaSDK.CosmWasm.instantiateContract(wallet, address, codeId, label, data, funds, {
      gas: gas,
      fee: fee,
    });

    let pointContent = { name: '', value: '' };
    if (result.code === 0) {
      let rawJSONData = JSON.parse(result.rawLog!);
      pointContent = {
        name: 'Contract Address',
        value: rawJSONData[0]['events'][0]['attributes'][0]['value'],
      };
    }

    return {
      ...result,
      pointContent,
    };
  };

  const cosmwasmExecuteContract = async (
    mnemonic: string,
    contractAddress: string,
    fundFCT: string,
    jsonStringData: string
  ) => {
    const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic);

    const gas = 3000000;
    const fee = FirmaUtil.getUFCTFromFCT(0.3);

    let funds: any = [];
    if (fundFCT !== '') {
      funds = [{ denom: 'ufct', amount: FirmaUtil.getUFCTStringFromFCTStr(fundFCT) }];
    }

    let data = '{}';
    if (jsonStringData !== '') {
      data = jsonStringData;
    }

    let result = await firmaSDK.CosmWasm.executeContract(wallet, contractAddress, data, funds, {
      gas: gas,
      fee: fee,
    });

    let pointContent = { name: '', value: '' };

    return {
      ...result,
      pointContent,
    };
  };

  const cosmwasmMigrateContract = async (
    mnemonic: string,
    contractAddress: string,
    codeId: string,
    jsonStringData: string
  ) => {
    const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic);

    const gas = 3000000;
    const fee = FirmaUtil.getUFCTFromFCT(0.3);

    let data = '{}';
    if (jsonStringData !== '') {
      data = jsonStringData;
    }

    let result = await firmaSDK.CosmWasm.migrateContract(wallet, contractAddress, codeId, data, {
      gas: gas,
      fee: fee,
    });

    let pointContent = { name: '', value: '' };

    return {
      ...result,
      pointContent,
    };
  };

  const isValidAddress = (address: string) => {
    return FirmaUtil.isValidAddress(address);
  };

  return {
    getNewWallet,
    getRecoverWallet,
    getUserBalance,
    isValidAddress,
    cosmwasmStoreCode,
    cosmwasmInstantiateContract,
    cosmwasmExecuteContract,
    cosmwasmMigrateContract,
  };
};

export default useFirma;
