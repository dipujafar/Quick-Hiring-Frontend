"use client"
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { DeleteJob } from '@/lib/actions/post.action';


function DeleteAJob({ jobId }: { jobId: string }) {
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const handleDlt = async (jobId: string) => {
        setLoading(true)
        try {
            const res = await DeleteJob({ endPoint: `/jobs/${jobId}`, payload: JSON.stringify({}) });

            if (res?.redirect) {
                router.replace("/admin/auth/login");
                toast.error("Session expired. Please log in again.");
                return;
            } else if (res.error) {
                toast.error(res.error)
                return;
            }

            toast.success("Job successfully deleted");
            setOpen(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <button className='w-full text-left hover:bg-zinc-100 duration-150 flex flex-row gap-x-2 items-center px-2 py-1.5 rounded '>
                        <Trash2 className='text-red-500 size-4' />
                        <span className='text-sm'>Delete</span>
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent className=''>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Job Posting?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This job posting will be permanently removed and will no longer be visible to applicants.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <button
                            onClick={() => handleDlt(jobId)}
                            disabled={isLoading}
                            className='disabled:cursor-not-allowed flex flex-row gap-x-2 items-center bg-primary-color  hover:bg-primary/80 duration-150 text-white px-4 py-2 rounded-md text-sm font-medium'
                        >
                            {isLoading && <ImSpinner2 className="text-base text-white animate-spin" />}
                            <span>{isLoading ? 'Loading...' : "Continue"}</span>
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteAJob