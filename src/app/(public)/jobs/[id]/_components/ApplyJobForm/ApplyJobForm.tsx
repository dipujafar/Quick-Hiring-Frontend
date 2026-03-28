"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyJobSchema, FieldType } from "./schema";
import { useParams } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { ApplicationToJob } from "@/lib/actions/application";
import AnimatedArrow from "@/components/animation/AnimatedArrow";
import { getFirstErrorMessage } from "@/utils/modifyFormError";

const inputClass =
    "bg-gray-100 py-5 rounded-none border-0 border-b border-gray-300 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary-color transition-all duration-200 placeholder:text-gray-400";

const textareaClass =
    "bg-gray-100 rounded-none border-0 border-b border-gray-300 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary-color transition-all duration-200 placeholder:text-gray-400 resize-none";

const ApplyJobForm = () => {
    const form = useForm<FieldType>({
        resolver: zodResolver(applyJobSchema),
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting: isLoading },
    } = form;

    const params = useParams();

    const onSubmit = async (data: FieldType) => {
        try {
            const res = await ApplicationToJob(
                JSON.stringify({ ...data, jobId: params?.id })
            );

            toast.success(res?.message || "Application Success");
            reset();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message || "Something went wrong, try again");
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = (errors: any) => {
        const firstErrorMessage = getFirstErrorMessage(errors);
        toast.error(firstErrorMessage);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">

                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Write Your Name"
                                    className={inputClass}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Write Email"
                                    className={inputClass}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Resume URL */}
                <FormField
                    control={form.control}
                    name="resumeUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Resume Link <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="https://..."
                                    className={inputClass}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Cover Letter */}
                <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cover Letter</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    rows={6}
                                    placeholder="Write something"
                                    className={textareaClass}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 flex items-center justify-center gap-2 group rounded-none"
                >
                    {isLoading && <ImSpinner2 className="animate-spin" />}
                    {isLoading ? "Loading..." : "Submit"}
                    <AnimatedArrow />
                </Button>
            </form>
        </Form>
    );
};

export default ApplyJobForm;