"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#343943] p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-8 text-center flex flex-col items-center">
        <Link href="/" className="mb-4 inline-block transition-transform hover:scale-105">
          <Image
            src="/logo.png"
            alt="Winging WA"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ef0e0a]/10 px-3 py-1 text-xs font-semibold text-[#ef0e0a] border border-[#ef0e0a]/20 mb-3">
          <ShieldCheck className="size-3.5" />
          <span>Admin Portal</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
        <p className="mt-1.5 text-xs text-slate-300">
          Sign in to manage stock inventory, equipment, and contact inquiries.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 text-center animate-in fade-in duration-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wingingwa.com.au"
              className="w-full rounded-lg border border-white/10 bg-[#2b2f38] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-colors focus:border-[#ef0e0a] focus:outline-none focus:ring-1 focus:ring-[#ef0e0a]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-[#2b2f38] py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 transition-colors focus:border-[#ef0e0a] focus:outline-none focus:ring-1 focus:ring-[#ef0e0a]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#ef0e0a] py-3 text-sm font-semibold text-white transition-all hover:bg-[#c40c08] active:bg-[#a80a07] disabled:opacity-50 cursor-pointer shadow-lg shadow-red-900/30"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Verifying credentials...</span>
            </>
          ) : (
            <span>Sign In to Dashboard</span>
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-white/10 pt-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Return to public website</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#4A505B] selection:bg-[#ef0e0a] selection:text-white">
      <div className="absolute inset-0 bg-radial from-black/20 via-black/40 to-black/80 pointer-events-none" />
      <Suspense fallback={<div className="text-white text-sm">Loading admin portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

