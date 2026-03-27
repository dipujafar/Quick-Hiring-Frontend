
import { GetApplications } from '@/lib/actions/jobs.action';
import  { Suspense } from 'react'
import { ImSpinner8 } from 'react-icons/im';
import ApplicationTable from './_components/ApplicationTable';

async function ApplicationPage({
  searchParams: ssp,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const searchParams = await ssp;

  const limit = searchParams?.limit;
  const page = searchParams?.page;
  const searchTerm = searchParams?.searchTerm

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = { page: page ?? 1, limit }
  if (searchTerm) {
    query.searchTerm = searchTerm
  }

  const applicationPromise = GetApplications({ query });

  return (
    <div className="">

      <h3 className="font-medium  text-xl">All Applications</h3>

      <div>
        <Suspense fallback={<div>
          <div className='min-h-40 flex items-center justify-center'>
            <ImSpinner8 className="text-4xl text-primary-color animate-spin" />
          </div>
        </div>}>
          <ApplicationTable applicationPromise={applicationPromise} page={Number(page)} />
        </Suspense>
      </div>
    </div>
  )
}

export default ApplicationPage