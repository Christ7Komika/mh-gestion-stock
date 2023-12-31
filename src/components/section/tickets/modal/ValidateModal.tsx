import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import { useEffect } from "react";
import {
  getHistory,
  getTicket,
  getTicketId,
  validateTicket,
} from "../../../../redux/features/ticket";
import {
  getNotifications,
  getWarning,
} from "../../../../redux/features/stores";

interface Props {
  setAction: Function;
}

const ValidateModal = ({ setAction }: Props) => {
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.ticket.isLoad);
  const id = useSelector((state: RootState) => state.ticket.currentId);
  const ticket = useSelector((state: RootState) => state.ticket.data);

  useEffect(() => {
    if (id) {
      getTicket(id)(dispatch);
    }
  }, [id]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (id) {
      validateTicket(id, (exit: boolean) => {
        if (exit) {
          getWarning()(dispatch);
          getNotifications()(dispatch);
          getHistory()(dispatch);
          setAction(false);
        }
      })(dispatch);
    }
  };
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Validation du bon de sortis</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <p>
          Veuillez confirmer la validation du bon de sortie ''{ticket?.name}''
          pour le bon de commande nº{ticket?.purchaseOrder}.
        </p>
        {isLoad ? (
          <ModalGroupButton>
            <ModalValidButton onClick={(e: React.SyntheticEvent) => submit(e)}>
              <Loader />
            </ModalValidButton>
          </ModalGroupButton>
        ) : (
          <ModalGroupButton>
            <ModalValidButton onClick={(e: React.SyntheticEvent) => submit(e)}>
              Valider
            </ModalValidButton>
            <ModalCancelButton onClick={() => setAction(false)}>
              Annuler
            </ModalCancelButton>
          </ModalGroupButton>
        )}
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff3e;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  border: 1px solid ${color.darkBlue};
  border-radius: 5px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  max-width: 600px;
`;

export default ValidateModal;
