import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDashboard() {
  return (
    <div className="h-screen p-5 pb-0 flex flex-col space-y-4">
      {/* Header Skeleton */}
      <Skeleton className="h-12 w-full rounded-lg" />

      {/* Mobile Tabs Skeleton */}
      <div className="block xl:hidden flex-1 min-h-0 flex flex-col space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="flex-1 w-full rounded-md" />
      </div>

      {/* Desktop Sections Skeleton */}
      <div className="hidden xl:grid grid-cols-[2.5fr_4fr_2.5fr] gap-4 flex-1 mb-1.5">
        <Skeleton className="h-full rounded-md" />
        <Skeleton className="h-full rounded-md" />
        <Skeleton className="h-full rounded-md" />
      </div>
    </div>
  );
}
