import { styled } from "styled-components";
import { color } from "../../utils/color";
import { MdStore } from "react-icons/md";

const Card = () => {
  return (
    <Container>
      <CardIcon>
        <MdStore />
      </CardIcon>
      <CardContent>
        <CardTitle>Fournisseur enregistré</CardTitle>
        <CardText>235</CardText>
      </CardContent>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  border: 1px solid ${color.border};
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  border-radius: 5px;
`;

const CardIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${color.darkBlue};
  color: #fff;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const CardTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${color.darkBlue};
`;

const CardText = styled.p`
  font-size: 0.9rem;
  width: 75px;
  height: 35px;
  border-radius: 25px;
  background: ${color.lightBlue};
  color: ${color.darkBlue};
  text-align: center;
  line-height: 35px;
  font-weight: 500;
`;

export default Card;
