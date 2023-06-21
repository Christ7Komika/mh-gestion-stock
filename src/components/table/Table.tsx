import styled from "styled-components";
import { color } from "../../utils/color";

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
            <TData>1</TData>
          </TRow>
          <TRow>
            <TData>1</TData>

            <TData>Christ Komika</TData>
            <TData>WB56DED</TData>
            <TData>+242 05 564 32 95</TData>
            <TData>christkomika7@gmail.com</TData>
            <TData>21/06/2023</TData>
            <TData>1</TData>
          </TRow>
          <TRow>
            <TData>1</TData>
            <TData>Christ Komika</TData>
            <TData>WB56DED</TData>
            <TData>+242 05 564 32 95</TData>
            <TData>christkomika7@gmail.com</TData>
            <TData>21/06/2023</TData>
            <TData>1</TData>
          </TRow>
          <TRow>
            <TData>1</TData>
            <TData>Christ Komika</TData>
            <TData>WB56DED</TData>
            <TData>+242 05 564 32 95</TData>
            <TData>christkomika7@gmail.com</TData>
            <TData>21/06/2023</TData>
            <TData>
              <OptionGroup>
                <Option>1</Option>
                <Option>1</Option>
                <Option>1</Option>
                <Option>1</Option>
              </OptionGroup>
            </TData>
          </TRow>
        </TableBody>
      </table>
    </TableContainer>
  );
};
const TableContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;

  & table {
    width: 100%;
    border-collapse: collapse;
  }
`;

const TableHeader = styled.thead`
  border-bottom: 10px solid #fff;
`;
const THead = styled.th`
  font-size: 1rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-align: center;
`;
const THRow = styled.tr`
  appearance: none;
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.22);
  position: relative;
  z-index: 2;
`;
const TRow = styled.tr`
  height: 50px;
  border-top: 10px solid #fff;
  border-bottom: 10px solid #fff;
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
  display: grid;
  grid-template-columns: repeat(4, 25px);
  justify-content: center;
  column-gap: 5px;
`;

const Option = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: red;
  display: flex;
  justify-content: center;
`;
export default Table;
