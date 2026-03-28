"use client"
import Image from "next/image"
import company1 from "@/assets/images/company/company1.png"
import company2 from "@/assets/images/company/company2.png"
import company3 from "@/assets/images/company/company3.png"
import company4 from "@/assets/images/company/company4.png"
import company5 from "@/assets/images/company/company5.png"


import Marquee from 'react-fast-marquee';
import Container from "@/components/shared/Container"

export default function Companies() {

    const companiesLogo = [
        {
            id: 1,
            img: company1
        },
        {
            id: 2,
            img: company2
        },
        {
            id: 3,
            img: company3
        },
        {
            id: 4,
            img: company4
        },
        {
            id: 5,
            img: company5
        },
    ]

    return (
        <div className='bg-white'>
            <Container className=' py-8 md:py-10 lg:py-12'>
                <p className="text-lg  text-primary-gray mb-8">Companies we helped grow</p>
                <Marquee direction='left' autoFill={true} loop={0} pauseOnHover={true}>
                    {companiesLogo?.map(logo => (
                        <Image
                            key={logo?.id}
                            src={logo?.img}
                            alt="logo"
                            className="h-8 w-auto mx-6"
                            placeholder='blur' blurDataURL={'/blurImage.jpg'}
                        />
                    ))}
                </Marquee>
            </Container>
        </div>
    )
}

