import { cn } from '@/lib/utils';

export function LoadingState() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className={cn(
            "border rounded-lg p-6",
            "animate-pulse bg-gray-50"
          )}
        >
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
