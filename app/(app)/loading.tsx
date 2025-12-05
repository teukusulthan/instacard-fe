// app/(app)/dashboard/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-26 py-4 space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-52" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-card/60 p-4 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="rounded-2xl border bg-card/60 p-4 space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="rounded-2xl border bg-card/60 p-4 space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Left: list / table */}
        <div className="rounded-2xl border bg-card/60 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 rounded-xl border bg-background/60 px-3 py-3"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: sidebar panel */}
        <div className="rounded-2xl border bg-card/60 p-4 space-y-4">
          <Skeleton className="h-5 w-28" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-2 pt-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2.5 w-full rounded-full" />
            <Skeleton className="h-2.5 w-3/4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
