import GroupCard from "../components/card/GroupCard";
import Header from "../components/header/Header";
import InfosContent from "../components/infos/InfosContent";
import InfosHeader from "../components/infos/InfosHeader";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/table/TableData";

const Suppliers = () => {
  return (
    <>
      <Header />
      <SectionX3>
        <Section>1</Section>
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

export default Suppliers;
