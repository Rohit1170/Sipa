"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "@/components/AuthModal";
import { FaRegCircleUser } from "react-icons/fa6";

function getInitials(str: string) {
  const parts = str.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return str.slice(0, 2).toUpperCase();
}

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [profileName, setProfileName]   = useState("");
  const nameFetched = useRef(false);
  const pathname    = usePathname();
  const router      = useRouter();
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
    const navbar      = document.querySelector("nav");
    const navbarOffset = navbar instanceof HTMLElement ? navbar.offsetHeight + 16 : 80;
    const sectionTop  = section.getBoundingClientRect().top + window.scrollY - navbarOffset;
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
    { label: "Home",    href: "/"        },
    { label: "Contact", href: "#contact" },
    { label: "Blog",    href: "/blog"    },
    { label: "About",   href: "/about"   },
  ];

  useEffect(() => {
    if (!session?.user?.email || nameFetched.current) return;
    nameFetched.current = true;
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((data) => { if (data.name) setProfileName(data.name); })
      .catch(() => {});
  }, [session]);

  const userLabel   = profileName || session?.user?.name || session?.user?.email || "";
  const initials    = userLabel ? getInitials(userLabel) : "?";
  const isHome      = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/92 backdrop-blur-md shadow-sm border-b border-neutral-200"
            : "bg-transparent"
        }`}
      >
        {/*
          px-6 sm:px-10 → comfortable margin from both corners
          Three-column grid: logo | links | auth
          Each column is `flex-1` so the center stays truly centered
        */}
        <div className="flex items-center justify-between h-16 px-6 sm:px-10">

          {/* ── LEFT: Logo ── */}
          <div className="flex-1 flex items-center justify-start">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="SIPA Nutrition"
                className="h-17 sm:h-28 w-auto object-contain"
              />
            </a>
          </div>

          {/* ── CENTER: Nav links (desktop) ── */}
          <div
            className="hidden md:flex items-center gap-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className={`
                  text-xs uppercase tracking-[0.2em] transition-colors duration-300
                  ${transparent
                    ? "text-white/85 hover:text-orange-400"
                    : "text-neutral-500 hover:text-orange-700"
                  }
                `}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── RIGHT: Auth + mobile controls ── */}
          <div className="flex-1 flex items-center justify-end gap-3">

            {/* Desktop auth */}
            <div
              className="hidden md:flex items-center gap-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {status === "loading" ? (
                <div className="w-7 h-7 rounded-full bg-neutral-200 animate-pulse" />
              ) : session ? (
                <>
                  <a
                    href="/profile"
                    className={`
                      flex items-center justify-center transition-colors duration-300
                      ${transparent
                        ? "text-white/80 hover:text-orange-400"
                        : "text-neutral-500 hover:text-orange-700"
                      }
                    `}
                  >
                    <FaRegCircleUser className="text-xl" />
                  </a>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className={`
                      text-xs uppercase tracking-[0.2em] transition-colors duration-300
                      ${transparent
                        ? "text-white/60 hover:text-red-400"
                        : "text-neutral-400 hover:text-red-600"
                      }
                    `}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`
                    text-xs uppercase tracking-[0.2em] px-5 py-1.5 rounded-sm
                    transition-all duration-300
                    ${transparent
                      ? "text-white/90 border border-white/35 hover:border-orange-400 hover:text-orange-400"
                      : "text-neutral-500 border border-neutral-300 hover:border-orange-700 hover:text-orange-700"
                    }
                  `}
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile: profile icon + hamburger */}
            <div className="md:hidden flex items-center gap-3">
              {session && (
                <a
                  href="/profile"
                  className={`
                    flex items-center justify-center transition-colors duration-300
                    ${transparent
                      ? "text-white/80 hover:text-orange-400"
                      : "text-neutral-600 hover:text-orange-700"
                    }
                  `}
                >
                  <FaRegCircleUser className="text-xl" />
                </a>
              )}
              <button
                className={`transition-colors duration-300 ${
                  transparent ? "text-white/85" : "text-neutral-700"
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
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

            {status === "loading" ? (
              <div className="w-6 h-6 rounded-full bg-neutral-200 animate-pulse" />
            ) : session ? (
              <>
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