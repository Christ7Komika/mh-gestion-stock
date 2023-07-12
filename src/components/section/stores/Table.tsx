import { BiGridAlt } from "react-icons/bi";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
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
import { useState } from "react";
import OptionModal from "./modal/OptionModal";
import AddToStockModal from "./modal/AddToStockModal";
import WithdrawToStockModal from "./modal/WithdrawToStockModal";
import UpdateModal from "./modal/UpdateModal";
import ChangeStoreModal from "./modal/ChangeStoreModal";
import DeleteModal from "./modal/DeleteModal";

const Table = () => {
  const [open, setOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [changeStoreModal, setChangeStoreModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<string>("");

  const stores = useSelector((state: RootState) => state.store.datas);

  return (
    <>
      {addModal && (
        <AddToStockModal setAction={setAddModal} currentId={currentId} />
      )}
      {withdrawModal && (
        <WithdrawToStockModal
          setAction={setWithdrawModal}
          currentId={currentId}
        />
      )}
      {updateModal && (
        <UpdateModal setAction={setUpdateModal} currentId={currentId} />
      )}
      {changeStoreModal && (
        <ChangeStoreModal setAction={setChangeStoreModal} trueName="" id="" />
      )}
      {deleteModal && (
        <DeleteModal setAction={setDeleteModal} trueName="" id="" />
      )}
      {open && (
        <OptionModal
          setAction={setOpen}
          setAddModal={setAddModal}
          setWithdrawModal={setWithdrawModal}
          setChangeStoreModal={setChangeStoreModal}
          setDeleteModal={setDeleteModal}
          setUpdateModal={setUpdateModal}
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
                      action="update"
                      onClick={() => {
                        setCurrentId(store.id);
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
