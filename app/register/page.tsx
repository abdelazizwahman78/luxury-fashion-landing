"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Apple, ArrowRight, Chrome } from "lucide-react";
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

const saveStoredAccounts = (accounts: StoredAccount[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }
};

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", agreed: false });
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

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please add your first and last name.");
      return;
    }

    if (!formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError("Please fill out the email, password, and confirmation fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Your password should be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (!formData.agreed) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    const accounts = getStoredAccounts();
    const existing = accounts.find((item) => item.email.toLowerCase() === formData.email.toLowerCase());

    if (existing) {
      setError("An account with this email already exists. Sign in instead.");
      return;
    }

    const nextAccount = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };

    saveStoredAccounts([...accounts, nextAccount]);
    setIsSubmitting(true);
    setUser({ name: nextAccount.name, email: nextAccount.email, isAuthenticated: true });
    showToast(`Welcome to AURELIA, ${formData.firstName}!`);

    window.setTimeout(() => {
      setIsSubmitting(false);
      router.push("/profile");
    }, 180);
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Register" }]} />

        <div className="mx-auto max-w-xl rounded-[24px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] sm:p-8">
          <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Create account</div>
          <h1 className="mt-3 text-[2.2rem] font-semibold tracking-[-0.05em] text-[#222222]">Register</h1>

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
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">First name</span>
                <input
                  value={formData.firstName}
                  onChange={(event) => setFormData((current) => ({ ...current, firstName: event.target.value }))}
                  className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none"
                  placeholder="Amelia"
                />
              </label>
              <label className="block text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Last name</span>
                <input
                  value={formData.lastName}
                  onChange={(event) => setFormData((current) => ({ ...current, lastName: event.target.value }))}
                  className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none"
                  placeholder="Hart"
                />
              </label>
            </div>
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Email</span>
              <input
                value={formData.email}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Password</span>
              <input
                type="password"
                value={formData.password}
                onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none"
                placeholder="Create a password"
              />
            </label>
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Confirm password</span>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(event) => setFormData((current) => ({ ...current, confirmPassword: event.target.value }))}
                className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none"
                placeholder="Repeat password"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-[#6a6a6a]">
              <input
                type="checkbox"
                checked={formData.agreed}
                onChange={(event) => setFormData((current) => ({ ...current, agreed: event.target.checked }))}
                className="h-4 w-4 accent-[#ff385c]"
              />
              I agree to the terms and privacy policy.
            </label>

            <Button className="w-full justify-center" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Register"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#6a6a6a]">
            Already have an account? <Link href="/login" className="font-medium text-[#222222] transition hover:text-[#ff385c]">Sign in</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
