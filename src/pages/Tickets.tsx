import GroupCard from "../components/card/GroupCard";
import Header from "../components/header/Header";
import InfosHistoricalContent from "../components/historical/InfosHistoricalContent";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/tickets/TableData";
import InfosContent from "../components/section/tickets/infos/InfosContent";
import InfosHeader from "../components/section/tickets/infos/InfosHeader";
import InfosHistoricalHeader from "../components/section/tickets/infos/InfosHistoricalHeader";
const Tickets = () => {
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

export default Tickets;
