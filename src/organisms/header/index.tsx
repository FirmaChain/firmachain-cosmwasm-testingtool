import React from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import { rootState } from '../../redux/reducers'
import { WalletModal, QueueTxModal, JSONModal } from '../modal'
import { modalActions } from '../../redux/action'
import { copyToClipboard } from '../../utils/common'

import { FIRMACHAIN_CONFIG } from '../../config'

import {
    HeaderTopWrapper,
    HeaderContainer,
    HeaderInner,
    HeaderWrapper,
    AddressTypo,
    NetworkWrapper,
    NetworkDot,
    NetworkTypo,
    LeftContainer,
    RightContainer,
    Logo,
    LoginIcon,
    LinkList,
    LinkItem,
    LoginButton,
    SettingButton,
    SettingIcon,
} from './styles'

const Header = () => {
    const { wallet, queueTx, json } = useSelector((state: rootState) => state.modal)
    const walletState = useSelector((state: rootState) => state.wallet)
    const { enqueueSnackbar } = useSnackbar()

    const onWallet = () => {
        modalActions.handleModalWallet(true)
    }

    const onCopyData = (data: any) => {
        copyToClipboard(data)

        enqueueSnackbar('Coppied Address', {
            variant: 'success',
            autoHideDuration: 1000,
        })
    }

    return (
        <HeaderContainer>
            <HeaderTopWrapper>
                <HeaderInner>
                    {walletState && walletState.mnemonic && (
                        <AddressTypo onClick={() => onCopyData(walletState.address)}>{walletState.address}</AddressTypo>
                    )}
                    <NetworkWrapper>
                        <NetworkDot />
                        <NetworkTypo>{FIRMACHAIN_CONFIG.chainID}</NetworkTypo>
                    </NetworkWrapper>
                </HeaderInner>
            </HeaderTopWrapper>
            <HeaderWrapper>
                <LeftContainer>
                    <Logo src='/images/firma_chain_title.svg' />
                    <LinkList>
                        <LinkItem onClick={() => window.open(import.meta.env.VITE_STATION)}>FIRMA STATION</LinkItem>
                        <LinkItem onClick={() => window.open(import.meta.env.VITE_EXPLORER)}>BLOCK EXPLORER</LinkItem>
                    </LinkList>
                </LeftContainer>
                <RightContainer>
                    {walletState && !walletState.mnemonic && (
                        <LoginButton onClick={() => onWallet()}>
                            LOGIN <LoginIcon />
                        </LoginButton>
                    )}

                    {walletState && walletState.mnemonic && (
                        <SettingButton onClick={() => onWallet()}>
                            <SettingIcon />
                        </SettingButton>
                    )}
                </RightContainer>
            </HeaderWrapper>

            {wallet && <WalletModal />}
            {queueTx && <QueueTxModal />}
            {json && <JSONModal />}
        </HeaderContainer>
    )
}

export default React.memo(Header)
