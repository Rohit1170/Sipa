"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "@/components/AuthModal";

function getInitials(str: string) {
  const parts = str.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return str.slice(0, 2).toUpperCase();
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, [pathname]);

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
    if (!(section instanceof HTMLElement)) return false;
    const navbar = document.querySelector("nav");
    const navbarOffset = navbar instanceof HTMLElement ? navbar.offsetHeight + 16 : 80;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarOffset;
    window.scrollTo({ top: sectionTop, behavior: "smooth" });
    window.history.replaceState(null, "", href);
    return true;
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) { setMenuOpen(false); return; }
    event.preventDefault();
    setMenuOpen(false);
    if (pathname !== "/") { router.push(`/${href}`); return; }
    window.setTimeout(() => scrollToSection(href), 10);
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

  const userLabel = session?.user?.name || session?.user?.email || "";
  const initials = userLabel ? getInitials(userLabel) : "?";

  return (
    <>
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
              <img src="/logo.png" alt="SIPA Nutrition Logo" className="h-24 w-auto" />
            </a>

            {/* Desktop nav */}
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

              {/* Session-aware section */}
              {status !== "loading" && (
                session ? (
                  <div className="flex items-center gap-4">
                    <a
                      href="/profile"
                      className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 transition-colors duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <div
                        className="w-7 h-7 rounded-full bg-[#C4541A] text-white flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {initials}
                      </div>
                      Profile
                    </a>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-red-600 transition-colors duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 border border-neutral-300 hover:border-orange-700 px-4 py-1.5 rounded-sm transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Login
                  </button>
                )
              )}
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

        {/* Mobile menu */}
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

            {/* Mobile session-aware section */}
            {status !== "loading" && (
              session ? (
                <>
                  <a
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-700 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C4541A] text-white flex items-center justify-center text-[9px] font-bold">
                      {initials}
                    </div>
                    Profile
                  </a>
                  <button
                    onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                    className="text-left text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setMenuOpen(false); setShowAuthModal(true); }}
                  className="text-left text-xs uppercase tracking-[0.2em] text-[#C4541A] font-semibold"
                >
                  Login / Sign Up
                </button>
              )
            )}
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        callbackUrl="/productOverview"
      />
    </>
  );
}
