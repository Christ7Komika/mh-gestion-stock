import styled from "styled-components";
import { color } from "../../../../utils/color";

interface Props {
  handleOpen: Function;
  name: string;
  count: number;
  type: string;
}

const CardGroup = ({ name, count, type, handleOpen }: Props) => {
  return (
    <Card onClick={() => handleOpen(type, name)}>
      <CardContent>
        <CardText>{name}</CardText>
        <CardHighLight>Artilce : {count}</CardHighLight>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
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

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  height: auto;
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

export default CardGroup;
