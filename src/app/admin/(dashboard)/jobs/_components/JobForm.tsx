"use client"
import { SubmitHandler, useForm } from 'react-hook-form'
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SelectWithSearch } from '@/components/ui/SelectWithSearch';
import { categories, divisions, educations } from '@/utils/config';
import MultipleSelect from '@/components/ui/MultiSelect';
import { useAllcompaniesQuery } from '@/redux/api/baseApi';
import { Job } from '@/types';
import { postNewJob } from '@/lib/actions/post.action';

type FieldType = {
    title: string,
    description: string,
    category: string,
    companyId: string,
    employment_type: string,
    job_type: string,

    gender: string[],
    education: string[],

    salaryMin: string | null,
    salaryMax: string | null,

    division: string,
    street: string,

    deadline: string,
    experience: string,

    requirements: string,
    responsibilities: string,
    benefits: string
}

function JobForm({ defaultData }: { defaultData?: Job }) {

    const { isLoading: companyLoading, isSuccess, data } = useAllcompaniesQuery();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting: isLoading },
    } = useForm<FieldType>({
        defaultValues: defaultData
    });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {

            if (defaultData) {
                const updatedRes = await updateJob({ endPoint: `/jobs/${defaultData?.id}`, payload: JSON.stringify(data) });
                if (updatedRes?.redirect) {
                    router.push("/admin/auth/login");
                    toast.error("Session expired. Please log in again.");
                    return;
                } else if (updatedRes.error) {
                    toast.error(updatedRes.error)
                    return;
                }

            } else {
                const postedRes = await postNewJob({
                    payload: JSON.stringify(data),
                });

                if (postedRes?.redirect) {
                    router.push("/admin/auth/login");
                    toast.error("Session expired. Please log in again.");
                    return;
                } else if (postedRes.error) {
                    toast.error(postedRes.error)
                    return;
                }
            }

            toast.success(`Job ${defaultData ? "updated" : "posted"} successfully!`);

            if (defaultData) {
                return;
            }

            reset({
                title: "",
                "description": "",
                category: "SALES",
                companyId: "",
                employment_type: "",
                job_type: "",

                gender: [],
                education: [],

                salaryMin: null,
                salaryMax: null,

                division: "",
                street: "",

                deadline: "",
                experience: "",

                requirements: "",
                responsibilities: "",
                benefits: ""

            });

        } catch (err: any) {
            console.log(err)
            toast.error(err?.data?.message || 'Something went wrong, try again')
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit(handleFormSubmit)}>

                {/* ----------title------------ */}
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='title' className="mb-1.5 block text-black dark:text-white font-epilogue">
                        Job Title
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        id='title'
                        {...register("title", { required: "Title is required" })}
                        placeholder="Write short title"
                        className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.title ? 'border-red-500' : ' border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.title && <p className="text-red-500 text-sm font-epilogue col-span-2">{errors?.title?.message}</p>}
                </div>

                {/* -----------category & company row--------- */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='Category' className="mb-1.5 block text-black dark:text-white font-epilogue text-base">
                            Category
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='category'
                            items={categories}
                            control={control}
                            errors={errors}
                            placeholder='Select Category'
                            validationRules={{
                                required: "Select category",
                            }}
                        />
                        {errors?.category && <p className="text-red-500 text-sm col-span-2 font-epilogue">{errors?.category?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='Company' className="mb-1.5 block text-black dark:text-white font-epilogue text-base">
                            Company
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='companyId'
                            items={isSuccess ? data?.data?.map(company => ({ label: company?.name, value: company?.id })) : []}
                            control={control}
                            errors={errors}
                            isLoading={companyLoading}
                            placeholder='Select Company'
                            validationRules={{
                                required: "Select company",
                            }}
                        />
                        {errors?.companyId && <p className="text-red-500 text-sm col-span-2 font-epilogue">{errors?.companyId?.message}</p>}
                    </div>

                </div>

                {/* ---------job type & employment type row----------- */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='job_type' className="mb-1.5 block text-black dark:text-white font-epilogue text-base">
                            Job type
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='job_type'
                            items={["Onsite", "Remote"].map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select Job type'
                            validationRules={{
                                required: "Select job type",
                            }}
                        />
                        {errors?.job_type && <p className="text-red-500 text-sm col-span-2 font-epilogue">{errors?.job_type?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='employment_type' className="mb-1.5 block text-black dark:text-white font-epilogue">
                            Employment type
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <SelectWithSearch
                            name='employment_type'
                            items={["Fulltime", "Parttime"].map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select employment type'
                            validationRules={{
                                required: "Select employment type",
                            }}
                        />
                        {errors?.employment_type && <p className="text-red-500 text-sm col-span-2 font-epilogue">{errors?.employment_type?.message}</p>}
                    </div>
                </div>

                {/* ----------gender education row---------- */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='education' className="mb-1.5 block text-black dark:text-white font-epilogue">
                            Education
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <MultipleSelect
                            name='education'
                            items={educations.map(edu => {
                                return { label: edu?.name, value: edu?.value }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select education'
                            validationRules={{
                                // required: "Select minimum 1 specialization",
                            }}
                        />
                        {errors?.education && <p className="text-red-500 text-sm col-span-2">{errors?.education?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='gender' className="mb-1.5 block text-black dark:text-white font-epilogue text-base">
                            Gender
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>

                        <MultipleSelect
                            name='gender'
                            items={["Male", "Female"].map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select gender'
                            validationRules={{
                                // required: "Select gender",
                            }}
                        />
                        {errors?.gender && <p className="text-red-500 text-sm col-span-2 font-epilogue">{errors?.gender?.message}</p>}
                    </div>

                </div>

                {/* ------------salary row-------------- */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='salaryMin' className="mb-1.5 block text-black dark:text-white font-epilogue">
                            Min Salary
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='salaryMin'
                            {...register("salaryMin",
                                // { required: true }
                                {
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Invalid format",
                                    },
                                    setValueAs: (value) => value === "" ? null : value,
                                }
                            )}
                            placeholder="eg : 20,000"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.salaryMin ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.salaryMin && <p className="text-red-500 text-sm col-span-2">{errors?.salaryMin?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='salaryMax' className="mb-1.5 block text-black dark:text-white font-epilogue">
                            Max Salary
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='salaryMax'
                            {...register("salaryMax",
                                // { required: true }
                                {
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Invalid format",
                                    },
                                    setValueAs: (value) => value === "" ? null : value,
                                }
                            )}
                            placeholder="eg : 20,000"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.salaryMax ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.salaryMax && <p className="text-red-500 text-sm col-span-2">{errors?.salaryMax?.message}</p>}
                    </div>
                </div>

                {/* -----------address row------------ */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='division' className="mb-1.5 block text-black dark:text-white font-epilogue">
                            Division/State
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <SelectWithSearch
                            name='division'
                            items={divisions.map(div => {
                                return { label: div?.name, value: div?.name }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select division/state'
                            validationRules={{
                                required: "Select division/state",
                            }}
                        />
                        {errors?.division && <p className="text-red-500 text-sm col-span-2 font-serif">{errors?.division?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='street' className="mb-1.5 block text-black dark:text-white font-epilogue">
                            Street Address
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            id='street'
                            {...register("street",
                                { required: "Street address required" }
                            )}
                            placeholder="eg : Nikunja-2, Dhaka"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.street ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.street && <p className="text-red-500 text-sm col-span-2">{errors?.street?.message}</p>}
                    </div>
                </div>

                {/* -----------experience row---------- */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='experience' className="mb-1.5 block text-black dark:text-white font-epilogue">
                            Minimum Experience
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number" step="0.01"
                            id='experience'
                            {...register("experience", {
                                // required: true,
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid year format",
                                },
                            })}
                            placeholder="eg : 1.5"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.experience ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.experience && <p className="text-red-500 text-sm col-span-2">{errors?.experience?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='dedline' className="mb-1.5 block text-black dark:text-white font-epilogue text-base">
                            Application Dedline
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>

                        <input
                            type="text"
                            id='dedline'
                            {...register("deadline",
                                // { required: true }
                            )}
                            placeholder="eg : 20 November 2025"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.deadline ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.deadline && <p className="text-red-500 text-sm col-span-2 font-epilogue">{errors?.deadline?.message}</p>}
                    </div>

                </div>

                {/* --------job description--------- */}
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='description' className="mb-1.5 block text-black font-epilogue">
                        Job Description
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <textarea
                        rows={5}
                        id='description'
                        {...register("description", {
                            required: true,
                        })}
                        placeholder="Write description"
                        className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.description ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.description && <p className="text-red-500 text-sm col-span-2">{errors?.description?.message}</p>}
                </div>

                {/* ---------requirements-------- */}
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='requirements' className="mb-1.5 block text-black font-epilogue">
                        Job Requirements
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <textarea
                        rows={5}
                        id='requirements'
                        {...register("requirements", {
                            required: true,
                        })}
                        placeholder="Write requirements"
                        className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.requirements ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.requirements && <p className="text-red-500 text-sm col-span-2">{errors?.requirements?.message}</p>}
                </div>

                {/* ---------Responsibilities-------- */}
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='responsibilities' className="mb-1.5 block text-black font-epilogue">
                        Job Responsibilities
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <textarea
                        rows={5}
                        id='responsibilities'
                        {...register("responsibilities", {
                            required: true,
                        })}
                        placeholder="Write responsibilities"
                        className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.responsibilities ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.responsibilities && <p className="text-red-500 text-sm col-span-2">{errors?.responsibilities?.message}</p>}
                </div>

                {/* ---------Benifits-------- */}
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='benefits' className="mb-1.5 block text-black font-epilogue">
                        Benifits
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <textarea
                        rows={5}
                        id='benefits'
                        {...register("benefits", {
                            required: true,
                        })}
                        placeholder="Write benefits"
                        className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-epilogue placeholder:font-epilogue ${errors?.benefits ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.benefits && <p className="text-red-500 text-sm col-span-2">{errors?.benefits?.message}</p>}
                </div>

                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-epilogue rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? 'Loading...' : "Submit"}</span>
                </button>

            </form>
        </div>
    )
}

export default JobForm