import { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTestimonials } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { logActivity } from "@/lib/adminApi";

const empty = { client_name: "", location: "", service: "", content: "", rating: 5, is_approved: true };

export function AdminTestimonials() {
  const { data: items = [] } = useTestimonials();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(empty);

  const save = async () => {
    if (!form.client_name || !form.content) return toast({ title: "Name & content required", variant: "destructive" });
    const { data, error } = await supabase.from("testimonials").insert({ ...form, rating: Number(form.rating) }).select().single();
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    await logActivity("create", "testimonials", data?.id, { client_name: form.client_name });
    qc.invalidateQueries({ queryKey: ["testimonials"] });
    setOpen(false); setForm(empty);
    toast({ title: "Added" });
  };

  const toggleApprove = async (t: any) => {
    await supabase.from("testimonials").update({ is_approved: !t.is_approved }).eq("id", t.id);
    await logActivity(t.is_approved ? "reject" : "approve", "testimonials", t.id, { client_name: t.client_name });
    qc.invalidateQueries({ queryKey: ["testimonials"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    await logActivity("delete", "testimonials", id);
    qc.invalidateQueries({ queryKey: ["testimonials"] });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground">Add, approve and remove client testimonials.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New Testimonial</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Testimonial</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Client name *" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
              <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <Input placeholder="Service used" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
              <Textarea placeholder="Testimonial *" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              <Input type="number" min={1} max={5} placeholder="Rating 1-5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
              <div className="flex items-center gap-2"><Switch checked={form.is_approved} onCheckedChange={(v) => setForm({ ...form, is_approved: v })} /><span>Approved</span></div>
              <Button onClick={save} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((t: any) => (
          <Card key={t.id} className="border-none shadow-sm">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{t.client_name}</h3>
                  <p className="text-xs text-muted-foreground">{t.location} {t.service && `· ${t.service}`}</p>
                </div>
                <div className="flex items-center gap-1">{Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}</div>
              </div>
              <p className="text-sm">{t.content}</p>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2 text-sm"><Switch checked={t.is_approved} onCheckedChange={() => toggleApprove(t)} /><span>{t.is_approved ? "Approved" : "Hidden"}</span></div>
                <Button size="sm" variant="ghost" onClick={() => remove(t.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
