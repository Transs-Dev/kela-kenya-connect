import { useState } from "react";
import { Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Props { serviceTitle: string; serviceSlug: string; }

const ServiceBookingForm = ({ serviceTitle, serviceSlug }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", preferred_date: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast({ title: "Name and email are required", variant: "destructive" });
    setSubmitting(true);

    const { error: e1 } = await supabase.from("service_requests").insert({
      client_name: form.name,
      client_email: form.email,
      client_phone: form.phone || null,
      service_type: serviceTitle,
      preferred_date: form.preferred_date || null,
      notes: form.notes || null,
      status: "pending",
    });

    await supabase.from("messages").insert({
      sender_name: form.name,
      email: form.email,
      subject: `Booking: ${serviceTitle}`,
      body: `Phone: ${form.phone || "—"}\nPreferred date: ${form.preferred_date || "—"}\nService: ${serviceTitle} (${serviceSlug})\n\n${form.notes || ""}`,
      status: "unread",
    });

    setSubmitting(false);
    if (e1) return toast({ title: "Could not book", description: e1.message, variant: "destructive" });

    toast({ title: "Booking received", description: "Our team will reach out shortly." });
    setForm({ name: "", email: "", phone: "", preferred_date: "", notes: "" });
  };

  return (
    <div className="p-7 rounded-2xl bg-white dark:bg-gray-800 border border-pink-100 dark:border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
        <Calendar className="w-5 h-5 text-primary" />Book this service
      </h3>
      <p className="text-sm text-muted-foreground mb-5">Fill in the form — admin gets notified immediately.</p>
      <form onSubmit={submit} className="space-y-3">
        <Input placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input placeholder="Phone / WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input type="date" placeholder="Preferred date" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} />
        <Textarea rows={3} placeholder="Tell us more (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <Button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Send className="w-4 h-4 mr-2" />{submitting ? "Sending…" : "Request booking"}
        </Button>
      </form>
    </div>
  );
};

export default ServiceBookingForm;
