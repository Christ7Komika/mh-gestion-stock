import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/navbar/NavBar.tsx";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/suppliers/TableData";
import InfosContent from "../components/section/suppliers/infos/InfosContent";
import InfosHeader from "../components/section/suppliers/infos/InfosHeader";
import InfosHistoricalHeader from "../components/section/suppliers/infos/InfosHistoricalHeader";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getSupplier } from "../redux/features/supplier";
import GroupCard from "../components/section/suppliers/card/GroupCard";
import InfosHistoricalContent from "../components/section/suppliers/infos/InfosHistoricalContent";

const Suppliers = () => {
  const supplier = useSelector((state: RootState) => state.supplier.data);
  const id = useSelector((state: RootState) => state.supplier.currentId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getSupplier(id)(dispatch);
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
          {supplier && (
            <>
              <InfosHeader supplier={supplier} />
              <InfosContent supplier={supplier} />
            </>
          )}
        </Section>
      </SectionX3>
    </>
  );
};

export default Suppliers;
