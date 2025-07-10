import { FirmaSDK, FirmaUtil } from '@firmachain/firma-js'
import { AccessConfig, AccessType } from 'cosmjs-types/cosmwasm/wasm/v1/types'

import { FIRMACHAIN_CONFIG } from '../config'

const useFirma = () => {
    const firmaSDK = new FirmaSDK(FIRMACHAIN_CONFIG)

    const getNewWallet = async () => {
        const wallet = await firmaSDK.Wallet.newWallet()
        const mnemonic = wallet.getMnemonic()
        const address = await wallet.getAddress()

        return {
            mnemonic,
            address,
        }
    }

    const getRecoverWallet = async (mnemonic: string) => {
        const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic)
        const address = await wallet.getAddress()

        return {
            mnemonic,
            address,
        }
    }

    const getUserBalance = async (mnemonic: string) => {
        const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic)
        const address = await wallet.getAddress()
        const balance = await firmaSDK.Bank.getBalance(address)

        return FirmaUtil.getFCTStringFromUFCTStr(balance)
    }

    const cosmwasmStoreCode = async (mnemonic: string, wasmBinary: Uint8Array, accessConfigType: number, accessAddress: string) => {
        const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic)

        let accessConfig: AccessConfig = {
            permission: AccessType.UNRECOGNIZED,
            address: '', //! deprecated
            addresses: [],
        }
        if (accessConfigType === 0) {
            accessConfig.permission = AccessType.ACCESS_TYPE_EVERYBODY
            accessConfig.addresses = []
        } else if (accessConfigType === 1) {
            accessConfig.permission = AccessType.ACCESS_TYPE_ANY_OF_ADDRESSES //! ACCESS_TYPE_ONLY_ADDRESS is deprecated!
            accessConfig.addresses.push(accessAddress)
        } else {
            accessConfig.permission = AccessType.ACCESS_TYPE_EVERYBODY
            accessConfig.addresses.push(accessAddress)
        }

        const gas = 3000000
        const fee = FirmaUtil.getUFCTFromFCT(0.3)

        console.log('1')

        const result = await firmaSDK.CosmWasm.storeCode(wallet, wasmBinary, accessConfig, { gas, fee })
        console.log('2', result)

        let pointContent = { name: '', value: '' }
        if (result.code === 0) {
            const storeEvt = result.events.find((v) => v.type === 'store_code')
            const codeId = storeEvt?.attributes.find((v) => v.key === 'code_id')?.value

            pointContent = {
                name: 'Code ID',
                value: codeId?.toString() || '-1',
            }
        }

        return {
            ...result,
            pointContent,
        }
    }

    const cosmwasmInstantiateContract = async (
        mnemonic: string,
        codeId: string,
        fundFCT: string,
        label: string,
        jsonStringData: string
    ) => {
        const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic)
        const address = await wallet.getAddress()

        const gas = 3000000
        const fee = FirmaUtil.getUFCTFromFCT(0.3)

        let funds: any = []
        if (fundFCT !== '') {
            funds = [{ denom: 'ufct', amount: FirmaUtil.getUFCTStringFromFCTStr(fundFCT) }]
        }

        let data = '{}'
        if (jsonStringData !== '') {
            data = jsonStringData
        }

        let result = await firmaSDK.CosmWasm.instantiateContract(wallet, address, codeId, label, data, funds, {
            gas: gas,
            fee: fee,
        })

        let pointContent = { name: '', value: '' }
        if (result.code === 0) {
            const instantiateEvt = result.events.find((v) => v.type === 'instantiate')
            const contractAddress = instantiateEvt?.attributes.find((v) => v.key === '_contract_address')?.value

            pointContent = {
                name: 'Contract Address',
                value: contractAddress || '',
            }
        }

        return {
            ...result,
            pointContent,
        }
    }

    const cosmwasmExecuteContract = async (mnemonic: string, contractAddress: string, fundFCT: string, jsonStringData: string) => {
        const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic)

        const gas = 3000000
        const fee = FirmaUtil.getUFCTFromFCT(0.3)

        let funds: any = []
        if (fundFCT !== '') {
            funds = [{ denom: 'ufct', amount: FirmaUtil.getUFCTStringFromFCTStr(fundFCT) }]
        }

        let data = '{}'
        if (jsonStringData !== '') {
            data = jsonStringData
        }

        let result = await firmaSDK.CosmWasm.executeContract(wallet, contractAddress, data, funds, {
            gas: gas,
            fee: fee,
        })

        let pointContent = { name: '', value: '' }

        return {
            ...result,
            pointContent,
        }
    }

    const cosmwasmMigrateContract = async (mnemonic: string, contractAddress: string, codeId: string, jsonStringData: string) => {
        const wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic)

        const gas = 3000000
        const fee = FirmaUtil.getUFCTFromFCT(0.3)

        let data = '{}'
        if (jsonStringData !== '') {
            data = jsonStringData
        }

        let result = await firmaSDK.CosmWasm.migrateContract(wallet, contractAddress, codeId, data, {
            gas: gas,
            fee: fee,
        })

        let pointContent = { name: '', value: '' }

        return {
            ...result,
            pointContent,
        }
    }

    const cosmwasmGetCodeList = async () => {
        let result = await firmaSDK.CosmWasm.getCodeList()

        return {
            result,
        }
    }

    const cosmwasmGetCodeData = async (codeId: string) => {
        let result = await firmaSDK.CosmWasm.getCodeData(codeId)

        result.data = 'WASM BINARY DATA ...'

        return {
            result,
        }
    }

    const cosmwasmGetContractListFromCodeId = async (codeId: string) => {
        let result = await firmaSDK.CosmWasm.getContractListFromCodeId(codeId)

        return {
            result,
        }
    }

    const cosmwasmGetPinnedCodeList = async () => {
        let result = await firmaSDK.CosmWasm.getPinnedCodeList()

        return {
            result,
        }
    }

    const cosmwasmGetContractInfo = async (contractAddress: string) => {
        let result = await firmaSDK.CosmWasm.getContractInfo(contractAddress)

        return {
            result,
        }
    }

    const cosmwasmGetContractHistory = async (contractAddress: string) => {
        let result = await firmaSDK.CosmWasm.getContractHistory(contractAddress)

        return {
            result,
        }
    }

    const cosmwasmGetContractState = async (contractAddress: string) => {
        let result = await firmaSDK.CosmWasm.getContractState(contractAddress)

        return {
            result,
        }
    }

    const cosmwasmGetContractRawQueryData = async (contractAddress: string, hexString: string) => {
        let result = await firmaSDK.CosmWasm.getContractRawQueryData(contractAddress, hexString)

        return {
            result,
        }
    }

    const cosmwasmGetContractSmartQueryData = async (contractAddress: string, jsonStringData: string) => {
        let data = '{}'
        if (jsonStringData !== '') {
            data = jsonStringData
        }

        let result = await firmaSDK.CosmWasm.getContractSmartQueryData(contractAddress, data)

        return {
            result,
        }
    }

    const isValidAddress = (address: string) => {
        return FirmaUtil.isValidAddress(address)
    }

    return {
        getNewWallet,
        getRecoverWallet,
        getUserBalance,
        isValidAddress,
        cosmwasmStoreCode,
        cosmwasmInstantiateContract,
        cosmwasmExecuteContract,
        cosmwasmMigrateContract,
        cosmwasmGetCodeList,
        cosmwasmGetCodeData,
        cosmwasmGetContractListFromCodeId,
        cosmwasmGetPinnedCodeList,
        cosmwasmGetContractInfo,
        cosmwasmGetContractHistory,
        cosmwasmGetContractState,
        cosmwasmGetContractRawQueryData,
        cosmwasmGetContractSmartQueryData,
    }
}

export default useFirma
