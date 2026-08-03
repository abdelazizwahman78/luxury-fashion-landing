type ToastItem = {
  id: number;
  message: string;
};

const toasts: ToastItem[] = [];
const listeners = new Set<(items: ToastItem[]) => void>();
let counter = 0;

export function showToast(message: string, duration = 2200) {
  if (typeof window === "undefined") {
    return;
  }

  const toast = { id: ++counter, message };
  toasts.push(toast);
  emit();

  window.setTimeout(() => {
    const index = toasts.findIndex((item) => item.id === toast.id);
    if (index >= 0) {
      toasts.splice(index, 1);
      emit();
    }
  }, duration);
}

export function subscribeToToasts(listener: (items: ToastItem[]) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  const snapshot = [...toasts];
  listeners.forEach((listener) => listener(snapshot));
}
