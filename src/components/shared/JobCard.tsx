import { Job, TCategory } from '@/types';
import { jobsCategories } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';

function JobCard({ job }: { job: Job }) {

    const {
        _id,
        thumbnailIcon,
        job_type,
        title,
        company,
        description,
        category,
        division,
    } = job;

 const { title: categoryTitle, className } = jobsCategories.find((cat) => cat.title === category) || {};
    return (
        <Link href={`/jobs/${_id}`}>
            <div className="bg-white border border-neutral/20 p-6 space-y-4 hover:shadow-lg duration-200">

                {/* Top row: logo + job type */}
                <div className="flex justify-between items-start">
                    <div className="h-10 w-10 relative ">
                        <Image src={thumbnailIcon} alt={"Company image"} fill className="object-contain rounded-full" placeholder='blur' blurDataURL={'/blurImage.jpg'} />
                    </div>
                    <span className="text-sm font-normal text-primary-color border border-primary-color px-3 py-1 ">
                        {job_type}
                    </span>
                </div>

                {/* Title + company + location */}
                <div className="space-y-1">
                    <h3 className=" font-semibold text-lg text-gray-900">{title}</h3>
                    <p className=" text-sm text-neutral/80">
                        {company} &nbsp;·&nbsp; {division}
                    </p>
                </div>

                {/* Description */}
                <p className=" text-sm text-neutral/80 leading-relaxed line-clamp-2">
                    {description}
                </p>

                {/* Tags */}
                <span className={`text-xs font-medium  px-3 py-1 rounded-full ${className}`}>
                    {categoryTitle}
                </span>
                {/* <div className="flex flex-wrap gap-2">
                {categories.map((tag) => (
                    <span
                        key={tag}
                        className={`text-xs font-medium  px-3 py-1 rounded-full ${categoryTagStyles[tag]}`}
                    >
                        {tag}
                    </span>
                ))}
            </div> */}
            </div>
        </Link>
    )
}

export default JobCard