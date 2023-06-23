import { styled } from "styled-components";
import { color } from "../../utils/color";

const InputText = () => {
  return (
    <Container>
      <Label htmlFor="name">Nom</Label>
      <Input id="name" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${color.darkBlue};
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid ${color.border};
  padding-inline: 0.5rem;

  &:focus {
    outline: 1.5px solid ${color.border};
  }
`;

export default InputText;
