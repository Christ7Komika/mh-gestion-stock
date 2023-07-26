import { styled } from "styled-components";
import { color } from "../../../utils/color.ts";
import DatePicker from "../../input/DatePicker.tsx";
import {useState} from "react";
import { BiSolidPrinter } from "react-icons/bi";
import IncomingTable from "./Table/IncomingTable.tsx";

const IncomingStore = () => {
    const [dates, setDates] = useState<string[], []>([]);
    const [datePlaceholder, setDatePlaceholder ] = useState<string[], []>([]);
    const [init, setInit] = useState<boolean>(false)

    return (
        <Container>
            <InfosStoreTitle>STOCK ENTRANT</InfosStoreTitle>
            <FilterContainer>
                <DatePicker setDates={setDates} dates={dates} datePlaceholder={datePlaceholder} setInit={setInit} />
                <FilterReset>Imprimer <BiSolidPrinter size={15}/></FilterReset>
            </FilterContainer>
            <IncomingTable/>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`

const InfosStoreTitle = styled.h2`
  font-size: 1.5rem;
  color: ${color.darkBlue};
  font-weight: 600;
`;

const FilterContainer = styled.h2`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background: ${color.lightBlue};
  display: flex;
  align-items: center;
  padding-left: .5rem;
  gap: .5rem;
`

const FilterReset = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  border: 1px solid ${color.darkBlue};
  background: ${color.darkBlue};
  color: #fff;
  cursor: pointer;
  transition: linear .2s;
  &:hover {
    opacity: .8;
  }
`

export default  IncomingStore;