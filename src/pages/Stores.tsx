import NavBar from "../components/navbar/NavBar.tsx";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/stores/TableData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../redux/features/category";
import { getSuppliers } from "../redux/features/supplier";
import { getWarehouses } from "../redux/features/warehouse";
import { getStore, getStores } from "../redux/features/stores";
import InfosHistoricalHeader from "../components/section/stores/infos/InfosHistoricalHeader";
import { RootState } from "../redux/store";
import InfosHeader from "../components/section/stores/infos/InfosHeader";
import InfosContent from "../components/section/stores/infos/InfosContent";
import InfosHistoricalContent from "../components/section/stores/infos/InfosHistoricalContent";
import GroupCard from "../components/section/stores/card/GroupCard.tsx";

const Stores = () => {
  const store = useSelector((state: RootState) => state.store.data);
  const id = useSelector((state: RootState) => state.store.currentId);
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories()(dispatch);
    getSuppliers()(dispatch);
    getWarehouses()(dispatch);
    getStores()(dispatch);
  }, []);

  useEffect(() => {
    if (id) {
      getStore(id)(dispatch);
    }
  }, [id]);
  return (
    <>
      <NavBar />
      <SectionX3>
        <Section>
          <InfosHistoricalHeader />
          <InfosHistoricalContent />
        </Section>
        <Section>
          <GroupCard />
          <TableData />
        </Section>
        <Section>
          {store && (
            <>
              <InfosHeader store={store} />
              <InfosContent store={store} />
            </>
          )}
        </Section>
      </SectionX3>
    </>
  );
};

export default Stores;
