"use client";
import { useState, useEffect, useRef } from "react";
import { signIn, getSession } from "next-auth/react";

const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS = { fontFamily: "'DM Sans', sans-serif" };

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  callbackUrl?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  callbackUrl = "/productOverview",
}: AuthModalProps) {
  const [tab, setTab] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const pollCount = useRef(0);

  // Poll for session after verification link is sent.
  // Handles the case where user opens the link in a new tab or on another device.
  useEffect(() => {
    if (!sent) return;
    pollCount.current = 0;

    const interval = setInterval(async () => {
      pollCount.current += 1;
      if (pollCount.current > 75) { clearInterval(interval); return; } // stop after ~5 min

      const session = await getSession();
      if (session) {
        clearInterval(interval);
        window.location.href = callbackUrl;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [sent, callbackUrl]);

  if (!isOpen) return null;

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLoading(false);
    setSent(false);
    setError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const switchTab = (t: "signup" | "login") => {
    setTab(t);
    setError("");
  };

  const sendVerificationLink = async (emailVal: string) => {
    const result = await signIn("nodemailer", {
      email: emailVal,
      redirect: false,
      callbackUrl,
    });
    if (result?.error) {
      setError("Could not send email. Please try again.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const trimName = name.trim();
    const trimEmail = email.trim().toLowerCase();
    const trimPhone = phone.trim();

    if (!trimName) { setError("Full name is required."); return; }
    if (!trimEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!trimPhone || !/^[6-9]\d{9}$/.test(trimPhone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const reg = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimName, email: trimEmail, phone: trimPhone }),
      });
      if (reg.status === 409) {
        setError("account_exists");
        setLoading(false);
        return;
      }
      if (!reg.ok) {
        setError("Registration failed. Please try again.");
        setLoading(false);
        return;
      }
      const ok = await sendVerificationLink(trimEmail);
      if (ok) setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const trimEmail = email.trim().toLowerCase();
    if (!trimEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/direct-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimEmail }),
        credentials: "include", // FIX 3: ensure cookie is sent/received
      });

      if (res.status === 404) {
        setError("no_account");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // FIX 4: confirm session exists before redirecting
      const session = await getSession();
      if (!session) {
        // FIX 5: show error if session was not created
        setError("Session could not be created. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = callbackUrl;
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative bg-white w-full max-w-sm rounded-2xl border border-black/10 overflow-hidden"
        style={SANS}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-black/30 hover:text-black/70 text-lg z-10"
        >
          ✕
        </button>

        {sent ? (
          /* ── SENT STATE ── */
          <div className="px-8 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#C4541A]/10 flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  stroke="#C4541A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-[#C4541A] mb-2" style={SANS}>
              Check Your Inbox
            </p>
            <h2 className="text-[22px] font-medium italic text-[#1C1A17] mb-3" style={SERIF}>
              Link Sent.
            </h2>
            <p className="text-[0.82rem] text-[#5A5245] leading-relaxed">
              We sent a verification link to{" "}
              <span className="font-semibold text-[#1C1A17]">{email}</span>.
              Click it to verify and continue.
            </p>

            {/* Auto-detect notice */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C4541A] animate-pulse" />
              <p className="text-[0.7rem] text-[#9A8E82]">
                Verified on another device? This page will update automatically.
              </p>
            </div>

            <p className="text-[0.7rem] text-[#9A8E82] mt-3">
              Didn&apos;t get it? Check your spam folder.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 w-full py-2.5 border border-black/15 rounded-sm text-[11px] font-semibold tracking-[0.16em] uppercase text-[#5A5245] hover:bg-black/5 transition-colors"
              style={SANS}
            >
              Close
            </button>
          </div>
        ) : (
          /* ── FORM STATE ── */
          <>
            <div className="px-8 pt-7 pb-5 border-b border-black/8">
              <p className="text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-[#C4541A] mb-1" style={SANS}>
                Est. 2026 · Official Launch
              </p>
              <h2 className="text-[22px] text-[#1C1A17] leading-tight" style={SERIF}>
                {tab === "signup" ? (
                  <>Create Your <em className="italic text-[#C4541A]">Account.</em></>
                ) : (
                  <>Welcome <em className="italic text-[#C4541A]">Back.</em></>
                )}
              </h2>
              <p className="text-[11px] text-black/40 mt-1" style={SANS}>
                We&apos;ll email you a secure verification link — no password needed.
              </p>
            </div>

            <div className="px-8 py-6">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 bg-[#F5F0E8] p-1 rounded-sm">
                {(["signup", "login"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => switchTab(t)}
                    className={`flex-1 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase rounded-sm transition-all ${
                      tab === t
                        ? "bg-white text-[#1C1A17] shadow-sm"
                        : "text-black/40 hover:text-black/60"
                    }`}
                    style={SANS}
                  >
                    {t === "signup" ? "Sign Up" : "Log In"}
                  </button>
                ))}
              </div>

              <form onSubmit={tab === "signup" ? handleSignup : handleLogin}>
                {tab === "signup" && (
                  <div className="mb-3">
                    <input
                      placeholder="Full Name *"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(""); }}
                      className="input rounded-sm w-full"
                      style={SANS}
                      autoComplete="name"
                    />
                  </div>
                )}

                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="input rounded-sm w-full"
                    style={SANS}
                    autoComplete="email"
                  />
                </div>

                {tab === "signup" && (
                  <div className="mb-3">
                    <input
                      type="tel"
                      placeholder="Mobile Number * (10-digit)"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setError(""); }}
                      className="input rounded-sm w-full"
                      style={SANS}
                      autoComplete="tel"
                    />
                  </div>
                )}

                {error && (
                  <p className="text-[11px] text-red-500 mb-3" style={SANS}>
                    {error === "account_exists" ? (
                      <>
                        This email already has an account.{" "}
                        <button
                          type="button"
                          onClick={() => switchTab("login")}
                          className="underline font-semibold hover:text-red-700"
                        >
                          Log in instead →
                        </button>
                      </>
                    ) : error === "no_account" ? (
                      <>
                        No account found with this email.{" "}
                        <button
                          type="button"
                          onClick={() => switchTab("signup")}
                          className="underline font-semibold hover:text-red-700"
                        >
                          Sign up instead →
                        </button>
                      </>
                    ) : (
                      error
                    )}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#C4541A] hover:bg-[#D96528] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 mt-2"
                  style={SANS}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : tab === "login" ? (
                    "Login →"
                  ) : (
                    "Send Verification Link →"
                  )}
                </button>

                <p className="text-center text-[10px] text-black/25 mt-3" style={SANS}>
                  🔒 Secure · No password required
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
