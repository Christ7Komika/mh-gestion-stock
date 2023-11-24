import { styled } from "styled-components";
import { color } from "../../../utils/color";
import AddButton from "../../input/AddButton";
import SimpleSearchBard from "../../input/SimpleSearchBard";
import Table from "./Table";
import { useEffect, useState } from "react";
import TicketModal from "./modal/TicketModal";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByStatus,
  getTickets,
  searchTickets,
} from "../../../redux/features/ticket";
import { GroupCardFilter } from "../stores/TableData";
import { Loader } from "../../loader/Loader";
import { Reset } from "../stores/TableData";
import { IoFilterSharp } from "react-icons/io5";
import GroupBy from "../../input/GroupBy";
import { RootState } from "../../../redux/store";
import { RxCross2 } from "react-icons/rx";

const TableData = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [reset, setReset] = useState(false);
  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const isLoadGroup = useSelector(
    (state: RootState) => state.ticket.isLoadGroup
  );

  useEffect(() => {
    if (isValid && search) {
      searchTickets(search)(dispatch);
    }

    if (isValid && !search) {
      getTickets()(dispatch);
    }
  }, [search, isValid]);

  useEffect(() => {
    if (status) {
      setReset(true);
    }
  }, [status]);

  useEffect(() => {
    if (reload) {
      setStatus("");
      getTickets()(dispatch);
      setReset(false);
      setReload(false);
    }
  }, [reload]);

  const cancelFilter = () => {
    setReload(true);
    if (reload) {
      setStatus("");
    }
  };

  const filterByGroup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!status) {
      return;
    }
    filterByStatus(status)(dispatch);
  };

  return (
    <>
      {open && <TicketModal setAction={setOpen} />}

      <Container>
        <HeaderTitle>BON DE SORTIE</HeaderTitle>
        <GroupButton>
          {reset && (
            <Reload onClick={() => cancelFilter()}>
              <RxCross2 size={15} />
            </Reload>
          )}
          <GroupCardFilter>
            <GroupBy
              name=""
              id="groupby"
              defaultValue={status}
              setId={setStatus}
              placeholder="Filtrer status"
              error={""}
              data={data}
              init={reload}
            />
            <Reset onClick={(e: React.SyntheticEvent) => filterByGroup(e)}>
              {isLoadGroup ? (
                <Loader color={"#fff"} />
              ) : (
                <IoFilterSharp size={15} />
              )}
            </Reset>
          </GroupCardFilter>
          <SimpleSearchBard setSearch={setSearch} isValid={setIsValid} />
          <AddButton setOpen={setOpen} text="ticket" />
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
  align-items: center;
  justify-content: flex-end;
  column-gap: 1rem;
`;

const Reload = styled(Reset)`
  width: 25px;
  height: 25px;
`;

const data = [
  {
    id: "all",
    name: "Tous",
  },
  {
    id: "Valider",
    name: "Valider",
  },
  {
    id: "En cour",
    name: "En cour",
  },
  {
    id: "Annuler",
    name: "Annuler",
  },
];

export default TableData;
