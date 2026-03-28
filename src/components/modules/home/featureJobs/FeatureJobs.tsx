
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { Suspense } from "react"
import LoadingJobCard from "@/app/(public)/jobs/_components/LoadingJobCard"
import { Job } from "@/types"
import JobCard from "@/components/shared/JobCard"
import GetFeatureJobs from "@/lib/actions/featureJob.action"
import FeatureJobCarousel from "./FeatureJobCarousel"
import SectionTitle from "@/components/shared/SectionTitle"
import Container from "@/components/shared/Container"


async function FeatureJobs() {

    const featureJobPromise = GetFeatureJobs();

    return (
        <Container className=' py-8 md:py-10 lg:py-18'>
            <SectionTitle title="Featured jobs" link="/jobs" linkText="Show all jobs" />
            <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5 md:py-8 lg:py-10">
                <LoadingJobCard />
                <LoadingJobCard />
                <LoadingJobCard />
                <LoadingJobCard />
            </div>}>
                <Jobs jobPromise={featureJobPromise} />
            </Suspense>

        </Container>
    )
}

export default FeatureJobs;


const Jobs = async ({ jobPromise }: { jobPromise: Promise<{ data: Job[] }> }) => {
    const jobs = await jobPromise;
    return <div>
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-5 py-5 md:py-8 lg:py-12">
            {
                jobs?.data?.map(job => {
                    return <JobCard job={job} key={job?._id} />
                })
            }
        </div>
        <div className="md:hidden">
            <FeatureJobCarousel jobs={jobs?.data} />
        </div>
    </div>
}