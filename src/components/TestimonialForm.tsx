import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TestimonialForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ client_name: "", location: "", service: "", content: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client_name || !form.content) {
      return toast({ title: "Please add your name and testimonial", variant: "destructive" });
    }
    setSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      client_name: form.client_name,
      location: form.location || null,
      service: form.service || null,
      content: form.content,
      rating: form.rating,
      is_approved: false,
    });
    setSubmitting(false);
    if (error) return toast({ title: "Could not submit", description: error.message, variant: "destructive" });

    // Also log a message for admin
    await supabase.from("messages").insert({
      sender_name: form.client_name,
      email: null,
      subject: "New testimonial submitted",
      body: form.content,
      status: "unread",
    });

    toast({ title: "Thank you!", description: "Your testimonial will appear after review." });
    setForm({ client_name: "", location: "", service: "", content: "", rating: 5 });
  };

  return (
    <section id="share-testimonial" className="py-20 bg-pink-50/40 dark:bg-gray-900/60">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Share your experience</h2>
          <p className="text-muted-foreground">Have we helped you? We'd love to hear your story.</p>
        </div>
        <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Your name *" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
            <Input placeholder="Location (e.g. London, UK)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <Input placeholder="Service we delivered (optional)" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
          <Textarea rows={5} placeholder="Tell us about your experience *" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} onClick={() => setForm({ ...form, rating: n })}>
                <Star className={`w-6 h-6 ${n <= form.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <Button type="submit" disabled={submitting} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Send className="w-4 h-4 mr-2" />{submitting ? "Submitting…" : "Submit testimonial"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default TestimonialForm;
