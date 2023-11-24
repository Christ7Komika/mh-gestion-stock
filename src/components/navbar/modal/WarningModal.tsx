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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { getWarning } from "../../../redux/features/stores";
import { useEffect } from "react";
import {
  TableContainer,
  TableHeader,
  THRow,
  TRow,
  THead,
  TableBody,
  TData,
} from "../../layout/table";

interface Props {
  setAction: Function;
}

const WarningModal = ({ setAction }: Props) => {
  const isLoad = useSelector((state: RootState) => state.store.isLoad);
  const dispatch = useDispatch();
  const warnings = useSelector((state: RootState) => state.store.warning);
  useEffect(() => {
    getWarning()(dispatch);
  }, []);

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
        <Table>
          <TableContainer>
            <table>
              <TableHead style={{ background: "#fff" }}>
                <THRow>
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
                {warnings?.map((warning, index) => (
                  <TRow key={warning.id}>
                    <TData>{index + 1}</TData>
                    <TData>{warning.code}</TData>
                    <TData style={{ width: 200, lineBreak: "auto" }}>
                      {warning.name}
                    </TData>
                    <TData style={{ width: 200, lineBreak: "auto" }}>
                      {warning.designation}
                    </TData>
                    <TData>
                      {warning.quantity} {warning.hasLength ? "mètre(s)" : ""}{" "}
                    </TData>
                    <TData style={{ width: 200, lineBreak: "auto" }}>
                      {warning.Warehouse.name}
                    </TData>
                    <TData style={{ width: 200, lineBreak: "auto" }}>
                      {warning.Supplier.name}
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
  padding: 2rem;
`;

const Modal = styled.div`
  border: 1px solid ${color.darkBlue};
  border-radius: 5px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  height: 600px;
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

export default WarningModal;
