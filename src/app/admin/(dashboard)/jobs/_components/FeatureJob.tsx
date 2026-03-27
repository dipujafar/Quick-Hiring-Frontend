"use client"
import { jobFeature } from '@/lib/actions/featureJob.action';
import { tags } from '@/lib/tags';
import { useRouter } from 'next/navigation';
import { FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

function FeatureJob({ jobId }: { jobId: string }) {

    const router = useRouter();

    const handleFeature = async (jobId: string) => {
        const loading = toast.loading("Loading...")
        try {
            // await addFeature({ addId }).unwrap();
            const featuredRes = await jobFeature({ endPoint: `/jobs/feature/${jobId}`, payload: JSON.stringify({}), tags: [tags.featureJobs] });

            if (featuredRes?.redirect) {
                router.replace("/admin/auth/login");
                toast.error("Session expired. Please log in again.");
                return;
            } else if (featuredRes.error) {
                toast.error(featuredRes.error)
                return;
            }

            toast.success("Job successfully featured");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        } finally {
            toast.dismiss(loading)
        }
    }

    return (
        <button onClick={() => handleFeature(jobId)} className='w-full text-left hover:bg-zinc-100 duration-150 flex flex-row gap-x-2 items-center px-2 py-1.5 rounded '>
            <FaRegStar className='text-black' />
            <span className='text-sm'>Feature</span>
        </button>
    )
}

export default FeatureJob