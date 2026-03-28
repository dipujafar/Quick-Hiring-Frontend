"use client"
import { Job } from "@/types"
import JobCard from "@/components/shared/JobCard"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselDots
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


function FeatureJobCarousel({ jobs }: { jobs: Job[] }) {
    return (
        <Carousel
            plugins={[
                Autoplay({ delay: 3500 })
            ]}
            opts={{
                align: "start",
                // slidesToScroll: 4
                // loop: true
            }}
            className="w-full py-5 md:py-8 lg:py-10">
            <CarouselContent>
                {jobs.map((job) => (
                    <CarouselItem key={job?._id} className="">
                        <JobCard job={job} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselDots className='mt-5' />
        </Carousel>
    )
}

export default FeatureJobCarousel