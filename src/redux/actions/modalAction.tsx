import { HANDLE_MODAL_RESET, HANDLE_MODAL_DATA, HANDLE_MODAL_WALLET } from '../types';

export const handleModalReset = () => ({ type: HANDLE_MODAL_RESET });
export const handleModalData = (data: any) => ({ type: HANDLE_MODAL_DATA, data });
export const handleModalWallet = (isVisible: boolean) => ({ type: HANDLE_MODAL_WALLET, isVisible });
