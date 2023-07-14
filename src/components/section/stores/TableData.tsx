import { styled } from "styled-components";
import { color } from "../../../utils/color";
import AddButton from "../../input/AddButton";
import Table from "./Table";
import { useEffect, useState } from "react";
import SwitchDisplay from "../../input/SwitchDisplay";
import CardView from "./CardView";
import StockModal from "./modal/StockModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import InputSelectFill from "../../input/InputSelectFill";
import { IoFilterSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Loader } from "../../loader/Loader";
import SimpleSearchBard from "../../input/SimpleSearchBard";
import {
  StoreType,
  getStores,
  setStores,
} from "../../../redux/features/stores";

const TableData = () => {
  const [search, setSearch] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [changeDisplay, setChangeDisplay] = useState(false);
  const [warehouse, setWarehouse] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");

  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.category.datas);
  const suppliers = useSelector((state: RootState) => state.supplier.datas);
  const warehouses = useSelector((state: RootState) => state.warehouse.datas);
  const stores = useSelector((state: RootState) => state.store.datas);
  const [reset, setReset] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  useEffect(() => {
    getStores()(dispatch);
  }, []);

  useEffect(() => {
    if (isFilter) {
      setReset(true);
    }
  }, [isFilter]);

  function filterStoreBySelect(
    storesDatas: StoreType[],
    categoryId: string | null,
    supplierId: string | null,
    warehouseId: string | null
  ): StoreType[] {
    return storesDatas.filter((storeData: StoreType) => {
      const filterCategory = category
        ? storeData.Category.id === categoryId
        : true;
      const filterSupplier = supplier
        ? storeData.Supplier.id === supplierId
        : true;
      const filterWarehouse = warehouse
        ? storeData.Warehouse.id === warehouseId
        : true;
      return filterCategory && filterSupplier && filterWarehouse;
    });
  }

  const cancelFilter = () => {
    setWarehouse("");
    setSearch("");
    setSupplier("");
    setCategory("");
    setIsFilter(false);
    setReset(false);
    getStores()(dispatch);
  };

  const filterBySelect = () => {
    if (stores) {
      const filter = filterStoreBySelect(stores, category, supplier, warehouse);
      setStores(filter)(dispatch);
      setIsFilter(true);
    }
  };

  return (
    <>
      {open && <StockModal setAction={setOpen} />}
      <Container>
        <HeaderTitle>
          ARTICLE
          <Loader />
        </HeaderTitle>

        <GroupButton>
          <GroupSelectFilter>
            <InputSelectFill
              name=""
              id="warehouse"
              defaultValue={warehouse}
              setId={setWarehouse}
              placeholder="Entrepôt"
              error={""}
              data={warehouses}
            />
            <InputSelectFill
              name=""
              id="category"
              defaultValue={category}
              setId={setCategory}
              placeholder="Catégorie"
              error={""}
              data={categories}
            />
            <InputSelectFill
              name=""
              id="supplier"
              defaultValue={supplier}
              setId={setSupplier}
              placeholder="Fournisseur"
              error={""}
              data={suppliers}
            />
            <Reset onClick={() => filterBySelect()}>
              <IoFilterSharp size={15} />
            </Reset>
          </GroupSelectFilter>
          <SimpleSearchBard setSearch={setSearch} isValid={setIsValid} />
          <SwitchDisplay isDisplay={setChangeDisplay} />
          <AddButton setOpen={setOpen} text="article" />
          {reset && (
            <Reload onClick={() => cancelFilter()}>
              <RxCross2 size={15} />
            </Reload>
          )}
        </GroupButton>
      </Container>
      {changeDisplay ? <CardView /> : <Table />}
    </>
  );
};

export const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  margin-top: 1rem;
  align-items: center;
  gap: 0.5rem;
`;

export const HeaderTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${color.darkBlue};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const GroupSelectFilter = styled.div`
  padding-inline: 5px;
  background-color: ${color.fadeBlue};
  height: 50px;
  border-radius: 45px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const GroupButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 0.25rem;
`;

const Reset = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid ${color.darkBlue};
  color: ${color.darkBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: linear 0.4s;
  cursor: pointer;
  &:hover {
    background: ${color.darkBlue};
    color: #fff;
  }
`;

const Reload = styled(Reset)`
  width: 25px;
  height: 25px;
`;

export default TableData;
