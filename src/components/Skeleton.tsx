import React from 'react';

export const SkeletonTask: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 mb-2">
      <div className="flex items-center gap-3">
        {/* Avatar skeleton */}
        <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full flex-shrink-0" />
        
        {/* Content skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4" />
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/2" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonTaskList: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="w-11/12 mx-auto mt-8">
      {/* Form skeleton */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full" />
          <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded flex-1" />
        </div>
      </div>

      {/* Task list skeleton */}
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonTask key={index} />
        ))}
      </div>
      
      {/* Loading text */}
      <div className="text-center mt-4">
        <p className="text-gray-500 text-sm animate-pulse">Loading your tasks...</p>
      </div>
    </div>
  );
};

export default SkeletonTaskList;
