import Link from "next/link";

const JoinCommunity = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="flex-1 mb-6 md:mb-0">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Join <span className="text-teal-400">community</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-md">
            Join us now to share your news, connect with others, and engage—
            like, comment, and explore the latest in tech!
          </p>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col items-start md:items-end">
          <p className="text-gray-400 mb-4 text-base md:text-lg">
            After Sign up, you will be able to connect with others, post your
            content, and many more...
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-400 text-white rounded-lg hover:bg-teal-400 hover:text-gray-900 transition duration-300 ease-in-out"
          >
            Sign Up Now <span className="ml-2 text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
