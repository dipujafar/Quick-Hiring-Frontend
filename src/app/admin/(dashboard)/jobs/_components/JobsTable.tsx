import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import emptyDataImg from '@/assets/images/empty_data.jpg'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import EditJob from "./EditJob";
import FeatureJob from "./FeatureJob";
import DeleteAJob from "./DeleteJob";
import SearchParamsPagination from "@/components/shared/SearchParamsPagination";
import { IMeta, Job } from "@/types";

async function JobsTable({ jobPromise, page }: { jobPromise: Promise<{ data: { data: Job[], meta: IMeta } }>, page: number }) {

    const jobs = await jobPromise;

    return (
        <div className="pb-8">
            <Table className="">
                <TableHeader className="bg-primary/5  ">
                    <TableRow className="border border-stroke">
                        <TableHead className="p-5 font-medium ">Title</TableHead>
                        <TableHead className="font-medium ">Category</TableHead>
                        <TableHead className="font-medium ">Company</TableHead>
                        <TableHead className="font-medium ">Location</TableHead>
                        <TableHead className="font-medium ">Dedline</TableHead>
                        <TableHead className="font-medium ">Status</TableHead>
                        <TableHead className="text-right  p-5">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border border-stroke">
                    {jobs?.data?.data.map((job) => (

                        <TableRow key={job?._id}>

                            <TableCell>
                                {job?.title ?? "N/A"}
                            </TableCell>

                            <TableCell className=''>{job?.category}</TableCell>

                            <TableCell>
                                {job?.company}
                            </TableCell>

                            <TableCell>{job?.division ?? "N/A"}</TableCell>
                            <TableCell>{job?.deadline ?? "N/A"}</TableCell>

                            <TableCell className="font-medium ">

                                <Badge variant={"outline"}>
                                    {job?.status}
                                </Badge>
                            </TableCell>

                            <TableCell className="text-right p-4">

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="outline-none focus:outline-none">
                                        <button className="border border-stroke p-1.5 rounded cursor-pointer hover:bg-slate-100 duration-150">
                                            <HiOutlineDotsVertical className="text-lg" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="z-40 bg-white  min-w-40" align="end" >

                                        <DropdownMenuItem asChild className="hover:bg-zinc-100 duration-150">
                                            <FeatureJob job={job} />
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild className="hover:bg-zinc-100 duration-150 w-full">
                                            <EditJob defaultData={job} />
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild className="hover:bg-zinc-100 duration-150">
                                            <DeleteAJob jobId={job?._id} />
                                        </DropdownMenuItem>
                                        

                                    </DropdownMenuContent>
                                </DropdownMenu>


                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            {
                jobs?.data?.meta?.total <= 0 && <section className='min-h-60 flex flex-col items-center justify-center'>
                    <Image src={emptyDataImg} className='h-28 w-auto mx-auto' alt='empty data' placeholder='blur' blurDataURL={'/blurImage.jpg'} />
                    <h5 className='text-base  text-center'>No Job posted yet</h5>
                </section>
            }

            {jobs?.data?.meta?.total > 0 && <div className="mt-3">
                <SearchParamsPagination totalData={jobs?.data?.meta?.totalPage || 1} activePage={Number(page) || 1} />
            </div>}

        </div >
    )
}

export default JobsTable