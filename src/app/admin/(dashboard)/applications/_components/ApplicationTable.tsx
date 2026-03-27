import { IMeta, JobApplication } from '../../../../types/job';
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
import emptyDataImg from '../../../../public/empty_data.jpg'
import SearchParamsPagination from '@/components/Jobs/SearchParamsPagination';

async function ApplicationTable({ applicationPromise, page }: { applicationPromise: Promise<{ data: { data: JobApplication[], meta: IMeta } }>, page: number }) {

    const applications = await applicationPromise;

    return (
        <div className="pb-8 pt-5">
            <Table className="font-epilogue">
                <TableHeader className="bg-primary/5 font-epilogue ">
                    <TableRow className="border border-stroke">
                        <TableHead className="p-5 font-medium font-epilogue">Job Title</TableHead>
                        <TableHead className="font-medium font-epilogue">Name</TableHead>
                        <TableHead className="font-medium font-epilogue">Email</TableHead>
                        <TableHead className="font-medium font-epilogue">Resume Link</TableHead>
                        <TableHead className="font-medium font-epilogue">AppliedAt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border border-stroke">
                    {applications?.data?.data.map((application) => (

                        <TableRow key={application?.id}>

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
                    <Image src={emptyDataImg} className='h-28 w-auto mx-auto' alt='empty data' />
                    <h5 className='text-base font-epilogue text-center'>No Job posted yet</h5>
                </section>
            }

            {applications?.data?.meta?.total > 0 && <div className="mt-3">
                <SearchParamsPagination totalData={applications?.data?.meta?.totalPage || 1} activePage={Number(page) || 1} />
            </div>}

        </div >
    )
}

export default ApplicationTable