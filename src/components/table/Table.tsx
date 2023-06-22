import styled from "styled-components";
import { color } from "../../utils/color";
import { IoAdd, IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const Table = () => {
  return (
    <TableContainer>
      <table>
        <TableHeader>
          <THRow>
            <THead>ID</THead>
            <THead>Nom</THead>
            <THead>Référence</THead>
            <THead>Téléphone</THead>
            <THead>Email</THead>
            <THead>Ajouté le</THead>
            <THead>Action</THead>
          </THRow>
        </TableHeader>
        <TableBody>
          <TRow>
            <TData>1</TData>
            <TData>Christ Komika</TData>
            <TData>WB56DED</TData>
            <TData>+242 05 564 32 95</TData>
            <TData>christkomika7@gmail.com</TData>
            <TData>21/06/2023</TData>
            <TData>
              <OptionGroup>
                <Option action="add">
                  <IoAdd size={15} />
                </Option>

                <Option action="update">
                  <IoCreate size={15} />
                </Option>

                <Option action="delete">
                  <MdDelete size={15} />
                </Option>
              </OptionGroup>
            </TData>
          </TRow>
        </TableBody>
      </table>
    </TableContainer>
  );
};

interface OptionProps {
  action: "delete" | "update" | "add" | "remove";
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
  background-color: red;
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
