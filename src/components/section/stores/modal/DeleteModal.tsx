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
import { RootState } from "../../../../redux/store";
import { Loader } from "../../../loader/Loader";
import {
  getStore,
  deleteStore,
  getHistory,
} from "../../../../redux/features/stores.ts";
import bcrypt from "bcryptjs";

interface Props {
  setAction: Function;
}

const DeleteModal = ({ setAction }: Props) => {
  const [password, setPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const pwd = useSelector((state: RootState) => state.configuration.data);

  const isLoad = useSelector((state: RootState) => state.store.isLoad);
  const store = useSelector((state: RootState) => state.store.data);
  const currentId = useSelector((state: RootState) => state.store.currentId);

  useEffect(() => {
    if (currentId) {
      getStore(currentId)(dispatch);
    }
  }, [currentId]);

  useEffect(() => {
    if (password && passwordError) {
      setPasswordError("");
    }
  }, [password]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!password) {
      return setPasswordError("Veuillez inserer le mot de passe.");
    }

    if (pwd) {
      const isValid = bcrypt.compareSync(password, pwd.password);
      if (isValid && store) {
        deleteStore(store?.id, (exit: boolean) => {
          if (exit) {
            getHistory()(dispatch);
            return setAction(false);
          }
        })(dispatch);

        return;
      }
      return setPasswordError("Mot de passe inserer invalide.");
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
        <p>Inserer le mot de passe.</p>
        <ModalForm>
          <InputText
            type="password"
            name=""
            id="password"
            defaultValue={password}
            setValue={setPassword}
            error={passwordError}
          />
        </ModalForm>
        {isLoad ? (
          <ModalGroupButton>
            <ModalValidButton>
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
