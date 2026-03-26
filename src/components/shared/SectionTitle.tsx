import Link from "next/link";
import AnimatedArrow from "../animation/AnimatedArrow";

type TProps = {
    title: string;
    linkText?: string;
    link?: string
}
export default function SectionTitle({ title, linkText, link }: TProps) {
    return (
        <div className="flex-between items-center border border-red-400 flex-wrap">
            <h2 className="md:text-5xl text-[32px] font-semibold font-clash text-primary-black">{title?.split(" ")[0]} <span className="text-secondary-color">{title?.split(" ")?.slice(1)?.join(" ")}</span></h2>

            {link && linkText && <div className="flex gap-x-3 text-primary-color font-semibold group">
                <Link href={link}>{linkText}</Link>
                <AnimatedArrow />
            </div>}

        </div>
    )
}
