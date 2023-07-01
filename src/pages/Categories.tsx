import Header from "../components/header/Header";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/categories/TableData";
import GroupCard from "../components/section/categories/card/GroupCard";

const Categories = () => {
  return (
    <>
      <Header />
      <SectionX3>
        <Section empty></Section>
        <Section>
          <GroupCard />
          <TableData />
        </Section>
        <Section empty></Section>
      </SectionX3>
    </>
  );
};

export default Categories;
