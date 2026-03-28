import Image from 'next/image'
import { CiLocationOn } from "react-icons/ci";
import { notFound } from 'next/navigation';
import ApplyJob from './ApplyJob';
import moment from 'moment';
import { Job } from '@/types';
import Container from '@/components/shared/Container';

async function JobDetails({ jobPromise }: { jobPromise: Promise<{ data: Job }> }) {

  const job = await jobPromise;

  if (!job?.data) {
    return notFound();
  }

  const summeryRows = [
    { label: "Job Type", value: (job: Job) => job?.job_type ?? "N/A" },
    { label: "Category", value: (job: Job) => job?.category },
    { label: "Salary", value: (job: Job) => job?.salaryMin ?? "N/A" },
    { label: "Experience", value: (job: Job) => job?.experience ?? "N/A" },
    { label: "Gender", value: (job: Job) => job?.gender ?? "N/A" },
    { label: "Education", value: (job: Job) => job?.education ?? "N/A" },
    { label: "Posted", value: (job: Job) => { return moment(job?.createdAt).format("DD/MM/YY h:mm a") } },
    { label: "Application End", value: (job: Job) => job?.deadline ?? "N/A" },
  ];

  return (
    <Container>
      {/* -----------header--------- */}
      <div className='p-10 bg-[#F8F8FD] my-10 rounded-2xl'>
        <div className='flex flex-col md:flex-row gap-5 justify-between items-center'>

          <div className='flex flex-col md:flex-row justify-center md:justify-start gap-8 items-center'>
            <Image src={job?.data?.thumbnailIcon} alt='Company Logo' height={1000} width={1000} className='h-28 w-auto rounded-lg' placeholder='blur' blurDataURL={'/blurImage.jpg'} />
            <div className='space-y-2 md:text-left text-center'>
              <h3 className='font-clash font-semibold text-2xl text-neutral'>{job?.data?.title}</h3>
              <p className='text-primary-color text-lg  font-medium'>{job?.data?.company}</p>
              <div className='flex flex-row gap-x-5 items-center'>
                <div className='flex flex-row gap-x-0.5 items-center text-neutral/80'>
                  <CiLocationOn />
                  <p className=''>{job?.data?.street ?? job?.data?.division}</p>
                </div>
              </div>
            </div>
          </div>

          <ApplyJob />

        </div>
      </div>

      <div className='grid grid-cols-3 gap-5 pb-20'>
        <div className='col-span-3 lg:col-span-2'>

          <div className='my-8'>
            <h3 className='text-2xl font-clash font-medium mb-3 text-neutral'>Description : </h3>
            <pre className='text-sm text-neutral/80 font-normal '>{job?.data?.description}</pre>
          </div>

          <div className='my-8'>
            <h3 className='text-2xl font-clash font-medium mb-3 text-neutral'>Responsibilities : </h3>
            <pre className='text-sm text-neutral/80 font-normal '>{job?.data?.responsibilities}</pre>
          </div>

          <div className='my-8'>
            <h3 className='text-2xl font-clash font-medium mb-3 text-neutral'>Requirements : </h3>
            <pre className='text-sm text-neutral/80 font-normal '>{job?.data?.requirements}</pre>
          </div>

          <div className='my-8'>
            <h3 className='text-2xl font-clash font-medium mb-3 text-neutral'>Benefits : </h3>
            <pre className='text-sm text-neutral/80 font-normal '>{job?.data?.benefits}</pre>
          </div>

          <ApplyJob />

        </div>

        <section className="rounded-lg self-start col-span-3 lg:col-span-1 bg-[#F8F8FD] p-8 inline">
          <table className="table-auto w-full">
            <tbody>
              {summeryRows.map((row, index) => (
                <tr
                  key={index}
                  className="py-3"
                >
                  <td className="text-sm font-medium text-neutral min-w-24 ">
                    {row.label}
                  </td>
                  <td className="min-w-1 pr-4">
                    :
                  </td>

                  <td className="text-sm font-medium text-neutral/80  py-3">
                    {row.value(job?.data) ?? "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </Container>
  )
}

export default JobDetails