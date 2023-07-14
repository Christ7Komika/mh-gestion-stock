import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import {
  ModalCancelButton,
  ModalForm,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalValidButton,
} from "../../../layout/Layout";
import { IoExit } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../input/InputText";
// import {  getHistory } from "../../../../redux/features/client";
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import {getStore, deleteStore} from "../../../../redux/features/stores.ts";

interface Props {
  setAction: Function;
}

const DeleteModal = ({ setAction }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const isLoad = useSelector((state: RootState) => state.store.isLoad);
  const store = useSelector((state:RootState) => state.store.data)
  const currentId = useSelector((state: RootState) => state.store.currentId)

  useEffect(()=> {
    if(currentId) {
      getStore(currentId)(dispatch)
    }
  }, [currentId])

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

    if (name !== store.name) {
      return setNameError("Le nom inséré est invalide");
    }

    if (name === store.name) {
      deleteStore(store.id, (exit: boolean) => {
        if (exit) {
          // getHistory()(dispatch);
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
          <ModalHeaderTitle>Suppression article</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <p>Êtes vous sur de vouloir supprimer l'article ''{store?.name}''.</p>
        <p>Inserer le nom de l'article que vous souhaitez supprimer.</p>
        <ModalForm>
          <InputText
            name=""
            id="name"
            defaultValue={name}
            setValue={setName}
            error={nameError}
          />
        </ModalForm>
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
