import Header from "../components/header/Header";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/clients/TableData";
import InfosContent from "../components/section/clients/infos/InfosContent";
import InfosHeader from "../components/section/clients/infos/InfosHeader";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { getClient } from "../redux/features/client";
import InfosHistoricalHeader from "../components/section/clients/infos/InfosHistoricalHeader";
import GroupCard from "../components/section/clients/card/GroupCard";
import InfosHistoricalContent from "../components/section/clients/infos/InfosHistoricalContent";

const Clients = () => {
  const client = useSelector((state: RootState) => state.client.data);
  const id = useSelector((state: RootState) => state.client.currentId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getClient(id)(dispatch);
    }
  }, [id]);
  return (
    <>
      <Header />
      <SectionX3>
        <Section>
          <InfosHistoricalHeader />
          <InfosHistoricalContent />
        </Section>
        <Section>
          <GroupCard />
          <TableData />
        </Section>
        <Section>
          {client && (
            <>
              <InfosHeader client={client} />
              <InfosContent client={client} />
            </>
          )}
        </Section>
      </SectionX3>
    </>
  );
};

export default Clients;
