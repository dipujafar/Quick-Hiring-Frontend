"use client";
import { fadeUpVariants } from "@/components/animation/motionVariant";
import CCountUp from "@/components/shared/CCountUp";
import { motion } from "motion/react";
import type { Variants } from "motion";
import { TextAnimation } from "@/components/animation/TextAnimation";
import lineImage from "@/assets/images/header/line.png"
import Image from "next/image";
import JobSearchBar from "@/components/shared/JobSearchBar";
import { usePathname } from "next/navigation";

export default function HeaderContent() {
    const pathname = usePathname();

    return (
        <motion.div key={pathname}
            variants={fadeUpVariants() as Variants}
            initial="initial"
            animate="animate"
            className=" relative space-y-6 z-10 ">
            <div>
                <TextAnimation text="Discover" className="xl:text-7xl md:text-6xl text-5xl font-medium font-clash text-primary-black " />
                <TextAnimation initialDelay={0.4} text="more than" className="xl:text-7xl md:text-6xl text-5xl font-medium font-clash text-primary-black " />
                <motion.p key="hero-title"
                    variants={fadeUpVariants(0.4) as Variants}>
                    <div className="flex gap-x-2 xl:text-7xl md:text-6xl text-5xl font-medium font-clash text-secondary-color">
                        <CCountUp start={0} end={5000} duration={4} className="xl:text-7xl md:text-6xl text-5xl font-medium font-clash " /> +
                        <span>Jobs</span>
                    </div>
                    <Image src={lineImage} alt="line"  placeholder='blur' blurDataURL={'/blurImage.jpg'}/>
                </motion.p>
            </div>
            <motion.p key="hero-description"
                variants={fadeUpVariants(0.6) as Variants}
                className="text-primary-gray md:text-xl text-lg  max-w-lg"
            >
                Great platform for the job seeker that searching for new career heights and passionate about startups.
            </motion.p>
            <motion.div key="hero-search-bar"
                variants={fadeUpVariants(0.8) as Variants}
            >
                <JobSearchBar />
            </motion.div>

        </motion.div>
    )
}
