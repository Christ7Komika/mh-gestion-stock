import { styled } from "styled-components";
import { color } from "../../utils/color";
import { useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface Props {
  setValue: Function;
  name: string;
  id: string;
  defaultValue: string | null;
  error: string | null;
}

const InputSelect = ({ name, defaultValue, id, setValue, error }: Props) => {
  const [text, setText] = useState<string | null>(null);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setValue(text);
  }, [text]);
  return (
    <Container>
      <Label htmlFor={id}>
        {name}
        {error && <LabelError>{error}</LabelError>}
      </Label>
      <SelectContainer>
        <Select focus={focus}>
          <Input
            onFocus={() => {
              setFocus(true);
              setOpen(true);
            }}
            onChange={(e) => setSearch(e.target.value)}
            value={search ? search : text ? text : ""}
          />
          <SelectIcon>
            <span onClick={() => setOpen(!open)}>
              <IoChevronDown size={15} />
            </span>
          </SelectIcon>
        </Select>
        {open && (
          <Options>
            {data
              .filter(
                (option) =>
                  option.name
                    .toLowerCase()
                    .search(search.toLocaleLowerCase()) !== -1
              )
              .map((option) => {
                if (option) {
                  return (
                    <Option
                      onClick={() => {
                        setText(option.name);
                        setSelectId(option.id);
                      }}
                    >
                      {option.name}
                    </Option>
                  );
                }
                return <Empty>Aucune référence trouvé</Empty>;
              })}
          </Options>
        )}
      </SelectContainer>
    </Container>
  );
};

interface SelectProps {
  focus: boolean;
}

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

const SelectContainer = styled.div`
  width: 300px;
  position: relative;
`;

const Select = styled.div<SelectProps>`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid ${color.border};
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;

  outline: ${({ focus }) => (focus ? `1.5px solid ${color.border}` : "none")};
`;

const SelectIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  & span {
    width: 25px;
    height: 25px;
    border-radius: 25px;
    background: ${color.darkBlue};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const Input = styled.input`
  padding-inline: 0.5rem;
  width: 100%;
  height: 100%;
  border: none;

  &:focus {
    outline: none;
  }
`;

const Options = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  height: auto;
  max-height: 150px;
  background: #fff;
  border-radius: 5px;
  padding-block: 0.5rem;
  overflow-y: auto;
  box-shadow: 0.5px 0.5px 9px rgba(0, 0, 0, 0.4);

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.border};
    border-radius: 5px;
  }
`;

const Option = styled.p`
  height: 35px;
  padding-inline: 0.5rem;
  line-height: 35px;
  transition: linear 0.4s;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background: ${color.fadeBlue};
  }
`;

const Empty = styled.p`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${color.darkBlue};
`;

const data = [
  {
    id: 1,
    name: "Reference 1",
  },
  {
    id: 2,
    name: "Reference 2",
  },
  {
    id: 3,
    name: "Reference 3",
  },
  {
    id: 4,
    name: "Reference 4",
  },
  {
    id: 5,
    name: "Reference 5",
  },
];

export default InputSelect;
