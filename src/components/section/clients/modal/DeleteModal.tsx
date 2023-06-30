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
import { deleteClient } from "../../../../redux/features/client";
import { RootState } from "../../../../redux/store";

interface Props {
  setAction: Function;
  trueName: string;
  id: string;
}

const DeleteModal = ({ setAction, trueName, id }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.client.isLoad);
  const isError = useSelector((state: RootState) => state.client.isError);

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
      deleteClient(id, (exit: boolean) => {
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
          <ModalHeaderTitle>Retirer un client</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <p>Êtes vous sur de vouloir supprimer le client ''{trueName}''.</p>
        <p>Inserer le nom du client que vous voulez supprimer.</p>
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
            <ModalValidButton onClick={(e) => submit(e)}>
              Validation en cour...
            </ModalValidButton>
          </ModalGroupButton>
        ) : (
          <ModalGroupButton>
            <ModalValidButton onClick={(e) => submit(e)}>
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
