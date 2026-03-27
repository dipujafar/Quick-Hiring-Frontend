import { Skeleton } from '@/components/ui/skeleton'

export function DetailSkeleton() {
  return (
    <div className="container bg-white p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <Skeleton className="h-12 w-12 rounded" />
          <div className="flex-1">
            {/* Job Title */}
            <Skeleton className="mb-2 h-7 w-48" />
            {/* Company Name */}
            <Skeleton className="mb-2 h-5 w-32" />
            {/* Location */}
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        {/* Apply Now Button */}
        <Skeleton className="h-10 w-32 rounded" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2">
          {/* Description Section */}
          <div className="mb-8">
            <Skeleton className="mb-4 h-6 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Responsibilities Section */}
          <div className="mb-8">
            <Skeleton className="mb-4 h-6 w-40" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements Section */}
          <div className="mb-8">
            <Skeleton className="mb-4 h-6 w-32" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-4 w-4 flex-shrink-0" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-8">
            <Skeleton className="mb-4 h-6 w-24" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-4 w-4 flex-shrink-0" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Apply Button */}
          <Skeleton className="h-10 w-32 rounded" />
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Job Details Card */}
          <div className="rounded-lg border border-gray-200 p-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="mb-4 flex justify-between gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export default DetailSkeleton