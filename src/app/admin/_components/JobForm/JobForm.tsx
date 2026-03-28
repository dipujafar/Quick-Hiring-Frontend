/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImageIcon, X } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Job } from "@/types";
import { postNewJob, updateJob } from "@/lib/actions/post.action";
import { categories, divisions, educations } from "@/utils/data";
import AnimatedArrow from "@/components/animation/AnimatedArrow";
import { EMPTY_DEFAULTS, FieldType, jobSchema } from "./schema";
import { getFirstErrorMessage } from "@/utils/modifyFormError";

const inputClass =
  "bg-gray-100 py-5 rounded-none border-0 border-b border-gray-300 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary-color transition-all duration-200 placeholder:text-gray-400";
const textareaClass =
  "bg-gray-100 rounded-none border-0 border-b border-gray-300 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary-color transition-all duration-200 placeholder:text-gray-400 resize-none";
const selectTriggerClass =
  "w-full bg-gray-100 py-5 h-auto rounded-none border-0 border-b border-gray-300 focus:ring-0 focus:border-b-2 focus:border-primary-color transition-all duration-200";

export default function JobForm({ defaultData }: { defaultData?: Job }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FieldType>({
    resolver: zodResolver(jobSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting: isLoading },
  } = form;

  // ── file pick ──
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("thumbnailIcon", file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
  };

  const clearFile = () => {
    setValue("thumbnailIcon", undefined as any, { shouldValidate: true });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── submit ──
  const onSubmit: SubmitHandler<FieldType> = async (data) => {
    try {
      const { thumbnailIcon, ...rest } = data;

      const formData = new FormData();
      formData.append("thumbnailIcon", thumbnailIcon);
      formData.append("data", JSON.stringify(rest));

      if (defaultData) {
        const res = await updateJob({
          endPoint: `/jobs/${defaultData?._id}`,
          payload: formData as any,
        });
      
        if (res?.redirect) {
          router.push("/admin/auth/login");
          toast.error("Session expired. Please log in again.");
          return;
        }
        if (res?.error) {
          toast.error(res.error);
          return;
        }
        router.refresh(); 
      } else {
        const res = await postNewJob({ payload: formData as any });
        if (res?.redirect) {
          router.push("/admin/auth/login");
          toast.error("Session expired. Please log in again.");
          return;
        }

        if (res?.error) {
          toast.error(res.error);
          return;
        }
        router.refresh(); 

      }

      toast.success(`Job ${defaultData ? "updated" : "posted"} successfully!`);

      if (!defaultData) {
        reset(EMPTY_DEFAULTS as any);
        setPreview(null);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again");
    }
  };

  const onError = (errors: any) => {
    const firstErrorMessage = getFirstErrorMessage(errors);
    toast.error(firstErrorMessage);
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* ── Thumbnail Upload (top-center) ── */}
        <FormField
          control={control}
          name="thumbnailIcon"
          render={({ fieldState }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="text-sm font-medium text-foreground mb-2">
                Thumbnail Icon
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative w-36 h-36 rounded-2xl border-2 border-dashed cursor-pointer
                  flex flex-col items-center justify-center gap-2
                  transition-colors duration-200 overflow-hidden group
                  ${fieldState.error
                    ? "border-gray-500 bg-gray-50"
                    : "border-border hover:border-primary/60 bg-muted/30 hover:bg-muted/50"
                  }
                `}
              >
                {preview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      className="absolute top-1.5 right-1.5 bg-black/60 rounded-full p-0.5 text-white hover:bg-black transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </>
                ) : (
                  <>
                    <ImageIcon
                      size={28}
                      className={`transition-colors ${fieldState.error ? "text-gray-400" : "text-muted-foreground group-hover:text-primary/70"}`}
                    />
                    <span className="text-xs text-muted-foreground text-center px-2 leading-tight">
                      Click to upload image
                    </span>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        {/* ── Job Title ── */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Job Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  placeholder="Write short title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ── Category & Company ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={inputClass}
                    placeholder="Enter company name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ── Job Type & Employment Type ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={control}
            name="job_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Job Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Onsite", "Remote"].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="employment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Employment Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Employment Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Fulltime", "Parttime"].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ── Education & Gender ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Education <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educations.map((edu) => (
                      <SelectItem key={edu.value} value={edu.value}>
                        {edu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gender <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Male", "Female", "Both"].map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ── Salary ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={control}
            name="salaryMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Min Salary <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={inputClass}
                    placeholder="Enter min salary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="salaryMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Max Salary <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={inputClass}
                    placeholder="Enter max salary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ── Division & Street ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={control}
            name="division"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Division / State <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Division/State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {divisions.map((div) => (
                      <SelectItem key={div.name} value={div.name}>
                        {div.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Street Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={inputClass}
                    placeholder="Enter street address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ── Experience & Deadline ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Minimum Experience (years){" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={inputClass}
                    type="number"
                    step="0.5"
                    placeholder="Enter experience"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Application Deadline <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={inputClass}
                    placeholder="Enter deadline"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ── Description ── */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Job Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className={textareaClass}
                  rows={5}
                  placeholder="Write description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ── Requirements ── */}
        <FormField
          control={control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Job Requirements <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className={textareaClass}
                  rows={5}
                  placeholder="Write requirements..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ── Responsibilities ── */}
        <FormField
          control={control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Job Responsibilities <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className={textareaClass}
                  rows={5}
                  placeholder="Write responsibilities..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ── Benefits ── */}
        <FormField
          control={control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Benefits <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className={textareaClass}
                  rows={5}
                  placeholder="Write benefits..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ── Submit ── */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 group py-5 rounded-none"
        >
          {isLoading && <ImSpinner2 className="mr-2 animate-spin" />}
          {isLoading
            ? "Submitting..."
            : defaultData
              ? "Update Job"
              : "Post Job"}
          <AnimatedArrow />
        </Button>
      </form>
    </Form>
  );
}
