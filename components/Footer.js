import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import {
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialInstagram,
} from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-white border-t">
      <div className="container px-5 py-16 mx-auto flex md:items-start md:flex-row flex-col">
        {/* Logo & Description */}
        <div className="w-64 mx-auto md:mx-0 text-center md:text-left">
          <Link href="/">
            <img
              src="/logo.png"
              alt="eTailEdge logo"
              width={120}
              height={50}
              className="mx-auto md:mx-0"
            />
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Wear the Code. Premium apparel and accessories designed for developers,
            creators and tech enthusiasts.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex-grow flex flex-wrap md:pl-20 mt-10 md:mt-0 text-center md:text-left">
          {/* Shop */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">SHOP</h2>
            <nav className="list-none space-y-2">
              <li><Link href="/category/tshirts" className="hover:text-black">T-Shirts</Link></li>
              <li><Link href="/category/hoodies" className="hover:text-black">Hoodies</Link></li>
              <li><Link href="/category/mugs" className="hover:text-black">Mugs</Link></li>
              <li><Link href="/category/stickers" className="hover:text-black">Stickers</Link></li>
            </nav>
          </div>

          {/* Policy */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">POLICY</h2>
            <nav className="list-none space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-black">Return & Refund Policy</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-black">Terms & Conditions</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-black">Shipping Policy</Link></li>
            </nav>
          </div>

          {/* Help */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">HELP</h2>
            <nav className="list-none space-y-2">
              <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-black">FAQs</Link></li>
              <li><Link href="/track-order" className="hover:text-black">Track Order</Link></li>
              <li><Link href="/my-orders" className="hover:text-black">My Orders</Link></li>
            </nav>
          </div>

          {/* About */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">ABOUT</h2>
            <nav className="list-none space-y-2">
              <li><Link href="/about" className="hover:text-black">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-black">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-black">Careers</Link></li>
              <li><Link href="/support" className="hover:text-black">Support</Link></li>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-neutral-900">
        <div className="container mx-au
        to py-4 px-5 flex flex-col sm:flex-row items-center">
          <p className="text-gray-300 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} eTailEdge — All Rights Reserved
          </p>
          <span className="inline-flex text-center sm:ml-auto mt-3 sm:mt-0 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <TiSocialLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <TiSocialInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <TiSocialTwitter />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
