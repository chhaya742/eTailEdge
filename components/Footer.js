import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    heading: "Shop",
    links: [
      { label: "T-Shirts", href: "/category/tshirts" },
      { label: "Hoodies", href: "/category/hoodies" },
      { label: "Mugs", href: "/category/mugs" },
      { label: "Stickers", href: "/category/stickers" },
    ],
  },
  {
    heading: "Policy",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Return & Refund", href: "/return-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Shipping Policy", href: "/shipping-policy" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Track Order", href: "/track-order" },
      { label: "My Orders", href: "/my-orders" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Support", href: "/support" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://facebook.com",  Icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram  },
  { label: "LinkedIn",  href: "https://linkedin.com",  Icon: FaLinkedinIn },
  { label: "X",         href: "https://twitter.com",   Icon: FaXTwitter   },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-500 text-sm">

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Brand column */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="eTailEdge"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
          <p className="leading-relaxed text-gray-400 max-w-xs">
            Premium apparel and accessories designed for developers, creators,
            and tech enthusiasts.
          </p>
        </div>

        {/* Nav columns */}
        {NAV_SECTIONS.map(({ heading, links }) => (
          <div key={heading}>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-900 mb-4">
              {heading}
            </h3>
            <ul className="space-y-2.5">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} eTailEdge. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${label}`}
                className="text-gray-400 hover:text-gray-900 transition-colors duration-150"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
