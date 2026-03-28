
import bg_pattern from "@/assets/images/header/bg-pattern.png";
import hero_image from "@/assets/images/header/hero-image.png"
import Container from '@/components/shared/Container';
import HeaderContent from './HeaderContent';
import shape_image from "@/assets/images/header/shape_image.png"
import Image from 'next/image';
import Navbar from "@/components/shared/Navbar/Navbar";

export default function Header() {
    return (
        <div
            className="h-screen bg-no-repeat relative"
            style={{
                backgroundImage: `url(${bg_pattern.src}), linear-gradient(#F8F8FD, #F8F8FD)`,
                backgroundPosition: "top right, center",
                backgroundRepeat: "no-repeat, no-repeat",
            }}
        >
            <Navbar className="bg-[#F8F8FD]/70" />
            <Container className='relative  flex items-center h-[calc(100vh-75px)]'>
                <div className='flex-1 md:max-w-[70%]'>
                    <HeaderContent />
                </div>
                <div className='absolute right-4 md:right-16 lg:right-24  xl:right-32 bottom-0 w-full z-0 hidden md:block'>
                    <Image src={hero_image} alt="hero_image"  className='max-w-[35%]  ml-auto w-fit' placeholder='blur' blurDataURL={'/blurImage.jpg'}  />
                </div>
            </Container>
            <div className='absolute right-0 bottom-0 w-full z-0 hidden md:block'>
                <Image src={shape_image} alt="hero" className='max-w-[35%]  ml-auto w-fit' placeholder='blur' blurDataURL={'/blurImage.jpg'} />
            </div>
        </div>
    )
}