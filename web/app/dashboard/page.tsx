import {DashNav} from "@/components/DashNav";
import Deploy from "@/components/dashboard/Deploy";
import Footer from "@/components/common/Footer";
export default function Dashboard() {
  return (
    <>
    <div>

      <DashNav />
    </div>
    <Deploy />
    <Footer />
    </>
  );
}
