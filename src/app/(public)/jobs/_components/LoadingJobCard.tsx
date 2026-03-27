import { Skeleton } from '@/components/ui/skeleton'

export function LoadingJobCard() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      {/* Header with logo and badge */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo skeleton */}
        <Skeleton className="w-12 h-12 rounded" />
        
        {/* Badge skeleton */}
        <Skeleton className="w-20 h-8 rounded" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="w-32 h-6 mb-2 rounded" />

      {/* Location skeleton */}
      <Skeleton className="w-48 h-4 mb-4 rounded" />

      {/* Description skeleton - multiple lines */}
      <div className="space-y-2 mb-4">
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-5/6 h-4 rounded" />
      </div>

      {/* Tags skeleton */}
      <div className="flex gap-2">
        <Skeleton className="w-20 h-6 rounded-full" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
    </div>
  )
}


export default LoadingJobCard