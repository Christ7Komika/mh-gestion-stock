import { styled } from "styled-components";
import {
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import { color } from "../../../../utils/color";
import { TiDelete } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";
import { GrValidate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getTicket } from "../../../../redux/features/ticket";
import { useEffect } from "react";
interface Props {
  setAction: Function;
  setCancelModal: Function;
  setValidateModal: Function;
  setDeleteModal: Function;
}

const OptionModal = ({
  setAction,
  setCancelModal,
  setValidateModal,
  setDeleteModal,
}: Props) => {
  const id = useSelector((state: RootState) => state.ticket.currentId);
  const ticket = useSelector((state: RootState) => state.ticket.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getTicket(id)(dispatch);
    }
  }, [id]);

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Option</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        {ticket?.status === "En cour" ? (
          <GridContainer>
            <CardContainer
              bg="add"
              onClick={() => {
                setValidateModal(true);
                setAction(false);
              }}
            >
              <CardText>Valider le bon de sortie</CardText>
              <GrValidate size={30} />
            </CardContainer>
            <CardContainer
              bg="withdraw"
              onClick={() => {
                setCancelModal(true);
                setAction(false);
              }}
            >
              <CardText>Annuler le bon de sortie</CardText>
              <TiCancel size={30} />
            </CardContainer>

            <CardContainer
              bg="delete"
              onClick={() => {
                setDeleteModal(true);
                setAction(false);
              }}
            >
              <CardText>Supprimer</CardText>
              <TiDelete size={30} />
            </CardContainer>
          </GridContainer>
        ) : (
          <CardContainer
            bg="delete"
            onClick={() => {
              setDeleteModal(true);
              setAction(false);
            }}
          >
            <CardText>Supprimer</CardText>
            <TiDelete size={30} />
          </CardContainer>
        )}
      </Modal>
    </ModalContainer>
  );
};

interface Color {
  bg:
    | "add"
    | "withdraw"
    | "update"
    | "transaction"
    | "change-stock"
    | "change-supplier"
    | "change-category"
    | "move-stock"
    | "delete";
}

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
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  gap: 1rem;
`;

const CardContainer = styled.div<Color>`
  width: 100%;
  height: 80px;
  border-radius: 5px;
  border: 1px solid ${color.darkBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  align-items: center;
  cursor: pointer;
  transition: linear 0.3s;

  &:hover {
    box-shadow: 0.5px 1px 3px rgba(0, 0, 0, 0.3);
    background-color: ${({ bg }) =>
      bg === "add"
        ? color.lightGreen
        : bg === "withdraw"
        ? color.lightOrange
        : bg === "update"
        ? color.lightBlue
        : bg === "transaction"
        ? color.lightSkyBlue
        : bg === "delete"
        ? color.lightRed
        : bg === "change-stock"
        ? "#A1C2F1"
        : bg === "change-category"
        ? "#FFE7CE"
        : bg === "change-supplier"
        ? "#F7FFE5"
        : bg === "move-stock"
        ? "#D2E9E9"
        : null};
  }
`;

const CardText = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
`;

export default OptionModal;
