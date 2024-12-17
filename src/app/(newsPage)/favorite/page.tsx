import Link from "next/link";

// Favorite Item Type
interface FavoriteItem {
  id: string;
  title: string;
  description?: string;
}

const FavoritePage = async () => {
  // Simulated server-side favorite posts fetching
  const favorites: FavoriteItem[] = []; // Replace this with an API/database query

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0C0F1C] text-white px-4">
      {/* Heart Icon */}
      <div className="mb-6">
        <div className="w-24 h-24 bg-gradient-to-b from-pink-500 to-red-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-6xl text-white">❤️</span>
        </div>
      </div>

      {/* Content */}
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4">
        {favorites.length === 0
          ? "You do not have any favorite post yet."
          : "Your Favorite Posts"}
      </h1>
      <p className="text-sm md:text-base text-center text-gray-400 mb-6 max-w-md">
        Go back to your feed and click on favorite icons on posts you like.
        After that, it will be stored here.
      </p>

      {/* Render Favorites if any */}
      {favorites.length > 0 && (
        <ul className="list-disc text-gray-300">
          {favorites.map((favorite) => (
            <li key={favorite.id} className="mb-2">
              <h3 className="text-lg font-semibold">{favorite.title}</h3>
              {favorite.description && (
                <p className="text-sm text-gray-400">{favorite.description}</p>
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

export default FavoritePage;
