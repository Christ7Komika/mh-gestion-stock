import { BiGridAlt } from "react-icons/bi";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Option,
  OptionGroup,
  TData,
  THRow,
  THead,
  TRow,
  TableBody,
  TableContainer,
  TableHeader,
} from "../../layout/table";
import { useEffect, useState } from "react";
import OptionModal from "./modal/OptionModal";
import AddToStockModal from "./modal/AddToStockModal";
import WithdrawToStockModal from "./modal/WithdrawToStockModal";
import UpdateModal from "./modal/UpdateModal";
import ChangeStoreModal from "./modal/ChangeStoreModal";
import DeleteModal from "./modal/DeleteModal";
import { getStoreId, getStores } from "../../../redux/features/stores";
import MoveToModal from "./modal/MoveToModal";
import ChangeCategoryModal from "./modal/ChangeCategoryModal";
import ChangeSupplierModal from "./modal/ChangeSupplierModal";
import { IoEye } from "react-icons/io5";

const Table = () => {
  const [open, setOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [changeStoreModal, setChangeStoreModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [changeCategory, setChangeCategory] = useState(false);
  const [changeSupplier, setChangeSupplier] = useState(false);
  const [moveStock, setMoveStock] = useState(false);

  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.store.datas);

  useEffect(() => {
    getStores()(dispatch);
  }, []);

  return (
    <>
      {addModal && <AddToStockModal setAction={setAddModal} />}
      {withdrawModal && <WithdrawToStockModal setAction={setWithdrawModal} />}
      {changeCategory && <ChangeCategoryModal setAction={setChangeCategory} />}
      {changeSupplier && <ChangeSupplierModal setAction={setChangeSupplier} />}
      {moveStock && <MoveToModal setAction={setMoveStock} />}
      {updateModal && <UpdateModal setAction={setUpdateModal} />}
      {changeStoreModal && <ChangeStoreModal setAction={setChangeStoreModal} />}
      {deleteModal && <DeleteModal setAction={setDeleteModal} />}
      {open && (
        <OptionModal
          setAction={setOpen}
          setAddModal={setAddModal}
          setWithdrawModal={setWithdrawModal}
          setChangeStoreModal={setChangeStoreModal}
          setDeleteModal={setDeleteModal}
          setUpdateModal={setUpdateModal}
          setChangeCategory={setChangeCategory}
          setChangeSupplier={setChangeSupplier}
          setMoveStock={setMoveStock}
        />
      )}
      <TableContainer>
        <table>
          <TableHeader>
            <THRow>
              <THead>ID</THead>
              <THead>Nom</THead>
              <THead>Catégorie</THead>
              <THead>Quantité / Longueur</THead>
              <THead>Prit d'achat</THead>
              <THead>Prix unitaire</THead>
              <THead>Prix de vente</THead>
              <THead>Ajouté le</THead>
              <THead>Action</THead>
            </THRow>
          </TableHeader>
          <TableBody>
            {stores?.map((store, index) => (
              <TRow>
                <TData>{index + 1}</TData>
                <TData>{store.name}</TData>
                <TData>{store.Category.name}</TData>
                <TData>{`${store.quantity} ${
                  store.hasLength ? "mètre(s)" : "qté(s)"
                }`}</TData>
                <TData>{store.purchasePrice + " FCFA"}</TData>
                <TData>{store.unitPrice + " FCFA"}</TData>
                <TData>{store.sellingPrice + " FCFA"}</TData>
                <TData>{new Date(store.createdAt).toLocaleDateString()}</TData>
                <TData>
                  <OptionGroup>
                    <Option
                      action="add"
                      onClick={() => getStoreId(store.id)(dispatch)}
                    >
                      <IoEye size={15} />
                    </Option>
                    <Option
                      action="update"
                      onClick={() => {
                        getStoreId(store.id)(dispatch);
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

export default Table;
