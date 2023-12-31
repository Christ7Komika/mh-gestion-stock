import { styled } from "styled-components";
import {
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import { color } from "../../../../utils/color";
import { RiAddLine } from "react-icons/ri";
import { HiMinusSm } from "react-icons/hi";
import { LuEdit3 } from "react-icons/lu";
import { TiDelete } from "react-icons/ti";
import { GrTransaction } from "react-icons/gr";
import { TbCategory2, TbCubeSend } from "react-icons/tb";
import { CgMoveTask } from "react-icons/cg";

interface Props {
  setAction: Function;
  setAddModal: Function;
  setWithdrawModal: Function;
  setUpdateModal: Function;
  setChangeStoreModal: Function;
  setChangeSupplier: Function;
  setChangeCategory: Function;
  setMoveStock: Function;
  setDeleteModal: Function;
}

const OptionModal = ({
  setAction,
  setAddModal,
  setWithdrawModal,
  setChangeStoreModal,
  setDeleteModal,
  setUpdateModal,
  setChangeCategory,
  setChangeSupplier,
  setMoveStock,
}: Props) => {
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Option</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <GridContainer>
          <CardContainer
            bg="add"
            onClick={() => {
              setAddModal(true);
              setAction(false);
            }}
          >
            <CardText>Ajouter</CardText>
            <RiAddLine size={30} />
          </CardContainer>
          <CardContainer
            bg="withdraw"
            onClick={() => {
              setWithdrawModal(true);
              setAction(false);
            }}
          >
            <CardText>Retirer</CardText>
            <HiMinusSm size={30} />
          </CardContainer>
          <CardContainer
            bg="update"
            onClick={() => {
              setUpdateModal(true);
              setAction(false);
            }}
          >
            <CardText>Mettre à jour</CardText>
            <LuEdit3 size={30} />
          </CardContainer>
          <CardContainer
            bg="transaction"
            onClick={() => {
              setChangeStoreModal(true);
              setAction(false);
            }}
          >
            <CardText>Changer d'entrepôt</CardText>
            <GrTransaction size={30} />
          </CardContainer>
          <CardContainer
            bg="change-category"
            onClick={() => {
              setChangeCategory(true);
              setAction(false);
            }}
          >
            <CardText>Modifier la catégorie</CardText>
            <TbCategory2 size={30} />
          </CardContainer>
          <CardContainer
            bg="change-supplier"
            onClick={() => {
              setChangeSupplier(true);
              setAction(false);
            }}
          >
            <CardText>Modifier le fournisseur</CardText>
            <TbCubeSend size={30} />
          </CardContainer>
          <CardContainer
            bg="move-stock"
            onClick={() => {
              setMoveStock(true);
              setAction(false);
            }}
          >
            <CardText>Déplacer le stock</CardText>
            <CgMoveTask size={30} />
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
