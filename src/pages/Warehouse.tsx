import GroupCard from "../components/card/GroupCard";
import Header from "../components/header/Header";
import InfosHistoricalContent from "../components/historical/InfosHistoricalContent";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/warehouse/TableData";
import InfosContent from "../components/section/warehouse/infos/InfosContent";
import InfosHeader from "../components/section/warehouse/infos/InfosHeader";
import InfosHistoricalHeader from "../components/section/warehouse/infos/InfosHistoricalHeader";

const Warehouse = () => {
  return (
    <>
      <Header />
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
          <InfosHeader />
          <InfosContent />
        </Section>
      </SectionX3>
    </>
  );
};

export default Warehouse;
