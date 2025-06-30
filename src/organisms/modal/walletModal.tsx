import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import { rootState } from '../../redux/reducers'
import { Modal } from '../../components/modal'
import { modalActions, walletActions } from '../../redux/action'
import { copyToClipboard } from '../../utils/common'
import useFirma from '../../utils/wallet'

import {
    WalletModalWidth,
    ModalTitle,
    SubTitle,
    ModalContents,
    MenuListWrap,
    MenuItemWrap,
    MenuTitleTypo,
    MenuIconImg,
    NewWalletIcon,
    RecoverMnemonicIcon,
    WalletTabList,
    WalletTabItem,
    NewWalletWrap,
    InputWrap,
    Label,
    Input,
    TextBox,
    TextAreaBox,
    CopyIconImg,
    ButtonWrap,
    GeneralButton,
    DisableButton,
} from './styles'

const WalletModal = () => {
    const walletModalState = useSelector((state: rootState) => state.modal.wallet)
    const walletState = useSelector((state: rootState) => state.wallet)
    const { enqueueSnackbar } = useSnackbar()
    const { getNewWallet, getRecoverWallet, getUserBalance } = useFirma()
    const [currentWalletTab, setWalletTab] = useState(0)
    const [balance, setBalance] = useState('0')
    const [recoverMnemonic, setRecoverMnemonic] = useState('')
    const [walletData, setWalletData] = useState({ mnemonic: '', address: '' })

    useEffect(() => {
        if (walletModalState && walletState.mnemonic) {
            setWalletTab(3)

            getUserBalance(walletState.mnemonic)
                .then((balance) => {
                    setBalance(balance)
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }, [walletModalState]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (currentWalletTab === 3) {
            if (walletState.mnemonic === '' || walletState.mnemonic === undefined) {
                setWalletTab(0)
            }
        }
    }, [currentWalletTab]) // eslint-disable-line react-hooks/exhaustive-deps

    const menuList = [
        {
            name: 'New\nWallet',
            icon: NewWalletIcon,
            modalAction: () => {
                getNewWallet().then((result) => {
                    setWalletData(result)
                    setWalletTab(1)
                })
            },
        },
        {
            name: 'Recover from Mnemonic',
            icon: RecoverMnemonicIcon,
            modalAction: () => {
                setWalletTab(2)
            },
        },
    ]

    const closeWalletModal = () => {
        modalActions.handleModalWallet(false)
    }

    const openSubModal = (nextModalAction: () => void) => {
        nextModalAction()
    }

    const onCopyData = (data: any) => {
        copyToClipboard(data)

        enqueueSnackbar('Coppied', {
            variant: 'success',
            autoHideDuration: 1000,
        })
    }

    const onGenerateWallet = () => {
        getNewWallet()
            .then((result) => {
                setWalletData(result)
            })
            .catch((e) => {
                enqueueSnackbar(e.toString(), {
                    variant: 'error',
                    autoHideDuration: 2000,
                })
            })
    }

    const onRecover = (mnemonic: string) => {
        getRecoverWallet(mnemonic)
            .then((result) => {
                onConnect(result.mnemonic, result.address)
            })
            .catch((e) => {
                enqueueSnackbar(e.toString(), {
                    variant: 'error',
                    autoHideDuration: 2000,
                })
            })
    }

    const onConnect = (mnemonic: string, address: string) => {
        walletActions.handleWalletData(address, mnemonic, '')
        setWalletTab(3)

        getUserBalance(mnemonic)
            .then((balance) => {
                setBalance(balance)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const onDisconnect = () => {
        walletActions.handleWalletData('', '', '')
        walletActions.handleWalletBalance('')

        setWalletTab(0)
        closeWalletModal()
    }

    const onChangeMnemonic = (event: any) => {
        setRecoverMnemonic(event.target.value)
    }

    return (
        <Modal visible={walletModalState} closable={true} onClose={closeWalletModal} width={WalletModalWidth} maskClosable={true}>
            <ModalTitle>WALLET</ModalTitle>
            <ModalContents>
                <WalletTabList currentTab={currentWalletTab}>
                    <WalletTabItem>
                        <MenuListWrap>
                            {menuList.map((menu, index) => {
                                return (
                                    <MenuItemWrap
                                        key={index}
                                        onClick={() => {
                                            openSubModal(menu.modalAction)
                                        }}
                                    >
                                        <MenuIconImg>
                                            <menu.icon />
                                        </MenuIconImg>
                                        <MenuTitleTypo>{menu.name}</MenuTitleTypo>
                                    </MenuItemWrap>
                                )
                            })}
                        </MenuListWrap>
                    </WalletTabItem>
                    <WalletTabItem>
                        <SubTitle>New Wallet</SubTitle>
                        <NewWalletWrap>
                            <InputWrap>
                                <Label>Mnemonic</Label>
                                <CopyIconImg left='75px' onClick={() => onCopyData(walletData.mnemonic)} />
                                <Input>
                                    <TextBox onClick={() => onCopyData(walletData.mnemonic)}>{walletData.mnemonic}</TextBox>
                                </Input>
                            </InputWrap>

                            <InputWrap>
                                <Label>Address</Label>
                                <CopyIconImg left='56px' onClick={() => onCopyData(walletData.address)} />
                                <Input>
                                    <TextBox onClick={() => onCopyData(walletData.address)}>{walletData.address}</TextBox>
                                </Input>
                            </InputWrap>
                            <ButtonWrap>
                                <GeneralButton onClick={() => onGenerateWallet()}>Generate</GeneralButton>
                                <GeneralButton onClick={() => onConnect(walletData.mnemonic, walletData.address)}>Connect</GeneralButton>
                            </ButtonWrap>
                        </NewWalletWrap>
                    </WalletTabItem>
                    <WalletTabItem>
                        <SubTitle>Recover Wallet</SubTitle>
                        <NewWalletWrap>
                            <InputWrap>
                                <Label>Mnemonic</Label>
                                <Input>
                                    <TextAreaBox value={recoverMnemonic} onChange={onChangeMnemonic} />
                                </Input>
                            </InputWrap>

                            <ButtonWrap>
                                <GeneralButton onClick={() => onRecover(recoverMnemonic)}>Connect</GeneralButton>
                            </ButtonWrap>
                        </NewWalletWrap>
                    </WalletTabItem>
                    <WalletTabItem>
                        <NewWalletWrap>
                            <InputWrap>
                                <Label>Mnemonic</Label>
                                <CopyIconImg left='75px' onClick={() => onCopyData(walletState.mnemonic)} />
                                <Input>
                                    <TextBox onClick={() => onCopyData(walletState.mnemonic)}>{walletState.mnemonic}</TextBox>
                                </Input>
                            </InputWrap>

                            <InputWrap>
                                <Label>Address</Label>
                                <CopyIconImg left='56px' onClick={() => onCopyData(walletState.address)} />
                                <Input>
                                    <TextBox onClick={() => onCopyData(walletState.address)}>{walletState.address}</TextBox>
                                </Input>
                            </InputWrap>

                            <InputWrap>
                                <Label>FCT Balance</Label>
                                <Input>
                                    <TextBox>{balance}</TextBox>
                                </Input>
                            </InputWrap>
                            <ButtonWrap>
                                <GeneralButton onClick={() => window.open(import.meta.env.VITE_FAUCET)}>Faucet</GeneralButton>
                                <DisableButton onClick={() => onDisconnect()}>Disconnect</DisableButton>
                            </ButtonWrap>
                        </NewWalletWrap>
                    </WalletTabItem>
                </WalletTabList>
            </ModalContents>
        </Modal>
    )
}

export default React.memo(WalletModal)
