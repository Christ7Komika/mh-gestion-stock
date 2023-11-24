import styled from "styled-components";
import Card from "./Card";
import { color } from "../../utils/color";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useState, useEffect } from "react";
import { getTickets } from "../../redux/features/ticket";
import { TicketType } from "../../redux/features/stores";

const GroupCard = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.datas);
  const [validTicket, setValidTicket] = useState<TicketType[] | []>();
  const [loadTicket, setLoadTicket] = useState<TicketType[] | []>();
  const [cancelTicket, setCancelTicket] = useState<TicketType[] | []>();

  useEffect(() => {
    getTickets()(dispatch);
  }, []);

  useEffect(() => {
    if (tickets) {
      setValidTicket([
        ...tickets.filter((ticket) => ticket.status === "Valider"),
      ]);
      setLoadTicket([
        ...tickets.filter((ticket) => ticket.status === "En cour"),
      ]);
      setCancelTicket([
        ...tickets.filter((ticket) => ticket.status === "Annuler"),
      ]);
    }
  }, [tickets]);

  return (
    <Container>
      {tickets && (
        <>
          <Card title="Total bon de sortie" value={tickets.length || 0} />
          {validTicket && (
            <Card
              title="Bon de sortie validé"
              value={validTicket.length || 0}
            />
          )}
          {loadTicket && (
            <Card
              title="Bon de sortie en cour"
              value={loadTicket.length || 0}
            />
          )}
          {cancelTicket && (
            <Card
              title="Bon de sortie annulé"
              value={cancelTicket.length || 0}
            />
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${color.border};
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 3;
`;

export default GroupCard;
