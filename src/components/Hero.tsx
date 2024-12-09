
import Image from "next/image";
import Link from "next/link";
import robot from "@/app/images/robot.png"

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white h-[100vh]">
      <div className="container px-4 py-20 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 ] ">
        {/* Left Content */}
        <div className="flex flex-col items-center sm:items-center md:items-start space-y-6">
  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold sm:text-center md:text-left">
    Stay Ahead in <br />
    <span className="text-teal-400">Tech Innovation</span>
  </h1>
  <p className="text-gray-300 text-lg text-center sm:text-center md:text-left">
    Get real-time news, in-depth articles, and expert insights on the
    latest in technology.
  </p>
  <Link
    href="/start-reading"
    className="flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white text-lg font-medium rounded-lg shadow-lg transition-all duration-200"
  >
    Start Reading{" "}
    <span className="ml-2 text-xl">→</span>
  </Link>
</div>


        {/* Right Content */}
        <div className="relative">
          <Image
            src={robot} 
            alt="Robot pointing"
            width={400}
            height={400}
            className="w-full max-w-sm md:max-w-md"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
