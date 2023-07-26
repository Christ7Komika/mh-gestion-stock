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
import bcrypt from "bcryptjs";
import { deleteTicket, getTicket } from "../../../../redux/features/ticket";

interface Props {
  setAction: Function;
}

const DeleteModal = ({ setAction }: Props) => {
  const [pass, setPass] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.ticket.isLoad);
  const id = useSelector((state: RootState) => state.ticket.currentId);
  const pwd = useSelector((state: RootState) => state.configuration.data);
  const ticket = useSelector((state: RootState) => state.ticket.data);

  useEffect(() => {
    if (id) {
      getTicket(id)(dispatch);
    }
  }, [id]);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (pwd && id && pass) {
      const isValid = bcrypt.compareSync(pass, pwd.password);
      if (isValid) {
        deleteTicket(id, (exit: boolean) => {
          setAction(false);
        })(dispatch);
        return;
      } else {
        setPassError("Le mot de passe est incorrect");
      }
    }
  };
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Suppression du ticket</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <p>
          Veuillez confirmer l'annulation du bon de sortie ''{ticket?.name}''
          pour le bon de commande nº{ticket?.purchaseOrder}.
        </p>
        <ModalForm>
          <InputText name="" id="pass" setValue={setPass} error={""} />
        </ModalForm>
        {passError && <ModalMessageError>{passError}</ModalMessageError>}
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
  max-width: 500px;
`;

export default DeleteModal;
