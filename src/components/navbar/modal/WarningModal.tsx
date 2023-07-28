import { styled } from "styled-components";
import { color } from "../../../utils/color";
import {
  ModalCancelButton,
  ModalGroupButton,
  ModalHeader,
  ModalHeaderExit,
  ModalHeaderTitle,
  ModalMessageError,
  ModalValidButton,
} from "../../layout/Layout";
import { IoExit } from "react-icons/io5";
import { Loader } from "../../loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface Props {
  setAction: Function;
}

const WarningModal = ({ setAction }: Props) => {
  const isLoad = useSelector((state: RootState) => state.store.isLoad);
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>
            Listes des articles en fin de stock
          </ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <h1>Warning Modal</h1>
        {isLoad ? (
          <ModalGroupButton>
            <ModalValidButton>
              <Loader />
            </ModalValidButton>
          </ModalGroupButton>
        ) : (
          <ModalGroupButton>
            <ModalCancelButton onClick={() => setAction(false)}>
              Quitter
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

export default WarningModal;
