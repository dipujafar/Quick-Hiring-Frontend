"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import JobForm from '../../../_components/JobForm/JobForm';
import { SquarePen } from "lucide-react";
import { Job } from "@/types";


function EditJob({ defaultData }: { defaultData: Job }) {

    return (
        <>
            <Dialog>
                <DialogTrigger asChild className=''>
                    <button className='w-full text-left hover:bg-zinc-100 duration-150 flex flex-row gap-x-2 items-center px-2 py-1.5 rounded '>
                        <SquarePen className='text-black size-4' />
                        <span className="text-sm">Edit</span>
                    </button>
                </DialogTrigger>

                <DialogContent className='max-h-screen overflow-y-auto lg:min-w-180 mx-auto z-50 rounded'>
                    <DialogHeader>
                        <DialogTitle className="font-medium ">Edit Job</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <JobForm defaultData={defaultData} />

                </DialogContent>

            </Dialog>

        </>
    )
}

export default EditJob;