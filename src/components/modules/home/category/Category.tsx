import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { TCategory } from "@/types";
import {  jobsCategories } from "@/utils/data";
import CategoryCard from "./CategoryCard";

export default function Category() {
  return (
    <Container className="w-full lg:py-18 py-10">
      <SectionTitle
        title="Explore by category"
        link="/jobs"
        linkText="Show all jobs"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:mt-12 mt-6">
        {jobsCategories.map((category: TCategory) => {
          return <CategoryCard key={category?.id} category={category} />;
        })}
      </div>
    </Container>
  );
}
