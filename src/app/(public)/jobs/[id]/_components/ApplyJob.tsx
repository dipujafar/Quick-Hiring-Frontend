"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ApplyJobForm from "./ApplyJobForm/ApplyJobForm";


function ApplyJob() {

    return (
        <>

            <Dialog>


                <DialogTrigger asChild className=''>
                    <button className='cursor-pointer text-white border-0 hover:bg-primary/80 duration-150 bg-primary-color px-5 py-3  font-bold'>
                        Apply Now
                    </button>
                </DialogTrigger>


                <DialogContent className='max-h-screen overflow-y-auto lg:min-w-125 mx-auto z-50 rounded'>
                    <DialogHeader>
                        <DialogTitle className="font-medium ">Apply Job</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>

                    <ApplyJobForm />

                </DialogContent>

            </Dialog>

        </>
    )
}
export default ApplyJob;

