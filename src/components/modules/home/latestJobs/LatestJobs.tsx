import Link from "next/link";
import Image from "next/image";
import pattern from "@/assets/images/Pattern.png";
import { Suspense } from "react";
import { GetJobs } from "@/lib/actions/jobs.action";
import { jobsCategories } from "@/utils/data";
import { Job } from "@/types";
import LatestJobSkeleton from "./LatestJobSkeleton";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

async function LatestJobsRoot() {
  const newJobPromise = GetJobs({ query: {} });

  return (
    <div className="bg-[#F8F8FD]">
      <Container className=" py-8 md:py-10 lg:py-18 relative overflow-x-hidden">
        <SectionTitle
          title="Latest jobs"
          link="/jobs"
          linkText="Show all jobs"
        />

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5 md:py-8 lg:py-10 z-20">
              <LatestJobSkeleton />
              <LatestJobSkeleton />
              <LatestJobSkeleton />
              <LatestJobSkeleton />
            </div>
          }
        >
          <LatestJobs jobPromise={newJobPromise} />
        </Suspense>

        <Image
          src={pattern}
          alt="Pattern"
          className="h-full w-auto absolute top-0 right-0 md:-right-10 lg:-right-20 z-0"
          placeholder='blur' blurDataURL={'/blurImage.jpg'}
        />
      </Container>
    </div>
  );
}

const LatestJobs = async ({
  jobPromise,
}: {
  jobPromise: Promise<{ data: { data: Job[] } }>;
}) => {
  const jobs = await jobPromise;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5 md:py-8 lg:py-12 z-20">
      {jobs?.data?.data?.map((job) => {
        const {
          _id,
          thumbnailIcon,
          job_type,
          title,
          company,
          category,
          division,
        } = job;

        const { title: categoryTitle, className } =
          jobsCategories.find((cat) => cat.title.toUpperCase() == category) || {};

          
        return (
          <Link href={`/jobs/${_id}`} key={job?._id}>
            <div className="bg-white relative z-10 flex flex-row items-center gap-x-5 px-6 py-4 duration-200">
              {/* Logo */}
              <div className="h-14 w-14 relative shrink-0">
                <Image
                  src={thumbnailIcon}
                  alt={"Company image"}
                  fill
                  className="object-contain rounded-full"
                  placeholder='blur' blurDataURL={'/blurImage.jpg'}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-y-1 flex-1">
                <h3 className=" font-semibold text-base text-neutral">
                  {title}
                </h3>
                <p className=" text-sm text-neutral/80">
                  {company} &nbsp;·&nbsp; {division}
                </p>

                {/* Tags row */}
                <div className="flex flex-row items-center gap-x-2 mt-1">
                  {/* Job type pill — no border, soft bg */}
                  <span className=" font-medium text-xs text-teal-500 border border-teal-100 px-3 py-1 rounded-full">
                    {job_type}
                  </span>

                  {/* Divider */}
                  <span className="h-4 w-px bg-gray-200" />

                  {/* Extra tags */}
                  <span
                    className={`text-xs font-medium  px-3 py-1 rounded-full ${className}`}
                  >
                    {categoryTitle}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LatestJobsRoot;
