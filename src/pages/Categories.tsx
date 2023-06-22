import GroupCard from "../components/card/GroupCard";
import Header from "../components/header/Header";
import InfosHistoricalContent from "../components/historical/InfosHistoricalContent";
import InfosContent from "../components/infos/InfosContent";
import InfosHeader from "../components/infos/InfosHeader";
import InfosHistoricalHeader from "../components/infos/InfosHistoricalHeader";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/table/TableData";
const Categories = () => {
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

export default Categories;
