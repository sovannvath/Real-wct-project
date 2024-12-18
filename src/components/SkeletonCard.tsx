const SkeletonCard = () => {
    return (
      <div className="bg-black rounded-xl shadow-lg w-96 h-[30rem] flex flex-col animate-pulse">
        {/* Skeleton Image */}
        <div className="relative w-full h-52 bg-gray-700 rounded-t-xl"></div>
  
        {/* Skeleton Content */}
        <div className="p-5 flex-1">
          <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div> {/* Title */}
          <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div> {/* Line 1 */}
          <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div> {/* Line 2 */}
          <div className="h-4 bg-gray-700 rounded mb-4 w-2/3"></div> {/* Line 3 */}
          <div className="h-3 bg-gray-600 rounded w-1/2"></div> {/* Timestamp */}
        </div>
  
        {/* Skeleton Footer */}
        <div className="px-5 mb-2 flex justify-between items-center">
          <div className="h-6 w-6 bg-gray-700 rounded-full"></div> {/* Like Icon */}
          <div className="h-6 w-6 bg-gray-700 rounded-full"></div> {/* Comment Icon */}
          <div className="h-6 w-6 bg-gray-700 rounded-full"></div> {/* Bookmark Icon */}
          <div className="h-6 w-6 bg-gray-700 rounded-full"></div> {/* Heart Icon */}
        </div>
  
        {/* Skeleton Button */}
        <div className="mt-2 px-5 pb-5">
          <div className="h-10 w-full bg-gray-700 rounded-md"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonCard;
  