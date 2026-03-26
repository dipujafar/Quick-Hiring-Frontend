import Companies from "@/components/modules/home/companies/Companies";
import Dashboard from "@/components/modules/home/dashboard/Dashboard";
import Header from "@/components/modules/home/header/Header";

export default function Home() {
  return (<>
    <Header />
    <Companies />
    <Dashboard />
  </>
  );
}
