import GroupCard from "../components/card/GroupCard";
import Header from "../components/header/Header";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/stores/TableData";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../redux/features/category";
import { getSuppliers } from "../redux/features/supplier";
import { getWarehouses } from "../redux/features/warehouse";
import { getStores } from "../redux/features/stores";

const Stores = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories()(dispatch);
    getSuppliers()(dispatch);
    getWarehouses()(dispatch);
    getStores()(dispatch);
  }, []);
  return (
    <>
      <Header />
      <SectionX3>
        <Section></Section>
        <Section>
          <GroupCard />
          <TableData />
        </Section>
        <Section></Section>
      </SectionX3>
    </>
  );
};

export default Stores;
