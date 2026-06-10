import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useServicesMgmt } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const empty = { id: "", title: "", slug: "", description: "", icon: "Sparkles", sort_order: 0, is_published: true };

export function AdminServices() {
  const { data: services = [] } = useServicesMgmt();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(empty);

  const save = async () => {
    if (!form.title || !form.slug) return toast({ title: "Title & slug required", variant: "destructive" });
    const payload = { title: form.title, slug: form.slug, description: form.description, icon: form.icon, sort_order: Number(form.sort_order) || 0, is_published: form.is_published };
    const { error } = form.id
      ? await supabase.from("services_mgmt").update(payload).eq("id", form.id)
      : await supabase.from("services_mgmt").insert(payload);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["services_mgmt"] });
    setOpen(false);
    setForm(empty);
    toast({ title: "Saved" });
  };

  const togglePublish = async (s: any) => {
    await supabase.from("services_mgmt").update({ is_published: !s.is_published }).eq("id", s.id);
    qc.invalidateQueries({ queryKey: ["services_mgmt"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services_mgmt").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["services_mgmt"] });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Services</h2>
          <p className="text-muted-foreground">Create, edit and publish services shown on the website.</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setForm(empty); }}>
          <DialogTrigger asChild><Button onClick={() => setForm(empty)}><Plus className="w-4 h-4 mr-2" />New Service</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{form.id ? "Edit" : "New"} Service</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input placeholder="Slug * (e.g. property-management)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Input placeholder="Icon (lucide name, e.g. Home)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              <Input type="number" placeholder="Sort order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
              <div className="flex items-center gap-2"><Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} /><span>Published</span></div>
              <Button onClick={save} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((s: any) => (
          <Card key={s.id} className="border-none shadow-sm">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">/{s.slug}</p>
                </div>
                <Switch checked={s.is_published} onCheckedChange={() => togglePublish(s)} />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{s.description}</p>
              <div className="flex gap-2 pt-2 border-t">
                <Button size="sm" variant="ghost" onClick={() => { setForm(s); setOpen(true); }}><Edit2 className="w-4 h-4 mr-1" />Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="w-4 h-4 mr-1 text-destructive" />Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
