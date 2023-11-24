import { styled } from "styled-components";
import { color } from "../../utils/color";
import { useEffect, useState } from "react";

interface Props {
  setValue: Function;
  name: string;
  id: string;
  defaultValue?: string | null;
  error: string | null;
  suffix?: string;
  type?: string;
  placeholder?: string;
}

const InputText = ({
  name,
  defaultValue,
  id,
  setValue,
  error,
  suffix,
  type,
  placeholder,
}: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setText(defaultValue);
    }
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setValue(text ? text : defaultValue ? defaultValue : "");
    }
    setValue(text);
  }, [text]);
  return (
    <Container>
      <Label htmlFor={id}>
        {suffix ? name + " " + suffix : name}
        {error && <LabelError>{error}</LabelError>}
      </Label>
      <Input
        type={type ? type : "text"}
        id={id}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
        defaultValue={defaultValue ? defaultValue : ""}
        placeholder={placeholder ? placeholder : ""}
        value={text}
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

export const LabelError = styled.small`
  color: ${color.red};
  font-size: 0.75rem;
  width: fit-content;
  text-align: center;
  height: auto;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid ${color.border};
  padding-inline: 0.5rem;

  &:focus {
    outline: 1.5px solid ${color.border};
  }
`;

export default InputText;
