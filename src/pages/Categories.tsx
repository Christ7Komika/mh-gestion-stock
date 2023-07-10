import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import { Section, SectionX3 } from "../components/layout/Layout";
import TableData from "../components/section/categories/TableData";
import GroupCard from "../components/section/categories/card/GroupCard";
import InfosContent from "../components/section/categories/infos/InfosContent";
import InfosHeader from "../components/section/categories/infos/InfosHeader";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getCategory } from "../redux/features/category";

const Categories = () => {
  const category = useSelector((state: RootState) => state.category.data);
  const id = useSelector((state: RootState) => state.category.currentId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getCategory(id)(dispatch);
    }
  }, [id]);
  return (
    <>
      <Header />
      <SectionX3>
        <Section empty></Section>
        <Section>
          <GroupCard />
          <TableData />
        </Section>
        <Section>
          {category && (
            <>
              <InfosHeader category={category} />
              <InfosContent category={category} />
            </>
          )}
        </Section>
      </SectionX3>
    </>
  );
};

export default Categories;
