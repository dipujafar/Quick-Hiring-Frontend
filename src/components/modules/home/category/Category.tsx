import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { TCategory } from "@/types";
import {  jobsCategories } from "@/utils/data";
import AnimatedArrow from "@/components/animation/AnimatedArrow";
import Image from "next/image";
import Link from "next/link";



export default function Category() {
  return (
    <Container className="w-full lg:py-18 py-10">
      <SectionTitle
        title="Explore by category"
        link="/jobs"
        linkText="Show all jobs"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:mt-12 mt-6">
        {jobsCategories?.map((category: TCategory) => {
          return <CategoryCard key={category?.id} category={category} />;
        })}
      </div>
    </Container>
  );
}


 function CategoryCard({ category }: { category: TCategory }) {
  return (
    <Link href={`/jobs?category=${category?.title}`}>
      <div className="border border-[#D6DDEB] p-5 md:p-8 space-y-2 md:space-y-3 hover:bg-primary-color duration-200 group flex  md:flex-col gap-x-6">
        <Image
          src={category?.icon}
          height={500}
          width={500}
          alt="icon"
          className="h-10 md:h-12 w-fit mb-3 md:mb-8 group-hover:brightness-0 group-hover:invert"
          placeholder='blur' blurDataURL={'/blurImage.jpg'}
        />
        <div className=" flex-1">
          <h6 className="font-clash font-semibold text-lg md:text-xl text-primary-black group-hover:text-white truncate">
            {category?.title}
          </h6>
          <div className="flex  justify-between md:justify-start gap-4 group-hover:text-gray-200">
            <p className="text-primary-gray group-hover:text-gray-200  text-sm md:text-base flex flex-row gap-x-2 items-center  truncate">
              {category?.available_jobs} Jobs Avaiable
            </p>
            <AnimatedArrow />
          </div>
        </div>
      </div>
    </Link>
  );
}