import { Skeleton } from "@/components/ui/skeleton";

export function LatestJobSkeleton() {
  return (
    <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-gray-200">
      {/* Logo Skeleton */}
      <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />

      <div className="flex-1">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-48 mb-2" />

        {/* Subtitle Skeleton */}
        <Skeleton className="h-4 w-40 mb-4" />

        {/* Badges Container */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}


export default LatestJobSkeleton