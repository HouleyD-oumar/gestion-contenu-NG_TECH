export default function PageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted animate-pulse"></div>
            <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-muted animate-pulse rounded"></div>
            <div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Title skeleton */}
            <div className="text-center space-y-4">
              <div className="h-10 w-96 bg-muted animate-pulse rounded mx-auto"></div>
              <div className="h-5 w-80 bg-muted animate-pulse rounded mx-auto"></div>
            </div>

            {/* Content grid skeleton */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-video w-full bg-muted animate-pulse rounded-md"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                    <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-muted animate-pulse rounded w-16"></div>
                      <div className="h-6 bg-muted animate-pulse rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted animate-pulse rounded"></div>
                      <div className="h-3 bg-muted animate-pulse rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
