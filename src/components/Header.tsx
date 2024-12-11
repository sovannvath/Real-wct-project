import Link from "next/link";

export default function Header() {
  return (
    <header className="h-auto flex justify-center items-center bg-gradient-to-r from-[#1f2535] to-[#183c45] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <div className="text-white text-xl font-semibold">TogetherTech</div>
        
        {/* Hamburger Menu for mobile screens */}
        <div className="lg:hidden">
          <label htmlFor="menu-toggle" className="text-white cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <input
            type="checkbox"
            id="menu-toggle"
            className="hidden peer"
          />
        </div>

        {/* Navbar Links */}
        <nav className="lg:flex space-x-4 hidden peer-checked:block">
          <ul className="flex lg:flex-row flex-col space-x-4 lg:space-x-6">
            <li className="my-2 lg:my-0">
              <Link href="/login" className="text-white hover:underline">
                Login
              </Link>
            </li>
            <li className="my-2 lg:my-0">
              <Link href="/register" className="text-white hover:underline">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
