import { styled } from "styled-components";
import { color } from "../../../utils/color";
import {
  ModalCancelButton,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalValidButton,
  ModalForm,
  ModalMessageError,
} from "../../layout/Layout";
import InputText from "../../input/InputText";
import { IoExit } from "react-icons/io5";
import { Loader } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { changePass, getPass } from "../../../redux/features/configuration";

interface Props {
  setAction: Function;
}

const ChangePasswordModal = ({ setAction }: Props) => {
  const [newPass, setNewPass] = useState<string>("");
  const [newPassError, setNewPassError] = useState<string>("");
  const [oldPass, setOldPass] = useState<string>("");
  const [oldPassError, setOldPassError] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.configuration.isLoad);
  const pwd = useSelector((state: RootState) => state.configuration.data);

  useEffect(() => {
    if (oldPassError && oldPass) {
      setOldPassError("");
    }
  }, [oldPass, error]);
  useEffect(() => {
    if (newPassError && newPass) {
      setNewPassError("");
    }
  }, [newPass, newPassError]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!newPass) {
      return setNewPassError("Entrer le nouveau mot de passe");
    }

    if (!oldPass) {
      return setOldPassError("Entrer le nouveau mot de passe");
    }

    if (pwd) {
      const isValid = bcrypt.compareSync(oldPass, pwd.password);
      if (isValid) {
        changePass(newPass, (exit: Boolean) => {
          if (exit) {
            getPass()(dispatch);
            setAction(false);
          }
        })(dispatch);
        return;
      }
      return setError("Mot de passe inserer invalide.");
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Changer de mot de passe</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <ModalForm>
          <InputText
            // type="password"
            name="Nouveau mot de passe"
            id="newpass"
            defaultValue={newPass}
            setValue={setNewPass}
            error={newPassError}
          />
          <InputText
            // type="password"
            name="Ancien mot de passe"
            id="oldpass"
            defaultValue={oldPass}
            setValue={setOldPass}
            error={oldPassError}
          />
        </ModalForm>
        {error && <ModalMessageError>{error}</ModalMessageError>}
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
  max-width: 500px;
`;

export default ChangePasswordModal;
