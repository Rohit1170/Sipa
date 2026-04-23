"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
// import { scrapeMotionValuesFromProps } from './../.next/dev/static/chunks/bd135_framer-motion_dist_es_1d0f3616._';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderClicked, setOrderClicked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToSection(hash);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const handleOrderClick = () => {
    setOrderClicked(true);
    window.setTimeout(() => setOrderClicked(false), 2000);
  };

  const getVisibleSection = (href: string) => {
    const sections = Array.from(document.querySelectorAll(href));

    return sections.find((section): section is HTMLElement => {
      if (!(section instanceof HTMLElement)) return false;

      const styles = window.getComputedStyle(section);
      return styles.display !== "none" && section.getClientRects().length > 0;
    });
  };

  const scrollToSection = (href: string) => {
    const section = getVisibleSection(href);
    if (!(section instanceof HTMLElement)) {
      console.warn(`Section not found for href: ${href}`);
      return false;
    }

    const navbar = document.querySelector("nav");
    const navbarOffset =
      navbar instanceof HTMLElement ? navbar.offsetHeight + 16 : 80;
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY - navbarOffset;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", href);
    return true;
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();
    setMenuOpen(false);

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    window.setTimeout(() => {
      scrollToSection(href);
    }, 10);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Benefits", href: "#benefits" },
    { label: "Ingredients", href: "#ingredients" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/">
            <img
              src="/logo.png"
              alt="SIPA Nutrition Logo"
              className="h-24 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </a>
            ))}

            {/* <div
              className="relative group cursor-not-allowed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="block px-5 py-2 bg-neutral-900 text-white text-xs uppercase tracking-[0.2em] group-hover:opacity-0 transition-opacity duration-200">
                Order - Rs 599
              </span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-orange-400 text-xs uppercase tracking-[0.2em] bg-neutral-900">
             coming soon</span>
            </div> */}
          </div>

          <button
            className="md:hidden text-neutral-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden bg-white border-t border-neutral-100 px-6 py-6 flex flex-col gap-5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={handleOrderClick}
            className="relative px-5 py-3 bg-neutral-900 text-white text-xs uppercase tracking-[0.2em] text-center overflow-hidden transition-all duration-200 cursor-not-allowed"
          >
            <span
              className={`transition-opacity duration-200 ${
                orderClicked ? "opacity-0" : "opacity-100"
              }`}
            >
              Order - Rs 599
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center text-orange-400 text-xs uppercase tracking-[0.2em] transition-opacity duration-200 ${
                orderClicked ? "opacity-100" : "opacity-0"
              }`}
            >
              Coming Soon
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
