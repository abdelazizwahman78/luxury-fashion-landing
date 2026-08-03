"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Lock, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = ["Shipping", "Billing", "Payment", "Review"];

export function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);

  const nextStep = () => setStep((current) => Math.min(current + 1, steps.length - 1));
  const prevStep = () => setStep((current) => Math.max(current - 1, 0));

  const renderStepContent = () => {
    if (success) {
      return (
        <div className="rounded-[20px] border border-[#dddddd] bg-white p-8 text-center shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c]">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-[#222222]">Order confirmed.</h2>
          <p className="mt-3 text-base text-[#6a6a6a]">Your premium essentials are being prepared for dispatch, and a confirmation email will be sent shortly.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/products" className="inline-flex items-center rounded-[8px] border border-[#dddddd] bg-white px-5 py-3 text-sm font-medium text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]">
              Continue shopping
            </Link>
            <Link href="/profile" className="inline-flex items-center rounded-[8px] bg-[#ff385c] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#e00b41]">
              View orders
            </Link>
          </div>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">First name</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="Amelia" />
              </label>
              <label className="text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Last name</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="Hart" />
              </label>
            </div>
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Address</span>
              <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="40 Mercer Street" />
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">City</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="New York" />
              </label>
              <label className="text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">State</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="NY" />
              </label>
              <label className="text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">ZIP</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="10013" />
              </label>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Billing address</span>
              <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="Same as shipping" />
            </label>
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Company</span>
              <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="AURELIA Studio" />
            </label>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-sm text-[#222222]">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Card number</span>
              <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="4242 4242 4242 4242" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Expiry</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="02 / 29" />
              </label>
              <label className="text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">CVC</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" defaultValue="264" />
              </label>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="rounded-[14px] bg-[#f7f7f7] p-4">
              <div className="flex items-center justify-between gap-3 text-sm text-[#222222]">
                <span>Madison Tailored Blazer</span>
                <span>$420</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-sm text-[#222222]">
                <span>Shipping</span>
                <span>$12</span>
              </div>
            </div>
            <div className="rounded-[14px] bg-[#f7f7f7] p-4 text-sm text-[#6a6a6a]">
              Billing to Amelia Hart · 40 Mercer Street · New York, NY 10013
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Secure checkout</div>
          <h1 className="mt-2 text-[2.3rem] font-semibold tracking-[-0.05em] text-[#222222] lg:text-[4rem]">Complete your order.</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#dddddd] bg-white px-4 py-2 text-sm text-[#222222]">
          <ShieldCheck className="h-4 w-4 text-[#ff385c]" />
          Secure checkout
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <div className="mb-8 grid gap-3 sm:grid-cols-4">
            {steps.map((item, index) => (
              <div key={item} className={`rounded-[12px] px-3 py-3 text-center text-[0.68rem] font-medium uppercase tracking-[0.28em] ${
                index === step ? "bg-[#ff385c] text-white" : index < step ? "bg-[#f7f7f7] text-[#222222]" : "border border-[#dddddd] bg-white text-[#6a6a6a]"
              }`}>
                {item}
              </div>
            ))}
          </div>

          {renderStepContent()}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button variant="secondary" onClick={prevStep} disabled={step === 0 || success}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={nextStep}>Continue</Button>
            ) : (
              <Button onClick={() => setSuccess(true)}>Place order</Button>
            )}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Order summary</div>
            <div className="mt-5 space-y-3 text-sm text-[#222222]">
              <div className="flex items-center justify-between"><span>Madison Tailored Blazer</span><span>$420</span></div>
              <div className="flex items-center justify-between"><span>Skyline Leather Tote</span><span>$280</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>$12</span></div>
              <div className="flex items-center justify-between"><span>Promo code</span><span className="text-[#ff385c]">- $35</span></div>
              <div className="border-t border-[#dddddd] pt-3 text-base font-semibold"><span>Total</span><span>$677</span></div>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222]">
              <input className="w-full bg-transparent text-sm outline-none" defaultValue="FALL2026" />
              <button type="button" className="rounded-full bg-[#222222] px-3 py-2 text-[0.62rem] uppercase tracking-[0.25em] text-white">Apply</button>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 text-sm text-[#222222]">
              <Truck className="h-4 w-4 text-[#ff385c]" />
              <span>Delivery estimate: 5–7 business days</span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-[#222222]">
              <Lock className="h-4 w-4 text-[#ff385c]" />
              <span>Encrypted and protected checkout</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
