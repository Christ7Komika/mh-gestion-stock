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
import { RootState } from "../../../redux/store";
import {
  TData,
  THRow,
  THead,
  TRow,
  TableBody,
  TableContainer,
  TableHeader,
} from "../../layout/table";
import { getNotifications } from "../../../redux/features/stores";
import { useEffect } from "react";

interface Props {
  setAction: Function;
}

const NotificationModal = ({ setAction }: Props) => {
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootState) => state.ticket.isLoad);
  const notifications = useSelector(
    (state: RootState) => state.store.notification
  );
  useEffect(() => {
    getNotifications()(dispatch);
  }, []);
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>Articles presque en fin de stock</ModalHeaderTitle>
          <ModalHeaderExit onClick={() => setAction(false)}>
            <IoExit />
          </ModalHeaderExit>
        </ModalHeader>
        <Table>
          <TableContainer>
            <table>
              <TableHead>
                <THRow style={{ background: "#fff" }}>
                  <THead>ID</THead>
                  <THead>Code</THead>
                  <THead>Nom</THead>
                  <THead>Désignation</THead>
                  <THead>Q/L</THead>
                  <THead>Entrepôt</THead>
                  <THead>Founisseur</THead>
                </THRow>
              </TableHead>
              <TableBody>
                {notifications?.map((notification, index) => (
                  <TRow key={notification.id}>
                    <TData>{index + 1}</TData>
                    <TData>{notification.code}</TData>
                    <TData style={{ width: 200, lineBreak: "auto" }}>
                      {notification.name}
                    </TData>
                    <TData style={{ width: 200, lineBreak: "auto" }}>
                      {notification.designation}
                    </TData>
                    <TData>
                      {notification.quantity}{" "}
                      {notification.hasLength ? "mètre(s)" : ""}{" "}
                    </TData>
                    <TData style={{ width: 200, lineBreak: "auto" }}>
                      {notification.Warehouse.name}
                    </TData>
                    <TData style={{ width: 200, lineBreak: "auto" }}>
                      {notification.Supplier.name}
                    </TData>
                  </TRow>
                ))}
              </TableBody>
            </table>
          </TableContainer>
        </Table>
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
  min-width: 1000px;
  height: 400px;
`;

const Table = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.border};
    border-radius: 5px;
  }
`;

const TableHead = styled(TableHeader)`
  top: 0;
  z-index: 2;
`;
export default NotificationModal;
