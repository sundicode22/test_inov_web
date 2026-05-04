import { Skeleton } from "@/components/ui/skeleton";

export function ProfilPageSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto bg-slate-50/50 p-6 lg:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40 rounded-lg" />
          <Skeleton className="h-5 w-full max-w-md rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-28 rounded-lg" />
          <Skeleton className="h-11 w-40 rounded-lg" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950 p-8 shadow-xl">
        <div
          className="pointer-events-none absolute -left-24 top-1/2 h-88 w-88 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[90px]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <Skeleton className="size-24 shrink-0 rounded-2xl bg-slate-600/40 shadow-[0_0_24px_-2px_rgba(56,189,248,0.35)]" />
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-9 w-56 rounded-lg bg-slate-600/40" />
                <Skeleton className="size-5 shrink-0 rounded-full bg-slate-600/40" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-4 w-52 rounded-md bg-slate-600/40" />
                <Skeleton className="h-4 w-24 rounded-md bg-slate-600/40" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-11 w-44 rounded-lg bg-slate-600/40" />
            <Skeleton className="h-11 w-40 rounded-lg bg-slate-600/40" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500/12 blur-[100px]"
          aria-hidden
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
        ))}
      </div>

      <div className="mt-2 flex-1 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] p-6">
          <Skeleton className="h-7 w-40 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
        <div className="space-y-8 p-6 pl-14">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-48 rounded-md" />
              <Skeleton className="h-4 w-full max-w-sm rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
