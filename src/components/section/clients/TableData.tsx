import { styled } from "styled-components";
import { color } from "../../../utils/color";
import AddButton from "../../input/AddButton";
import SimpleSearchBard from "../../input/SimpleSearchBard";
import Table from "./Table";
import { useEffect, useState } from "react";
import ClientModal from "./modal/ClientModal";
import { getClients, searchClients } from "../../../redux/features/client";
import { useDispatch } from "react-redux";

const TableData = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isValid && search) {
      searchClients(search)(dispatch);
    }

    if (isValid && !search) {
      getClients()(dispatch);
    }
  }, [search, isValid]);

  return (
    <>
      {open && <ClientModal setAction={setOpen} />}
      <Container>
        <HeaderTitle>CLIENTS</HeaderTitle>
        <GroupButton>
          <SimpleSearchBard setSearch={setSearch} isValid={setIsValid} />
          <AddButton setOpen={setOpen} />
        </GroupButton>
      </Container>
      <Table />
    </>
  );
};

export const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  margin-top: 1rem;
`;

export const HeaderTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${color.darkBlue};
`;

export const GroupButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  column-gap: 1rem;
`;

export default TableData;
