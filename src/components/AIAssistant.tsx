import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What services do you offer?",
  "How do I book property management?",
  "Do you help with travel from abroad?",
  "How can I contact your team?",
];

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm Kela's AI assistant. Ask me anything about our property, travel and daily-assistance services." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", { body: { messages: next } });
      if (error) throw error;
      const reply = (data as any)?.reply || "Sorry, I couldn't generate a reply.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "I'm having trouble right now. Please WhatsApp us at +254 726 285869." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {open && (
        <div className="absolute bottom-20 right-0 w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-indigo-100 dark:border-gray-700 flex flex-col overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <div>
                <div className="font-semibold text-sm">Kela AI Assistant</div>
                <div className="text-[10px] opacity-90">Powered by Lovable AI</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-indigo-50/40 dark:bg-gray-800/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-indigo-600 text-white rounded-br-sm" : "bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-700 rounded-bl-sm"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-700 rounded-2xl px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                </div>
              </div>
            )}
            {messages.length <= 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-indigo-200 dark:border-gray-700 hover:bg-indigo-50">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-2 border-t border-indigo-100 dark:border-gray-700 flex gap-2 bg-white dark:bg-gray-900">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 px-3 py-2 text-sm rounded-full border border-indigo-100 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            />
            <button type="submit" disabled={loading || !input.trim()} className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 ring-4 ring-white dark:ring-gray-900"
        aria-label="Open AI assistant"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <Sparkles className="w-7 h-7 text-white drop-shadow" />}
      </button>
    </div>
  );
};

export default AIAssistant;
