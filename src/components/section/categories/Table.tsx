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
  CategoryType,
  getCategories,
  getCategoryId,
} from "../../../redux/features/category";
import DeleteModal from "./modal/DeleteModal";
import UpdateCategoryModal from "./modal/UpdateCategoryModal";
import ArticlesModal from "./modal/ArticlesModal";

const Table = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<CategoryType | null>(null);
  const [articleModal, setArticleModal] = useState<boolean>(false);

  useEffect(() => {
    getCategories()(dispatch);
  }, []);

  const categories = useSelector((state: RootState) => state.category.datas);
  const handleDelete = (name: string, id: string) => {
    setName(name);
    setId(id);
    setModalDelete(true);
  };

  const handleUpdate = (client: CategoryType) => {
    setCategoryData(client);
    setModalUpdate(true);
  };

  const handleSee = (id: string) => {
    getCategoryId(id)(dispatch);
  };

  const ShortCutText = (value: string): string => {
    if (value?.length >= 20) {
      return value.substring(0, 20) + "...";
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
        <UpdateCategoryModal
          setAction={setModalUpdate}
          category={categoryData}
        />
      )}
      <TableContainer>
        <table>
          <TableHeader>
            <THRow>
              <THead>ID</THead>
              <THead>Nom</THead>
              <THead>Référence</THead>
              <THead>Description</THead>
              <THead>Ajouté le</THead>
              <THead>Action</THead>
            </THRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category, id) => (
              <TRow key={`category-table-${id}`}>
                <TData>{id + 1}</TData>
                <TData>{category.name}</TData>
                <TData>{category.reference}</TData>
                <TData>{ShortCutText(category.description as string)}</TData>
                <TData>
                  {new Date(category.createdAt).toLocaleDateString()}
                </TData>
                <TData>
                  <OptionGroup>
                    <Option
                      action="remove"
                      onClick={() => {
                        getCategoryId(category.id)(dispatch);
                        setArticleModal(true);
                      }}
                    >
                      <BiPackage size={15} />
                    </Option>
                    <Option action="add" onClick={() => handleSee(category.id)}>
                      <IoEye size={15} />
                    </Option>
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
