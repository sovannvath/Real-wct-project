import Image from "next/image";
import Link from "next/link";
import robot from "@/app/images/robot.png";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 py-12 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Stay Ahead in <br />
            <span className="text-teal-400">Tech Innovation</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            Get real-time news, in-depth articles, and expert insights on the
            latest in technology.
          </p>
          <Link
            href="/feed"
            className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white text-lg font-medium rounded-[4px] shadow-lg transition-all duration-300  ease-in-out"
          >
            Start Reading
            <span className="ml-2 text-xl transition-transform transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Right Content */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <Image
            src={robot}
            alt="Robot pointing"
            width={500}
            height={500}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
