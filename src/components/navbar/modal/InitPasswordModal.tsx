import { styled } from "styled-components";
import { color } from "../../../utils/color";
import {
  ModalCancelButton,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalValidButton,
} from "../../layout/Layout";
import { IoExit } from "react-icons/io5";
import { Loader } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getPass, initPass } from "../../../redux/features/configuration";
import { RootState } from "../../../redux/store";
interface Props {
  setAction: Function;
}

const InitPasswordModal = ({ setAction }: Props) => {
  const isLoad = useSelector((state: RootState) => state.configuration.isLoad);
  const dispatch = useDispatch();
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    initPass((exit: boolean) => {
      if (exit) {
        getPass()(dispatch);
        setAction(false);
      }
    })(dispatch);
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Initialisation du mot de passe</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <p>Voulez vous initialiser le mot de passe</p>
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

export default InitPasswordModal;
