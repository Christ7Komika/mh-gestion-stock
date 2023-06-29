import { IoEye, IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {
  OptionGroup,
  TData,
  THRow,
  THead,
  TRow,
  TableBody,
  TableContainer,
  TableHeader,
  Option,
  TDImg,
} from "../../layout/table";

const Table = () => {
  return (
    <TableContainer>
      <table>
        <TableHeader>
          <THRow>
            <THead>ID</THead>
            <THead>Logo</THead>
            <THead>Nom</THead>
            <THead>Société</THead>
            <THead>Téléphone</THead>
            <THead>Email</THead>
            <THead>Ajouté le</THead>
            <THead>Action</THead>
          </THRow>
        </TableHeader>
        <TableBody>
          <TRow>
            <TData>1</TData>
            <TData>
              <TDImg />
            </TData>
            <TData>Christ Komika</TData>
            <TData>MH</TData>
            <TData>+242 05 564 32 95</TData>
            <TData>christkomika7@gmail.com</TData>
            <TData>21/06/2023</TData>
            <TData>
              <OptionGroup>
                <Option action="add">
                  <IoEye size={15} />
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

export default Table;
