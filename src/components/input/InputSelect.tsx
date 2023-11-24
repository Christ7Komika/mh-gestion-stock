import { styled } from "styled-components";
import { color } from "../../utils/color";
import { useEffect, useRef, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { SupplierType } from "../../redux/features/supplier";
import { CategoryType } from "../../redux/features/category";
import { WarehouseType } from "../../redux/features/warehouse";
import { limitWord } from "../../utils/text";

interface Props {
  setValue?: Function;
  setId: Function;
  name: string;
  id: string;
  defaultValue: string | null;
  error: string | null;
  placeholder: string;
  data: SupplierType[] | CategoryType[] | WarehouseType[] | null;
}

const InputSelect = ({
  name,
  defaultValue,
  id,
  setValue,
  error,
  placeholder,
  data,
  setId,
}: Props) => {
  const [text, setText] = useState<string | null>(null);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const selectRef = useRef<HTMLDivElement>(null);

  const filterSelect = () => {
    const filter = data?.filter(
      (option) =>
        option.name.toLowerCase().search(search.toLocaleLowerCase()) !== -1
    );
    if (filter) {
      return filter;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (setValue) {
      setValue(text);
    }
    setId(selectId);
  }, [text]);

  useEffect(() => {
    if (defaultValue) {
      const item = data?.filter((value) => value.id === defaultValue);

      if (item && item.length === 1) {
        setText(item[0].name);
        setSelectId(item[0].id);
        if (setValue) {
          setValue(text);
        }
      }
    }
  }, [defaultValue]);
  return (
    <Container ref={selectRef}>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
              setText(e.target.value);
            }}
            placeholder={placeholder}
            value={text ? limitWord(text, 35) : ""}
          />
          <SelectIcon>
            {open ? (
              <span onClick={() => setOpen(!open)}>
                <IoChevronUp size={12} />
              </span>
            ) : (
              <span onClick={() => setOpen(!open)}>
                <IoChevronDown size={12} />
              </span>
            )}
          </SelectIcon>
        </Select>
        {open && (
          <Options>
            {filterSelect() && filterSelect()?.length ? (
              filterSelect()?.map((option, i) => (
                <Option
                  onClick={() => {
                    setSearch("");
                    setText(option.name);
                    setSelectId(option.id);
                    setOpen(false);
                  }}
                  key={"select-" + i}
                >
                  {option.name}
                </Option>
              ))
            ) : (
              <Empty>Aucune référence trouvé</Empty>
            )}
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
  width: 100%;
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
    width: 20px;
    height: 20px;
    border-radius: 20px;
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
  z-index: 3;

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
  display: flex;
  align-items: center;
  height: auto;
  min-height: 35px;
  padding-inline: 0.5rem;
  padding-block: 0.2rem;
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

export default InputSelect;
