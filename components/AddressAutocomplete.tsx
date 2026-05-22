"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { motion, AnimatePresence } from "framer-motion";
import { parseAddressComponents, type ParsedAddress } from "@/lib/parseAddressComponents";

const RECENT_KEY = "sipa_recent_addresses";
const MAX_RECENT = 5;

interface RecentAddress {
  description: string;
  parsed: ParsedAddress;
}

interface Props {
  onAddressSelect: (parsed: ParsedAddress) => void;
}

const SANS = { fontFamily: "'DM Sans', sans-serif" };

export default function AddressAutocomplete({ onAddressSelect }: Props) {
  const [isFocused, setIsFocused]             = useState(false);
  const [recentAddresses, setRecentAddresses] = useState<RecentAddress[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "in" },
      types: ["address"],
    },
    debounce: 300,
    cache: 86400,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecentAddresses(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        clearSuggestions();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [clearSuggestions]);

  const saveRecent = useCallback((description: string, parsed: ParsedAddress) => {
    try {
      const entry: RecentAddress = { description, parsed };
      const existing: RecentAddress[] = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
      const deduped = [entry, ...existing.filter((r) => r.description !== description)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(deduped));
      setRecentAddresses(deduped);
    } catch { /* ignore */ }
  }, []);

  const handleSelect = useCallback(async (description: string, placeId?: string) => {
    setValue(description, false);
    clearSuggestions();
    setIsFocused(false);
    try {
      const args = placeId ? { placeId } : { address: description };
      const results = await getGeocode(args);
      const parsed = parseAddressComponents(results[0].address_components);
      onAddressSelect(parsed);
      saveRecent(description, parsed);
    } catch { /* user can fill manually */ }
  }, [setValue, clearSuggestions, onAddressSelect, saveRecent]);

  const showSuggestions = isFocused && status === "OK";
  const showRecent      = isFocused && status !== "OK" && value.length === 0 && recentAddresses.length > 0;
  const showDropdown    = showSuggestions || showRecent;

  return (
    <div ref={containerRef} className="relative mb-3">

      {/* Search input */}
      <div
        className={`flex items-center border rounded-sm bg-white transition-all duration-200 ${
          isFocused
            ? "border-[#C4541A] shadow-[0_0_0_3px_rgba(196,84,26,0.08)]"
            : "border-black/20"
        }`}
      >
        <svg
          className="ml-3 w-4 h-4 text-[#9A8E82] flex-shrink-0"
          fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        <input
          type="text"
          placeholder={ready ? "Search delivery address" : "Loading maps..."}
          value={value}
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="flex-1 py-2.5 px-3 text-[0.82rem] text-[#1C1A17] placeholder-[#C4B8A8] bg-transparent outline-none disabled:cursor-wait"
          style={SANS}
        />

        {value && (
          <button
            type="button"
            onClick={() => { setValue(""); clearSuggestions(); }}
            className="mr-3 text-[#C4B8A8] hover:text-[#1C1A17] transition-colors text-sm leading-none"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute z-50 w-full mt-1 bg-white border border-black/10 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            {showSuggestions && (
              <>
                <div className="px-3 pt-2.5 pb-1">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#C4B8A8]" style={SANS}>
                    Suggestions
                  </p>
                </div>
                {data.map((s) => (
                  <button
                    key={s.place_id}
                    type="button"
                    onClick={() => handleSelect(s.description, s.place_id)}
                    className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-[#FAF7F2] transition-colors text-left"
                  >
                    <span className="text-[#9A8E82] mt-0.5 flex-shrink-0 text-sm">📍</span>
                    <div className="min-w-0">
                      <p className="text-[0.78rem] font-medium text-[#1C1A17] leading-snug truncate" style={SANS}>
                        {s.structured_formatting.main_text}
                      </p>
                      <p className="text-[0.68rem] text-[#9A8E82] leading-snug mt-0.5 truncate" style={SANS}>
                        {s.structured_formatting.secondary_text}
                      </p>
                    </div>
                  </button>
                ))}
                <div className="px-3 py-2 border-t border-black/5 flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 opacity-30">
                    <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9S4.86 16.5 9 16.5 16.5 13.14 16.5 9 13.14 1.5 9 1.5z" fill="#4285F4"/>
                  </svg>
                  <span className="text-[9px] text-black/25" style={SANS}>Powered by Google</span>
                </div>
              </>
            )}

            {showRecent && (
              <>
                <div className="px-3 pt-2.5 pb-1">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#C4B8A8]" style={SANS}>
                    Recent
                  </p>
                </div>
                {recentAddresses.map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      onAddressSelect(r.parsed);
                      setValue(r.description, false);
                      setIsFocused(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#FAF7F2] transition-colors text-left"
                  >
                    <span className="text-[#9A8E82] text-sm flex-shrink-0">🕐</span>
                    <p className="text-[0.78rem] text-[#5A5245] leading-snug truncate" style={SANS}>
                      {r.description}
                    </p>
                  </button>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
