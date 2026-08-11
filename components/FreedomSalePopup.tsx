"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
import { isFreedomSaleActive } from "@/app/lib/campaign";

// Shown once per browser session — not on every page/route visit.
const SEEN_KEY = "freedomSalePopupSeen";

export function FreedomSalePopup() {
  const [saleActive] = useState(isFreedomSaleActive);
  const [isOpen, setIsOpen] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    if (!saleActive) return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    sessionStorage.setItem(SEEN_KEY, "1");

    // Preload the banner so the popup never shows a blank card before the image paints.
    const img = new window.Image();
    img.src = "/FreedomSale.png";
    const show = () => setIsOpen(true);
    if (img.complete) show();
    else {
      img.onload = show;
      img.onerror = show; // fail open — don't block the popup forever on a network hiccup
    }
  }, [saleActive]);

  useEffect(() => {
    if (!isOpen) return;
    confettiRef.current?.fire({ particleCount: 160, spread: 100, origin: { y: 0.4 } });
  }, [isOpen]);

  if (!saleActive || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 backdrop-blur-sm px-4"
      onClick={() => setIsOpen(false)}
    >
      <Confetti
        ref={confettiRef}
        manualstart
        className="pointer-events-none fixed inset-0 z-[201] h-full w-full"
        options={{ particleCount: 160, spread: 100, origin: { y: 0.4 } }}
      />

      <div
        className="relative w-full max-w-xs sm:max-w-sm max-h-[90vh] rounded-2xl bg-white overflow-y-auto z-[202] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white text-base z-10 transition-colors"
        >
          ✕
        </button>

        <Image
          src="/FreedomSale.png"
          alt="Freedom Sale is live — Buy 1 Get 1 Free"
          width={1024}
          height={1536}
          sizes="(max-width: 640px) 85vw, 384px"
          className="w-full h-auto block"
          priority
        />
      </div>
    </div>
  );
}
