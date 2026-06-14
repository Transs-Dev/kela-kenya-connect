import { useEffect, useState } from "react";
import { Link2 as Sparkles, X } from "lucide-react";

export function WelcomeBanner() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 20000);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[hsl(338,28%,62%)] p-6 text-primary-foreground shadow-lg animate-fade-in">
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-4 rounded-full p-1.5 transition-colors hover:bg-white/20"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-white/15 p-3">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Admin 👋</h2>
          <p className="mt-1 text-sm opacity-90">
            You're now managing Kela Assistance Services. All your data is live and updates in real time.
            This message will dismiss automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
