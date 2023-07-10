import GroupCard from "../components/card/GroupCard";
import Header from "../components/header/Header";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/stores/TableData";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../redux/features/category";
import { getSuppliers } from "../redux/features/supplier";

const Stores = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories()(dispatch);
    getSuppliers()(dispatch);
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
