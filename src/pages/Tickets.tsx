import { useDispatch, useSelector } from "react-redux";
import GroupCard from "../components/card/GroupCard";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/tickets/TableData";
import InfosHeader from "../components/section/tickets/infos/InfosHeader";
import InfosHistoricalHeader from "../components/section/tickets/infos/InfosHistoricalHeader";
import { RootState } from "../redux/store";
import InfosContent from "../components/section/tickets/infos/InfosContent";
import { useEffect } from "react";
import { getTicket } from "../redux/features/ticket";
import NavBar from "../components/navbar/NavBar.tsx";
import InfosHistoricalContent from "../components/section/tickets/infos/InfosHistoricalContent.tsx";

const Tickets = () => {
  const ticket = useSelector((state: RootState) => state.ticket.data);
  const id = useSelector((state: RootState) => state.ticket.currentId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getTicket(id)(dispatch);
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
          <InfosHeader ticket={ticket} />
          <InfosContent ticket={ticket} />
        </Section>
      </SectionX3>
    </>
  );
};

export default Tickets;
