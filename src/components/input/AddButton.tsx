import { IoAdd } from "react-icons/io5";
import { styled } from "styled-components";
import { color } from "../../utils/color";

interface Props {
  setOpen: Function;
  text: string;
}

const AddButton = ({ setOpen, text }: Props) => {
  return (
    <Container onClick={() => setOpen(true)}>
      <ButtonIcon>
        <IoAdd size={25} />
      </ButtonIcon>
      <ButtonText>Ajout {text}</ButtonText>
    </Container>
  );
};

const Container = styled.button`
  width: fit-content;
  height: 40px;
  border-radius: 35px;
  background: ${color.darkBlue};
  border: 1px solid ${color.darkBlue};
  display: flex;
  align-items: center;
  column-gap: 0.4rem;
  padding-inline: 0.4rem;

  cursor: pointer;
  transition: linear 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #fff;
  color: ${color.darkBlue};
`;

const ButtonText = styled.p`
  font-size: 0.8rem;
  color: #fff;
`;

export default AddButton;
