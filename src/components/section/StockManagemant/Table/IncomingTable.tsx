
import styled from "styled-components";
import {color} from "../../../../utils/color.ts";
import {useState} from "react";
import IncomingModal from "../modal/IncomingModal.tsx";

const IncomingTable = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [currentId, setCurrentId] = useState<string>("")
    return (
        <>
            {open && <IncomingModal setAction={setOpen} currentId={currentId}/>}
        <TableContainer>
            <table>
                <TableHeader>
                    <THRow>
                        <THead>Article</THead>
                        <THead>Q/L</THead>
                        <THead>Prix d'achat</THead>
                        <THead>Fournisseur</THead>
                        <THead>Date ajout</THead>
                    </THRow>
                </TableHeader>
                <TableBody>
                    <TRow onClick={()=> {
                        setCurrentId("1")
                        setOpen(true)
                    }}>
                        <TData>Lorem ipsum</TData>
                        <TData>10 mètre(s)</TData>
                        <TData>220 000 FCFA</TData>
                        <TData>TOTAL</TData>
                        <TData>25/07/2023</TData>
                    </TRow>
                </TableBody>
            </table>
        </TableContainer>
        </>
    );
};

const TableContainer = styled.div`
  width: 100%;
  background: #000;
  & table {
    width: 100%;
    border-collapse: collapse;
    position: relative;
  }
`;

const TableHeader = styled.thead`
  border-bottom: 10px solid #fff;
  position: sticky;
  top: 0;
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
  cursor: pointer;
  transition: linear 0.4s;

  &:hover {
    opacity: .9;
  }
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

export default IncomingTable