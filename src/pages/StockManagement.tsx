import NavBar from "../components/navbar/NavBar.tsx";
import {Section, SectionX2} from "../components/layout/Layout.ts";
import IncomingStore from "../components/section/StockManagemant/IncomingStore.tsx";
import OutGoingStore from "../components/section/StockManagemant/OutGoingStore.tsx";

const StockManagement = () => {
  return (
    <>
      <NavBar />
        <SectionX2>
            <Section>
                <IncomingStore/>
            </Section>
            <Section>
                <OutGoingStore/>
            </Section>
        </SectionX2>
    </>
  );
};

export default StockManagement;
