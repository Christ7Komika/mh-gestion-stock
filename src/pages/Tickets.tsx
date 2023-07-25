import { useDispatch, useSelector } from "react-redux";
import GroupCard from "../components/card/GroupCard";
import Header from "../components/header/Header";
import InfosHistoricalContent from "../components/historical/InfosHistoricalContent";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/tickets/TableData";
import InfosHeader from "../components/section/tickets/infos/InfosHeader";
import InfosHistoricalHeader from "../components/section/tickets/infos/InfosHistoricalHeader";
import { RootState } from "../redux/store";
import InfosContent from "../components/section/tickets/infos/InfosContent";
import { useEffect } from "react";
import { getTicket } from "../redux/features/ticket";

const Tickets = () => {
  const ticket = useSelector((state: RootState) => state.ticket.data);
  const id = useSelector((state: RootState) => state.ticket.currentId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getTicket(id)(dispatch);
    }
  }, [id]);

  console.log(ticket);

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
          <InfosContent ticket={ticket} />
        </Section>
      </SectionX3>
    </>
  );
};

export default Tickets;
