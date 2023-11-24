import { IoCreate, IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BiPackage } from "react-icons/bi";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
  WarehouseType,
  getWarehouseId,
  getWarehouses,
} from "../../../redux/features/warehouse";
import UpdateWarehouseModal from "./modal/UpdateWarehouseModal";
import DeleteModal from "./modal/DeleteModal";
import ArticlesModal from "./modal/ArticlesModal";

const Table = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [warehouseData, setWarehouseData] = useState<WarehouseType | null>(
    null
  );
  const [articleModal, setArticleModal] = useState<boolean>(false);

  useEffect(() => {
    getWarehouses()(dispatch);
  }, []);

  const warehouses = useSelector((state: RootState) => state.warehouse.datas);
  const handleDelete = (name: string, id: string) => {
    setName(name);
    setId(id);
    setModalDelete(true);
  };

  const handleUpdate = (client: WarehouseType) => {
    setWarehouseData(client);
    setModalUpdate(true);
  };

  const handleSee = (id: string) => {
    getWarehouseId(id)(dispatch);
  };

  const ShortCutText = (value: string): string => {
    if (value?.length >= 35) {
      return value.substring(0, 35) + "...";
    }
    return value;
  };

  return (
    <>
      {articleModal && <ArticlesModal setAction={setArticleModal} />}

      {modalDelete && (
        <DeleteModal setAction={setModalDelete} trueName={name} id={id} />
      )}
      {modalUpdate && (
        <UpdateWarehouseModal
          setAction={setModalUpdate}
          warehouse={warehouseData}
        />
      )}
      <TableContainer>
        <table>
          <TableHeader>
            <THRow>
              <THead>ID</THead>
              <THead>Nom</THead>
              <THead>Description</THead>
              <THead>Ajouté le</THead>
              <THead>Action</THead>
            </THRow>
          </TableHeader>
          <TableBody>
            {warehouses?.map((warehouse, id) => (
              <TRow key={`warehouse-table-${id}`}>
                <TData>{id + 1}</TData>
                <TData>{warehouse.name}</TData>
                <TData>{ShortCutText(warehouse.description as string)}</TData>
                <TData>
                  {new Date(warehouse.createdAt).toLocaleDateString()}
                </TData>
                <TData>
                  <OptionGroup>
                    <Option
                      action="remove"
                      onClick={() => {
                        getWarehouseId(warehouse.id)(dispatch);
                        setArticleModal(true);
                      }}
                    >
                      <BiPackage size={15} />
                    </Option>
                    <Option
                      action="add"
                      onClick={() => handleSee(warehouse.id)}
                    >
                      <IoEye size={15} />
                    </Option>
                    <Option
                      action="update"
                      onClick={() => handleUpdate(warehouse)}
                    >
                      <IoCreate size={15} />
                    </Option>
                    <Option
                      action="delete"
                      onClick={() => handleDelete(warehouse.name, warehouse.id)}
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
