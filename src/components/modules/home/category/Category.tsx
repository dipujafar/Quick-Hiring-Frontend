import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'


export default function Category() {
    return (
        <Container className='w-full lg:py-18 py-10'>
            <SectionTitle title="Explore by category" link='/jobs' linkText='Show all jobs' />
        </Container>
    )
}
