"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ApplicationToJob } from "@/lib/actions/application";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";


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

type FieldType = {
    name: string;
    email: string;
    resumeUrl: string
    coverLetter?: string
}
const ApplyJobForm = () => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting: isLoading },
    } = useForm<FieldType>({
        defaultValues: {}
    });

    const params = useParams();

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {
            const res = await ApplicationToJob(JSON.stringify({...data, jobId : params?.id}));

            toast.success(res?.message || 'Application Success');
            reset();

        } catch (err: any) {
            toast.error(err.message || 'Something went wrong, try again');
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>

            {/* ----------name------------ */}
            <div className="w-full mx-auto mb-3">
                <label htmlFor='name' className="mb-1.5 block text-black dark:text-white ">
                    Name
                    <span className="text-red-500 text-base ml-1">*</span>
                </label>
                <input
                    type="text"
                    id='name'
                    {...register("name", { required: "Name is required" })}
                    placeholder="Write Your Name"
                    className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white  placeholder: ${errors?.name ? 'border-red-500' : ' border-strokeinput focus:border-black active:border-black'}`}
                />
                {errors?.name && <p className="text-red-500 text-sm  col-span-2">{errors?.name?.message}</p>}
            </div>

            {/* Email */}
            <div className="w-full mx-auto mb-3">
                <label htmlFor='email' className="mb-1.5 block text-black dark:text-white ">
                    Email
                    <span className="text-red-500 text-base ml-1">*</span>
                </label>
                <input
                    type="text"
                    id='email'
                    {...register("email", {
                        required: "Email is Required",
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid Email"
                        }
                    })}
                    placeholder="Write Email"
                    className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white  placeholder: ${errors?.email ? 'border-red-500' : ' border-strokeinput focus:border-black active:border-black'}`}
                />
                {errors?.email && <p className="text-red-500 text-sm  col-span-2">{errors?.email?.message}</p>}
            </div>

            <div className="w-full mx-auto mb-3">
                <label htmlFor='resume' className="mb-1.5 block text-black dark:text-white ">
                    Resume Link
                    <span className="text-red-500 text-base ml-1">*</span>
                </label>
                <input
                    type="text"
                    id='resume'
                    {...register("resumeUrl", { required: "Resume link is required" })}
                    placeholder="https://.........."
                    className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white  placeholder: ${errors?.resumeUrl ? 'border-red-500' : ' border-strokeinput focus:border-black active:border-black'}`}
                />
                {errors?.resumeUrl && <p className="text-red-500 text-sm  col-span-2">{errors?.resumeUrl?.message}</p>}
            </div>


            <div className="w-full mx-auto mb-3">
                <label htmlFor='cover' className="mb-1.5 block text-black dark:text-white ">
                    Cover Letter
                    {/* <span className="text-red-500 text-base ml-1">*</span> */}
                </label>
                <textarea
                    rows={4}
                    id='cover'
                    {...register("coverLetter")}
                    placeholder="Write something"
                    className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white  placeholder: ${errors?.coverLetter ? 'border-red-500' : ' border-strokeinput focus:border-black active:border-black'}`}
                />
                {errors?.coverLetter && <p className="text-red-500 text-sm  col-span-2">{errors?.coverLetter?.message}</p>}
            </div>

            <button type='submit' disabled={isLoading} className='bg-primary-color py-3  rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                <span>{isLoading ? 'Loading...' : "Submit"}</span>
            </button>


        </form>
    )

}