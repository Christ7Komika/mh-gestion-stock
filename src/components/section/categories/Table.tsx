import { IoCreate } from "react-icons/io5";
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
} from "../../layout/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { CategoryType, getCategories } from "../../../redux/features/category";
import DeleteModal from "./modal/DeleteModal";
import UpdateCategoryModal from "./modal/updateCategoryModal";

const Table = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.supplier.datas);
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [categoryDate, setCategoryData] = useState<CategoryType | null>(null);

  useEffect(() => {
    getCategories()(dispatch);
  }, []);

  const handleDelete = (name: string, id: string) => {
    setName(name);
    setId(id);
    setModalDelete(true);
  };

  const handleUpdate = (client: CategoryType) => {
    setCategoryData(client);
    setModalUpdate(true);
  };

  return (
    <>
      {modalDelete && (
        <DeleteModal setAction={setModalDelete} trueName={name} id={id} />
      )}
      {modalUpdate && (
        <UpdateCategoryModal
          setAction={setModalUpdate}
          category={categoryDate}
        />
      )}
      <TableContainer>
        <table>
          <TableHeader>
            <THRow>
              <THead>ID</THead>
              <THead>Nom</THead>
              <THead>Ajouté le</THead>
              <THead>Action</THead>
            </THRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category, id) => (
              <TRow key={`category-table-${id}`}>
                <TData>{id + 1}</TData>
                <TData>{category.name}</TData>
                <TData>
                  {new Date(category.createdAt).toLocaleDateString()}
                </TData>
                <TData>
                  <OptionGroup>
                    <Option
                      action="update"
                      onClick={() => handleUpdate(category)}
                    >
                      <IoCreate size={15} />
                    </Option>
                    <Option
                      action="delete"
                      onClick={() => handleDelete(category.name, category.id)}
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
