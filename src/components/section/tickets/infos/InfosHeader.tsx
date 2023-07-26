import styled from "styled-components";
import { color } from "../../../../utils/color";
import { TicketType } from "../../../../redux/features/ticket";

interface Props {
  ticket: TicketType | null;
}

const InfosHeader = ({ ticket }: Props) => {
  return (
    <Container>
      <ColorLine />
      <InfosHeaderColumnContent>
        <InfosHeaderTitle>Aperçu Bon de sortie</InfosHeaderTitle>
        {ticket && (
          <InfosHeaderDate>
            {new Date(ticket?.createdAt).toLocaleDateString()}

            <InfosHeaderStatus status={ticket.status}>
              {ticket.status}
            </InfosHeaderStatus>
          </InfosHeaderDate>
        )}
      </InfosHeaderColumnContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 0.5rem;
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  box-shadow: 0.5px 1px 6px rgba(0, 0, 0, 0.2);
`;

const ColorLine = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: ${color.fadeBlue};
`;

const InfosHeaderColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.5rem;
`;

const InfosHeaderTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;

const InfosHeaderDate = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InfosHeaderStatus = styled.p<{
  status?: "En cour" | "Valider" | "Annuler";
}>`
  width: 100px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ status }) =>
    status === "En cour"
      ? color.lightBlue
      : status === "Valider"
      ? color.lightGreen
      : color.lightRed};
  font-size: 0.8rem;
  color: ${color.darkBlue};
`;

export default InfosHeader;
