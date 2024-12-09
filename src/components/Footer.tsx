// src/components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4">Services</h5>
            <ul>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Trending Technology News</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Developer News</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">General Tech News</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Community</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xl font-bold mb-4">Company</h5>
            <ul>
              <li><Link href="/aboutus" className="text-gray-400 hover:text-teal-400">About Us</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Contact</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Register</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xl font-bold mb-4">Legal</h5>
            <ul>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Terms of Use</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Privacy Policy</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Follow Us</h5>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Facebook</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Twitter</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">Instagram</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-teal-400">LinkedIn</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2024 TogetherTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
