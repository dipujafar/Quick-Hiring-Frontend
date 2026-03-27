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
import JobForm from './JobForm';


function PostJob() {

    return (
        <>

            <Dialog>


                <DialogTrigger asChild className=''>
                    <Button className='bg-primary text-white hover:bg-primary/90 hover:text-white font-epilogue'>
                        <Plus />
                        Post New Job
                    </Button>
                </DialogTrigger>


                <DialogContent className='max-h-screen overflow-y-auto lg:min-w-[600px] mx-auto z-50 rounded'>
                    <DialogHeader>
                        <DialogTitle className="font-medium font-epilogue">Post New Job</DialogTitle>
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