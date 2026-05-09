"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-[#9A8E82] hover:text-red-600 transition-colors border border-black/10 px-5 py-2 rounded-sm hover:border-red-200"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      Sign Out
    </button>
  );
}
