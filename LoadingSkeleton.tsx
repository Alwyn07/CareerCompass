// ============================================================
// components/LoadingSkeleton.tsx
// Reusable skeleton loader shown during page transitions
// or data-fetching Suspense boundaries.
// ============================================================

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      {/* Top bar skeleton */}
      <div
        className="px-8 py-5 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div>
          <div className="skeleton w-40 h-6 mb-2" />
          <div className="skeleton w-24 h-4" />
        </div>
        <div className="flex gap-3">
          <div className="skeleton w-36 h-9 rounded-lg" />
          <div className="skeleton w-9 h-9 rounded-lg" />
          <div className="skeleton w-9 h-9 rounded-full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">
        {/* Banner skeleton */}
        <div className="skeleton w-full h-20 rounded-2xl mb-8" />

        {/* 4-col stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex justify-between mb-4">
                <div className="skeleton w-28 h-4 rounded" />
                <div className="skeleton w-2.5 h-2.5 rounded-full" />
              </div>
              <div className="skeleton w-20 h-8 rounded mb-2" />
              <div className="skeleton w-16 h-3 rounded" />
            </div>
          ))}
        </div>

        {/* Two-col content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass-card p-6 h-64">
              <div className="skeleton w-40 h-6 mb-2" />
              <div className="skeleton w-56 h-4 mb-6" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3 mb-4">
                  <div className="skeleton w-5 h-5 rounded-full flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="skeleton w-full h-3 rounded mb-2" />
                    <div className="skeleton w-full h-2 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6 h-64">
            <div className="skeleton w-32 h-6 mb-5" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3 mb-4">
                <div className="skeleton w-8 h-8 rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <div className="skeleton w-full h-3 rounded mb-1.5" />
                  <div className="skeleton w-16 h-3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
