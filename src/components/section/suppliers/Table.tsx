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
} from "../../layout/table";
import { IoCreate, IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  SupplierType,
  getSupplierId,
  getSuppliers,
} from "../../../redux/features/supplier";
import DeleteModal from "./modal/DeleteModal";
import UpdateSupplierModal from "./modal/updateSupplierModal";

const Table = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [supplierData, setSupplierData] = useState<SupplierType | null>(null);
  const dispatch = useDispatch();
  const suppliers = useSelector((state: RootState) => state.supplier.datas);

  useEffect(() => {
    getSuppliers()(dispatch);
  }, []);

  const handleDelete = (name: string, id: string) => {
    setName(name);
    setId(id);
    setModalDelete(true);
  };

  const handleUpdate = (supplier: SupplierType) => {
    setSupplierData(supplier);
    setModalUpdate(true);
  };

  const handleSee = (id: string) => {
    getSupplierId(id)(dispatch);
  };

  return (
    <>
      {modalDelete && (
        <DeleteModal setAction={setModalDelete} trueName={name} id={id} />
      )}
      {modalUpdate && (
        <UpdateSupplierModal
          setAction={setModalUpdate}
          supplier={supplierData}
        />
      )}
      <TableContainer>
        <table>
          <TableHeader>
            <THRow>
              <THead>ID</THead>
              <THead>Nom</THead>
              <THead>Téléphone</THead>
              <THead>Email</THead>
              <THead>Ajouté le</THead>
              <THead>Action</THead>
            </THRow>
          </TableHeader>
          <TableBody>
            {suppliers?.map((supplier, id) => (
              <TRow key={`supplier-table-${id}`}>
                <TData>{id + 1}</TData>
                <TData>{supplier.name}</TData>
                <TData>{supplier.phone}</TData>
                <TData>{supplier.email}</TData>
                <TData>
                  {new Date(supplier.createdAt).toLocaleDateString()}
                </TData>
                <TData>
                  <OptionGroup>
                    <Option action="add" onClick={() => handleSee(supplier.id)}>
                      <IoEye size={15} />
                    </Option>
                    <Option
                      action="update"
                      onClick={() => handleUpdate(supplier)}
                    >
                      <IoCreate size={15} />
                    </Option>
                    <Option
                      action="delete"
                      onClick={() => handleDelete(supplier.name, supplier.id)}
                    >
                      <MdDelete size={15} />
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
export default Table;
