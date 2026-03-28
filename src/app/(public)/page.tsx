import Category from "@/components/modules/home/category/Category";
import Companies from "@/components/modules/home/companies/Companies";
import Dashboard from "@/components/modules/home/dashboard/Dashboard";
import FeatureJobs from "@/components/modules/home/featureJobs/FeatureJobs";
import Header from "@/components/modules/home/header/Header";
import LatestJobsRoot from "@/components/modules/home/latestJobs/LatestJobs";
import FloatingNavbar from "@/components/shared/Navbar/FloatingNavbar";

export default function Home() {
  return (
    <>
      <FloatingNavbar />
      <Header />
      <Companies />
      <Category />
      <Dashboard />
      <FeatureJobs />
      <LatestJobsRoot />
    </>
  );
}
