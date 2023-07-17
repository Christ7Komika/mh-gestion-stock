import styled from "styled-components";
import { color } from "../../../../utils/color";

const CardView = () => {
  return (
    <Container>
      <Card>
        <CardImg>
          <Img src="" alt="" />
        </CardImg>
        <CardContent>
          <CardText>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam harum
            culpa temporibus verit
          </CardText>
          <CardHighLight>EN STOCK : 2012</CardHighLight>
        </CardContent>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 254px;
  border-radius: 5px;
  padding-bottom: 7px;
  border: 1px solid ${color.darkBlue};
  transition: linear 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
  }
`;

const CardImg = styled.div`
  width: 100%;
  height: 140px;
  border-bottom: 1px solid ${color.darkBlue};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  height: 100px;
  padding: 0.5rem;
`;

const CardText = styled.p`
  font-size: 0.75rem;
`;

const CardHighLight = styled.p`
  font-size: 0.75rem;
  background: ${color.fadeBlue};
  border-radius: 25px;
  width: fit-content;
  padding: 0.4rem;
`;

export default CardView;
