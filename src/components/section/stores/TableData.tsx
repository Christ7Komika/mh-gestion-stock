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
import {
  getStores,
   filter,
} from "../../../redux/features/stores";
import SearchBar from "../../input/SearchBar.tsx";

const TableData = () => {
  const [search, setSearch] = useState("");
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
  const isLoad = useSelector((state:RootState) => state.store.isLoad)
  const [reload, setReload] = useState<boolean>(false)

  useEffect(() => {
    getStores()(dispatch);
  }, []);

  useEffect(() => {
    if (isFilter) {
      setReset(true);
    }
  }, [isFilter]);



  const cancelFilter = () => {
    console.log("reload before : ", reload)
    setReload(true)
    if(reload) {
      setWarehouse("");
      setSearch("");
      setSupplier("");
      setCategory("");
      setIsFilter(false);
      getStores()(dispatch);
      setReload(false)
      setReset(false)
    }
    console.log("reload after : ", reload)
  };

  const filterBySelect = () => {
    if (stores) {
      filter({
        warehouse: warehouse,
        supplier: supplier,
        category: category,
        search: search
      }, (exit:boolean) => {
      if(exit) {
        setIsFilter(true)
      }
      }
      )(dispatch)
    }
  };

  return (
    <>
      {open && <StockModal setAction={setOpen} />}
      <Container>
        <HeaderTitle>
          ARTICLE

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
              init={reload}
            />
            <InputSelectFill
              name=""
              id="category"
              defaultValue={category}
              setId={setCategory}
              placeholder="Catégorie"
              error={""}
              data={categories}
              init={reload}
            />
            <InputSelectFill
              name=""
              id="supplier"
              defaultValue={supplier}
              setId={setSupplier}
              placeholder="Fournisseur"
              error={""}
              data={suppliers}
              init={reload}
            />
            <SearchBar setSearch={setSearch}  />
            <Reset onClick={() => filterBySelect()}>
              {isLoad ? <Loader color={"#fff"} /> : <IoFilterSharp size={15} />}
            </Reset>
          </GroupSelectFilter>
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
  background: ${color.darkBlue};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: linear 0.4s;
  cursor: pointer;
  &:hover {

opacity: .8;
  }
`;

const Reload = styled(Reset)`
  width: 25px;
  height: 25px;
`;

export default TableData;
