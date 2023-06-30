import { styled } from "styled-components";
import { color } from "../../../utils/color";
import AddButton from "../../input/AddButton";
import SimpleSearchBard from "../../input/SimpleSearchBard";
import Table from "./Table";
import { useState } from "react";
import SupplierModal from "../suppliers/modal/SupplierModal";

const TableData = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <SupplierModal setAction={setOpen} />}
      <Container>
        <HeaderTitle>FOURNISSEURS</HeaderTitle>
        <GroupButton>
          <SimpleSearchBard />
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
