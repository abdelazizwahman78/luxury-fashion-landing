"use client";

import { useEffect, useState } from "react";
import { subscribeToToasts } from "@/lib/toast";

type ToastMessage = {
  id: number;
  message: string;
};

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((nextToasts) => setToasts(nextToasts));
    return () => {
      unsubscribe();
    };
  }, []);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-full border border-[#dddddd] bg-white px-4 py-3 text-sm font-medium text-[#222222] shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
