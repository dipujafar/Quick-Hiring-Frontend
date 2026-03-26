import Image from "next/image"
import dashboard from "@/assets/images/dashboard.png"
import Link from "next/link"
import Container from "@/components/shared/Container"

export default function Dashboard() {
    return (
        <Container className="w-full py-8">
            <div className="bg-primary-color py-20 px-16 relative space-y-3 md:space-y-5 h-125 md:h-auto">
                <h4 className="font-clash font-semibold text-3xl md:text-5xl text-white max-w-sm">Start posting jobs today</h4>
                <p className="font-epilogue text-sm md:text-base text-gray-100 font-medium">Start posting jobs for only $10.</p>
                <div className="mt-8 md:mt-10">
                    <Link href={"/sign-in"} className='text-base cursor-pointer text-primary-color border-0 bg-white px-6 py-5 font-epilogue font-bold'>
                        Sign Up For Free
                    </Link>
                </div>

                {/* Top-left corner triangle */}
                <div className="absolute top-0 left-0 w-0 h-0 
                    border-t-100 border-t-white 
                    border-r-100 border-r-transparent">
                </div>

                {/* Bottom-right corner triangle */}
                <div className="absolute -bottom-10 right-0 w-0 h-0 
                    border-b-100 border-b-white 
                    border-l-100 border-l-transparent">
                </div>

                <Image src={dashboard} alt="dashboard image" className="absolute bottom-0 left-5 md:left-auto md:right-5 lg:left-auto lg:right-10 xl:right-16 h-56 md:h-60 lg:h-82.5 w-auto z-10" />
            </div>
        </Container>
    )
}
