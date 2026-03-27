"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import JobForm from "@/app/admin/_components/JobForm/JobForm";



function PostJob() {

    return (
        <>

            <Dialog>
                <DialogTrigger asChild className=''>
                    <Button className='bg-primary-color  text-white hover:bg-primary/90 hover:text-white rounded-none cursor-pointer '>
                        <Plus />
                        Post New Job
                    </Button>
                </DialogTrigger>


                <DialogContent className='max-h-screen overflow-y-auto lg:min-w-180 mx-auto z-50 rounded-none'>
                    <DialogHeader>
                        <DialogTitle className="font-medium ">Post Job</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>

                    <JobForm />

                </DialogContent>

            </Dialog>

        </>
    )
}

export default PostJob