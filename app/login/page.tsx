"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Apple, ArrowRight, Chrome, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/stores/user-store";
import { showToast } from "@/lib/toast";

type StoredAccount = {
  name: string;
  email: string;
  password: string;
};

const ACCOUNTS_KEY = "aurelia-accounts";

const getStoredAccounts = (): StoredAccount[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
};

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user.isAuthenticated) {
      router.replace("/profile");
    }
  }, [router, user.isAuthenticated]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter both your email and password.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const accounts = getStoredAccounts();
    const account = accounts.find((item) => item.email.toLowerCase() === formData.email.toLowerCase() && item.password === formData.password);

    if (!account) {
      setError("We could not find a matching account. Please create one or check your details.");
      return;
    }

    setIsSubmitting(true);
    setUser({ name: account.name, email: account.email, isAuthenticated: true });
    showToast(`Welcome back, ${account.name.split(" ")[0]}!`);

    window.setTimeout(() => {
      setIsSubmitting(false);
      router.push("/profile");
    }, 180);
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Login" }]} />

        <div className="mx-auto max-w-xl rounded-[24px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] sm:p-8">
          <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Welcome back</div>
          <h1 className="mt-3 text-[2.2rem] font-semibold tracking-[-0.05em] text-[#222222]">Sign in</h1>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" className="flex items-center justify-center gap-2 rounded-[10px] border border-[#dddddd] bg-white px-4 py-3 text-sm font-medium text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]">
              <Chrome className="h-4 w-4" />
              Continue with Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 rounded-[10px] border border-[#dddddd] bg-white px-4 py-3 text-sm font-medium text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]">
              <Apple className="h-4 w-4" />
              Continue with Apple
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#6a6a6a]">
            <div className="h-px flex-1 bg-[#dddddd]" />
            Or
            <div className="h-px flex-1 bg-[#dddddd]" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error ? <div className="rounded-[12px] border border-[#f4c0c9] bg-[#fff5f7] px-4 py-3 text-sm text-[#9c1530]">{error}</div> : null}
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">
                <Mail className="h-3.5 w-3.5" />
                Email
              </span>
              <input
                value={formData.email}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">
                <LockKeyhole className="h-3.5 w-3.5" />
                Password
              </span>
              <input
                type="password"
                value={formData.password}
                onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none"
                placeholder="••••••••"
              />
            </label>

            <div className="flex items-center justify-between gap-3 text-sm text-[#6a6a6a]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-[#ff385c]" />
                Remember me
              </label>
              <Link href="/contact" className="transition hover:text-[#ff385c]">Forgot password?</Link>
            </div>

            <Button className="w-full justify-center" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#6a6a6a]">
            Don&apos;t have an account? <Link href="/register" className="font-medium text-[#222222] transition hover:text-[#ff385c]">Create one</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
