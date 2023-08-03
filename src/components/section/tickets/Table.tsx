import styled from "styled-components";
import { color } from "../../../utils/color";
import { getTicketId, getTickets } from "../../../redux/features/ticket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { BiSolidPrinter, BiShow, BiGridAlt } from "react-icons/bi";
import OptionModal from "./modal/OptionModal";
import ValidateModal from "./modal/ValidateModal";
import CancelModal from "./modal/CancelModal";
import DeleteModal from "./modal/DeleteModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfExitVoucher from "../../pdf/PdfExitVoucher";
import { Loader } from "../../loader/Loader";

const Table = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [validateModal, setValidateModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.datas);

  console.log(tickets);
  useEffect(() => {
    getTickets()(dispatch);
  }, []);

  return (
    <>
      {deleteModal && <DeleteModal setAction={setDeleteModal} />}
      {validateModal && <ValidateModal setAction={setValidateModal} />}
      {cancelModal && <CancelModal setAction={setCancelModal} />}
      {open && (
        <OptionModal
          setAction={setOpen}
          setCancelModal={setCancelModal}
          setValidateModal={setValidateModal}
          setDeleteModal={setDeleteModal}
        />
      )}
      <TableContainer>
        <table>
          <TableHeader>
            <THRow>
              <THead>Nom</THead>
              <THead>Nº/ Commande</THead>
              <THead>Status</THead>
              <THead>Client</THead>
              <THead>Somme</THead>
              <THead>Ajouté le</THead>
              <THead>Action</THead>
            </THRow>
          </TableHeader>
          <TableBody>
            {tickets?.map((ticket) => (
              <TRow key={ticket.id}>
                <TData>{ticket.name}</TData>
                <TData>{ticket.purchaseOrder}</TData>
                <TData>{ticket.status}</TData>
                <TData>{ticket.Client.name}</TData>
                <TData>{ticket.sum}</TData>
                <TData>{new Date(ticket.createdAt).toLocaleDateString()}</TData>
                <TData>
                  <OptionGroup>
                    <Option
                      action="add"
                      onClick={() => getTicketId(ticket.id)(dispatch)}
                    >
                      <BiShow size={15} />
                    </Option>
                    <Option
                      action="remove"
                      onClick={() => getTicketId(ticket.id)(dispatch)}
                    >
                      <PDFDownloadLink
                        document={PdfExitVoucher(ticket)}
                        fileName="demande_pieces.pdf"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          color: "#AC6311",
                        }}
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? <Loader /> : <BiSolidPrinter size={15} />
                        }
                      </PDFDownloadLink>
                    </Option>
                    <Option
                      action="update"
                      onClick={() => {
                        getTicketId(ticket.id)(dispatch);
                        setOpen(true);
                      }}
                    >
                      <BiGridAlt size={15} />
                    </Option>
                  </OptionGroup>
                </TData>
              </TRow>
            ))}
          </TableBody>
        </table>
      </TableContainer>
    </>
  );
};

interface OptionProps {
  action: "delete" | "update" | "add" | "remove" | "cancel";
}

interface TRowProps {
  selected?: boolean;
}

const TableContainer = styled.div`
  width: 100%;

  & table {
    width: 100%;
    border-collapse: collapse;
    position: relative;
  }
`;

const TableHeader = styled.thead`
  border-bottom: 10px solid #fff;
  position: sticky;
  top: 154px;
  left: 0;
  background: #fff;
  backdrop-filter: blur(1000px);
`;
const THead = styled.th`
  font-size: 1rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-align: center;
  padding-inline: 0.4rem;
  background: #fff;
  backdrop-filter: blur(1000px);
`;
const THRow = styled.tr`
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(1000px);
  position: relative;
  appearance: none;
  z-index: 2;
`;
const TRow = styled.tr<TRowProps>`
  appearance: none;
  height: 50px;
  outline: ${({ selected }) =>
    selected === true && "2px solid " + color.selectedBorder};
  border-top: 10px solid #fff;
  border-bottom: 10px solid #fff;
  transition: linear 0.4s;
`;

const TData = styled.td`
  text-align: center;
  font-size: 0.9rem;
`;
const TableBody = styled.tbody`
  margin-top: 0.5rem;
  & tr {
    background: ${color.fadeBlue};
  }
  & tr:nth-child(even) {
    background: ${color.grey};
  }
`;

const OptionGroup = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
`;

const Option = styled.div<OptionProps>`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ action }) =>
    action === "delete"
      ? color.red
      : action === "update"
      ? color.blue
      : action === "add"
      ? color.green
      : action === "cancel"
      ? color.cancel
      : color.orange};
  color: ${({ action }) =>
    action === "delete"
      ? color.darkRed
      : action === "update"
      ? color.darkSkyBlue
      : action === "add"
      ? color.darkGreen
      : color.darkOrange};
`;
export default Table;
