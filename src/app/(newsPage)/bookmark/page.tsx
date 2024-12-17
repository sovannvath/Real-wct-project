import { Bookmark } from "lucide-react";
import Link from "next/link";

// Define the type for a bookmark
interface BookmarkItem {
  id: string;
  title: string;
  description?: string;
}

const BookmarkPage = async () => {
  // Simulated server-side bookmark data fetching
  const bookmarks: BookmarkItem[] = [
    { id: "1", title: "First Bookmark", description: "This is your first bookmark." },
    { id: "2", title: "Second Bookmark" },
  ]; // Replace with real database or API call

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0C0F1C] text-white px-4">
      {/* Bookmark Icon */}
      <div className="mb-6">
        <div className="w-24 h-24 bg-gradient-to-b from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
          <Bookmark className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Content */}
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4">
        {bookmarks.length === 0
          ? "Your Bookmarks list is currently empty."
          : "Your Bookmarked Posts"}
      </h1>
      <p className="text-sm md:text-base text-center text-gray-400 mb-6 max-w-md">
        Go back to your feed and bookmark posts you'd like to keep or read later.
        After you click on the bookmark icons, it will be stored here.
      </p>

      {/* Render bookmarks if any */}
      {bookmarks.length > 0 && (
        <ul className="list-disc text-gray-300">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className="mb-2">
              <h3 className="text-lg font-semibold">{bookmark.title}</h3>
              {bookmark.description && (
                <p className="text-sm text-gray-400">{bookmark.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Button */}
      <Link href="/feed">
        <button className="px-6 py-3 bg-white text-[#0C0F1C] font-medium rounded-full hover:bg-gray-200 transition">
          Back To Feeds
        </button>
      </Link>
    </div>
  );
};

export default BookmarkPage;
