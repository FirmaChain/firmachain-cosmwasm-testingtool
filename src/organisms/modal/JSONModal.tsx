import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { rootState } from '../../redux/reducers';
import { Modal } from '../../components/modal';
import { modalActions } from '../../redux/action';

import {
  JSONModalWidth,
  ModalContainer,
  ModalTitle,
  ModalContent,
  JSONWrapper,
  GeneralButton,
  ButtonWrap,
} from './styles';

const JSONModal = () => {
  const JSONModalState = useSelector((state: rootState) => state.modal.json);
  const modalData = useSelector((state: rootState) => state.modal.data);
  const { enqueueSnackbar } = useSnackbar();

  const [JSONString, setJSONString] = useState('');
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    if (JSONModalState === true) {
      try {
        const jsonData = JSON.parse(modalData.jsonData);
        setJSONString(JSON.stringify(jsonData, null, 4));
        setValid(true);
      } catch (e) {
        setJSONString('INVALID JSON');
        setValid(false);
      }
    }
  }, [JSONModalState]);

  const closeJSONModal = () => {
    modalActions.handleModalJSON(false);
  };

  return (
    <Modal visible={JSONModalState} closable={true} onClose={closeJSONModal} width={JSONModalWidth}>
      <ModalContainer>
        <ModalTitle>JSON DATA</ModalTitle>
        <ModalContent>
          <JSONWrapper>
            <pre>{JSONString}</pre>
          </JSONWrapper>
          <ButtonWrap>{isValid && <GeneralButton onClick={closeJSONModal}>Valid</GeneralButton>}</ButtonWrap>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default React.memo(JSONModal);
