// src/components/Footer.tsx
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-bg-gray-900  text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Services */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-teal-400">Services</h5>
            <ul>
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition">
                  Trending Technology News
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition">
                  Developer News
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition">
                  General Tech News
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-teal-400">Company</h5>
            <ul>
              <li>
                <Link href="/aboutus" className="text-gray-400 hover:text-teal-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-teal-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-teal-400 transition">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/signin" className="text-gray-400 hover:text-teal-400 transition">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-teal-400">Legal</h5>
            <ul>
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-teal-400">Follow Us</h5>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="https://facebook.com"
                  className="text-gray-400 hover:text-blue-500 transition"
                >
                  <FaFacebookF size={24} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <FaTwitter size={24} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  className="text-gray-400 hover:text-pink-500 transition"
                >
                  <FaInstagram size={24} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com"
                  className="text-gray-400 hover:text-blue-700 transition"
                >
                  <FaLinkedinIn size={24} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center border-t border-gray-700 pt-6">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TogetherTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
