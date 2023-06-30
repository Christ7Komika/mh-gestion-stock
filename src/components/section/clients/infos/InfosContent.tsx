import { styled } from "styled-components";
import { color } from "../../../../utils/color";
import { ClientType } from "../../../../redux/features/client";

interface Props {
  client: ClientType | null;
}

const InfosContent = ({ client }: Props) => {
  return (
    <Container>
      <InfosContentImageContainer>
        <InfosContentImage src={client?.logo} />
      </InfosContentImageContainer>
      <InfosContentCard>
        <InfosContentCardTitle>NOM</InfosContentCardTitle>
        <InfosContentCardText>{client?.name}</InfosContentCardText>
      </InfosContentCard>
      <InfosContentCard>
        <InfosContentCardTitle>SOCIÉTÉ</InfosContentCardTitle>
        <InfosContentCardText>{client?.company}</InfosContentCardText>
      </InfosContentCard>
      {client && client.phone && (
        <InfosContentCard>
          <InfosContentCardTitle>TÉLÉPHONE</InfosContentCardTitle>
          <InfosContentCardText>{client.phone}</InfosContentCardText>
        </InfosContentCard>
      )}
      {client && client.email && (
        <InfosContentCard>
          <InfosContentCardTitle>EMAIL</InfosContentCardTitle>
          <InfosContentCardText>{client.email}</InfosContentCardText>
        </InfosContentCard>
      )}
    </Container>
  );
};

const Container = styled.div`
  & > div {
    margin-bottom: 1rem;
  }
`;

const InfosContentImageContainer = styled.div`
  width: 100%;
  height: 150px;
  border: 1px solid ${color.border};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfosContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

const InfosContentCard = styled.div`
  padding: 1rem;
  background: ${color.fadeBlue};
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  border-radius: 5px;
`;

const InfosContentCardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${color.darkBlue};
  text-transform: uppercase;
`;
const InfosContentCardText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${color.darkBlue};
  text-transform: uppercase;
  word-break: break-all;
`;

export default InfosContent;
