"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

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

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    window.setTimeout(() => {
      scrollToSection(href);
    }, 10);
  };

  const productLinks = [
    { label: "About", href: "/about" },
    { label: "Ingredients", href: "#ingredients" },
    { label: "Benefits", href: "#benefits" },
  ];

  const companyLinks = [
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          <div className="max-w-xs">
            <p
              className="text-3xl font-bold text-white mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SIPA <em className="italic text-orange-500">Nutrition</em>
            </p>
            <p
              className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Daily Vitamin D3 + K2
            </p>
            <div className="h-px bg-neutral-800 mb-6" />
            <p
              className="text-sm text-neutral-400 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              A vegan daily maintenance formula engineered for better
              absorption, stronger bones, and lasting immunity.
            </p>
          </div>

          <div className="flex gap-16 sm:gap-24">
            <div>
              <p
                className="text-xs uppercase tracking-[0.25em] text-neutral-600 mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Product
              </p>
              <ul
                className="space-y-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      className="text-sm text-neutral-500 hover:text-orange-500 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 mt-6">
                <a
                  href="https://x.com/NutritionS7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-orange-500 transition"
                >
                  <FontAwesomeIcon icon={faXTwitter} size="lg" />
                </a>

                <a
                  href="https://www.instagram.com/sipa_nutrition/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-orange-500 transition"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>

                <a
                  href="https://www.linkedin.com/company/sipa-nutrition/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-orange-500 transition"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </div>
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-[0.25em] text-neutral-600 mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Company
              </p>
              <ul
                className="space-y-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      className="text-sm text-neutral-500 hover:text-orange-500 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="h-px bg-neutral-800" />

        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="text-xs text-neutral-600 uppercase tracking-[0.2em]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {currentYear} SIPA Nutrition
          </p>
          <p
            className="text-xs text-neutral-600 leading-relaxed max-w-md sm:text-right"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Health supplement only. Not intended to diagnose, treat, cure, or
            prevent any disease. Consult a healthcare professional before use.
          </p>
        </div>
      </div>
    </footer>
  );
}
