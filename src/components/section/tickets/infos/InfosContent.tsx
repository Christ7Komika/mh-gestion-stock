import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import { TicketType } from "../../../../redux/features/ticket";

interface Props {
  ticket: TicketType | null;
}

const InfosContent = ({ ticket }: Props) => {
  return (
    <Container>
      {ticket && (
        <InfosContentCard>
          <InfosContentCardTitle>NOM</InfosContentCardTitle>
          <InfosContentCardText>{ticket.name}</InfosContentCardText>
        </InfosContentCard>
      )}
      {ticket && (
        <InfosContentCard>
          <InfosContentCardTitle>NUMÉRO BON DE COMMANDE</InfosContentCardTitle>
          <InfosContentCardText>{ticket.purchaseOrder}</InfosContentCardText>
        </InfosContentCard>
      )}
      {ticket && (
        <InfosContentCard>
          <InfosContentCardTitle>PRIX</InfosContentCardTitle>
          <InfosContentCardText>{ticket.sum}</InfosContentCardText>
        </InfosContentCard>
      )}
      {ticket && (
        <InfosContentCard>
          <InfosContentCardTitle>CLIENT</InfosContentCardTitle>
          <InfosContentCardText>{ticket.Client.name}</InfosContentCardText>
        </InfosContentCard>
      )}
      {ticket && (
        <InfosContentCardContainer>
          {ticket.item.map((item, index) => (
            <InfosContentCardSecond key={item.id}>
              <InfosContentCardText key={item.article?.id}>
                <span>{index + 1}.</span> {item.article?.designation}
              </InfosContentCardText>
              <InfosContentCardInfos>
                {item.hasLength
                  ? `Longueur: ${item.withdraw} mètre(s)`
                  : `Quantité: ${item.withdraw} article(s)`}
              </InfosContentCardInfos>
              <InfosContentCardInfos>
                Somme:{" "}
                {item.sumValue
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                FCFA
              </InfosContentCardInfos>
            </InfosContentCardSecond>
          ))}
        </InfosContentCardContainer>
      )}
    </Container>
  );
};

const InfosContentCardContainer = styled.div`
  padding: 0.5rem;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  border-radius: 5px;
`;

const Container = styled.div`
  & > div {
    margin-bottom: 1rem;
  }
`;

const InfosContentCard = styled.div`
  padding: 0.4rem;
  background: ${color.fadeBlue};
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  border-radius: 5px;
`;
const InfosContentCardSecond = styled.div`
  padding: 0.4rem;
  background: #dde6ed;
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  border-radius: 5px;
`;

const InfosContentCardTitle = styled.h2`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
  background-color: ${color.grey};
  border-radius: 5px;
  padding: 5px;
`;

const InfosContentCardText = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-transform: uppercase;
  padding: 5px;

  span {
    display: inline-block;
    padding: 5px;
    border-radius: 5px;
    background-color: #91c8e4;
  }
`;

const InfosContentCardInfos = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-transform: uppercase;
  padding: 5px 1rem;
  background: #8cc0de;
  border-radius: 5px;
`;

export default InfosContent;
