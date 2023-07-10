import { styled } from "styled-components";
import { color } from "../../utils/color";
import { useEffect, useState } from "react";

interface Props {
  setValue: Function;
  name: string;
  id: string;
  defaultValue: string | null;
  error: string | null;
}

const inputPlainText = ({ name, defaultValue, id, setValue, error }: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setValue(text);
  }, [text]);
  return (
    <Container>
      <Label htmlFor={id}>
        {name}
        {error && <LabelError>{error}</LabelError>}
      </Label>
      <TextArea
        id={id}
        onChange={(e) => setText(e.target.value)}
        defaultValue={text ? text : defaultValue ? defaultValue : ""}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
`;

const Label = styled.label`
  width: 100%;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${color.darkBlue};
  display: flex;
  justify-content: space-between;
`;

const LabelError = styled.small`
  color: ${color.red};
  font-size: 0.75rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-width: 300px;
  max-width: 100%;
  height: 50px;
  min-height: 40px;
  max-height: 110px;
  border-radius: 5px;
  border: 1px solid ${color.border};
  padding: 0.5rem;

  &:focus {
    outline: 1.5px solid ${color.border};
  }
`;

export default inputPlainText;
