import PageTop from "@/components/shared/PageTop";
import DetailSkeleton from "./_components/DetailSkeleton";
import JobDetails from "./_components/JobDetails";
import GetJobDetails from "@/lib/actions/jobDetails";
import { Job } from "@/types";
import Link from "next/link";
import { Suspense } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { TextTruncate } from "@/components/ui/text-truncate";
import { envConfig } from "@/config";
import Navbar from "@/components/shared/Navbar/Navbar";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = (await GetJobDetails({ id })) as { data: Job };

  return {
    title: `${data?.title} at ${data?.company}`,
    description: TextTruncate(data?.description, 155),
    metadataBase: new URL(envConfig.clientBaseApi as string),

    openGraph: {
      title: TextTruncate(`${data?.title} at ${data?.company}`, 60),
      description: TextTruncate(data?.description, 155),
      url: `/jobs/${data?._id}`,
      siteName: "QuickHire",
      type: "website",
      creator: "QuickHire",
      publisher: "QuickHire",
    },
    twitter: {
      title: TextTruncate(`${data?.title} at ${data?.company}`, 60),
      description: TextTruncate(data?.description, 155),
      card: "summary_large_image",
      creator: "@quickhire",
    },
  };
}

async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobPromise = GetJobDetails({ id });

  return (
    <div>
      <Navbar />
      <PageTop title="Job Details">
        <h3 className="text-xs md:text-sm font-clash text-gray-100 flex flex-row gap-x-1.5 justify-center items-center">
          <Link href="/" className="">
            Home
          </Link>{" "}
          <IoIosArrowForward className="" />{" "}
          <Link href="/jobs" className="">
            Jobs
          </Link>{" "}
          <IoIosArrowForward className="" /> <p className="">Jobs Details</p>
        </h3>
      </PageTop>

      <Suspense fallback={<DetailSkeleton />}>
        <JobDetails jobPromise={jobPromise} />
      </Suspense>
    </div>
  );
}

export default JobDetailsPage;
