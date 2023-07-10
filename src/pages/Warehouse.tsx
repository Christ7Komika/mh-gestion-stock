import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/warehouse/TableData";
import InfosContent from "../components/section/warehouse/infos/InfosContent";
import InfosHeader from "../components/section/warehouse/infos/InfosHeader";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getWarehouse } from "../redux/features/warehouse";
import GroupCard from "../components/section/warehouse/card/GroupCard";

const Warehouse = () => {
  const warehouse = useSelector((state: RootState) => state.warehouse.data);
  const id = useSelector((state: RootState) => state.warehouse.currentId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getWarehouse(id)(dispatch);
    }
  }, [id]);
  return (
    <>
      <Header />
      <SectionX3>
        <Section empty></Section>
        <Section>
          <GroupCard />
          <TableData />
        </Section>
        <Section>
          {warehouse && (
            <>
              <InfosHeader warehouse={warehouse} />
              <InfosContent warehouse={warehouse} />
            </>
          )}
        </Section>
      </SectionX3>
    </>
  );
};

export default Warehouse;
