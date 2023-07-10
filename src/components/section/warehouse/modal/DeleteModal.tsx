import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalMessageError,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../input/InputText";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import { deleteWarehouse } from "../../../../redux/features/warehouse";

interface Props {
  setAction: Function;
  trueName: string;
  id: string;
}

const DeleteModal = ({ setAction, trueName, id }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.warehouse.isLoad);
  const isError = useSelector((state: RootState) => state.warehouse.isError);

  useEffect(() => {
    if (name && nameError) {
      setNameError("");
    }
  }, [name]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      return setNameError("Le champ est vide");
    }

    if (name !== trueName) {
      return setNameError("Le nom inséré est invalide");
    }

    if (name === trueName) {
      deleteWarehouse(id, (exit: boolean) => {
        if (exit) {
          return setAction(false);
        }
      })(dispatch);
      return;
    }
  };
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Retirer un entrepôt</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <p>Êtes vous sur de vouloir supprimer un entrepôt ''{trueName}''.</p>
        <p>Inserer le nom de l'entrepôt que vous voulez supprimer.</p>
        <ModalForm>
          <InputText
            name=""
            id="name"
            defaultValue={name}
            setValue={setName}
            error={nameError}
          />
        </ModalForm>
        {isError && <ModalMessageError>La requête a été</ModalMessageError>}
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
`;

export default DeleteModal;