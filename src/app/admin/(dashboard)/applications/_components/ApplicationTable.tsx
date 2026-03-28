import moment from "moment"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import emptyDataImg from '@/assets/images/empty_data.jpg'
import { IMeta, JobApplication } from "@/types";
import SearchParamsPagination from "@/components/shared/SearchParamsPagination";

async function ApplicationTable({ applicationPromise, page }: { applicationPromise: Promise<{ data: { data: JobApplication[], meta: IMeta } }>, page: number }) {

    const applications = await applicationPromise;

    return (
        <div className="pb-8 pt-5">
            <Table className="">
                <TableHeader className="bg-primary/5  ">
                    <TableRow className="border border-stroke">
                        <TableHead className="p-5 font-medium ">Job Title</TableHead>
                        <TableHead className="font-medium ">Name</TableHead>
                        <TableHead className="font-medium ">Email</TableHead>
                        <TableHead className="font-medium ">Resume Link</TableHead>
                        <TableHead className="font-medium ">AppliedAt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border border-stroke">
                    {applications?.data?.data.map((application) => (

                        <TableRow key={application?._id}>

                            <TableCell>
                                {application?.job?.title ?? "N/A"}
                            </TableCell>

                            <TableCell className='py-4'>{application?.name}</TableCell>

                            <TableCell>
                                {application?.email}
                            </TableCell>

                            <TableCell>{application?.resumeUrl}</TableCell>
                            <TableCell>{moment(application?.createdAt).format("DD/MM/YY h:mm a") ?? "N/A"}</TableCell>



                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            {
                applications?.data?.meta?.total <= 0 && <section className='min-h-60 flex flex-col items-center justify-center'>
                    <Image src={emptyDataImg} className='h-28 w-auto mx-auto' alt='empty data' placeholder='blur' blurDataURL={'/blurImage.jpg'} />
                    <h5 className='text-base  text-center'>No Job posted yet</h5>
                </section>
            }

            {applications?.data?.meta?.total > 0 && <div className="mt-3">
                <SearchParamsPagination totalData={applications?.data?.meta?.totalPage || 1} activePage={Number(page) || 1} />
            </div>}

        </div >
    )
}

export default ApplicationTable