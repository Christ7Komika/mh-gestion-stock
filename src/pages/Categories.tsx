import GroupCard from "../components/card/GroupCard";
import Header from "../components/header/Header";
import InfosHistoricalContent from "../components/historical/InfosHistoricalContent";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/categories/TableData";
import InfosContent from "../components/section/categories/infos/InfosContent";
import InfosHeader from "../components/section/categories/infos/InfosHeader";
import InfosHistoricalHeader from "../components/section/categories/infos/InfosHistoricalHeader";

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
