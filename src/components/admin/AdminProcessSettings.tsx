import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProcessStages, useSiteSettings } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { logActivity } from "@/lib/adminApi";

export function AdminProcess() {
  const { data: stages = [] } = useProcessStages();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", step_number: 1, is_active: true });

  const save = async () => {
    if (!form.title) return toast({ title: "Title required", variant: "destructive" });
    const { error } = await supabase.from("process_stages").insert({ ...form, step_number: Number(form.step_number) });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["process_stages"] });
    setOpen(false); setForm({ title: "", description: "", step_number: 1, is_active: true });
    toast({ title: "Added" });
  };

  const update = async (id: string, patch: any) => {
    await supabase.from("process_stages").update(patch).eq("id", id);
    qc.invalidateQueries({ queryKey: ["process_stages"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("process_stages").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["process_stages"] });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Process Tracking</h2>
          <p className="text-muted-foreground">Manage client journey stages displayed on the website.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New Stage</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Stage</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Input type="number" placeholder="Step number" value={form.step_number} onChange={(e) => setForm({ ...form, step_number: Number(e.target.value) })} />
              <Button onClick={save} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {stages.map((s: any) => (
          <Card key={s.id} className="border-none shadow-sm">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">{s.step_number}</div>
              <div className="flex-1 space-y-1">
                <Input defaultValue={s.title} onBlur={(e) => e.target.value !== s.title && update(s.id, { title: e.target.value })} className="font-semibold" />
                <Textarea defaultValue={s.description ?? ""} onBlur={(e) => e.target.value !== s.description && update(s.id, { description: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Switch checked={s.is_active} onCheckedChange={(v) => update(s.id, { is_active: v })} />
                <Button size="sm" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AdminSettings() {
  const { data: settings = {} } = useSiteSettings();
  const qc = useQueryClient();
  const [contact, setContact] = useState<any>({});
  const [branding, setBranding] = useState<any>({});
  const [homepage, setHomepage] = useState<any>({});
  const [social, setSocial] = useState<any>({});

  useEffect(() => {
    setContact(settings.contact ?? {});
    setBranding(settings.branding ?? {});
    setHomepage(settings.homepage ?? {});
    setSocial(settings.social ?? {});
  }, [settings]);

  const saveKey = async (key: string, value: any) => {
    const { error } = await supabase.from("site_settings").update({ value, updated_at: new Date().toISOString() }).eq("key", key);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["site_settings"] });
    toast({ title: `${key} saved` });
  };

  const Section = ({ title, state, setState, fields, sectionKey }: any) => (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6 space-y-3">
        <h3 className="font-bold text-lg">{title}</h3>
        {fields.map((f: string) => (
          <div key={f}>
            <label className="text-xs text-muted-foreground capitalize">{f}</label>
            <Input value={state[f] ?? ""} onChange={(e) => setState({ ...state, [f]: e.target.value })} />
          </div>
        ))}
        <Button onClick={() => saveKey(sectionKey, state)}>Save {title}</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <p className="text-muted-foreground">Update content shown across the website — changes save to the cloud and reflect live.</p>
      </div>
      <Section title="Contact" state={contact} setState={setContact} fields={["phone", "email", "whatsapp", "address"]} sectionKey="contact" />
      <Section title="Branding" state={branding} setState={setBranding} fields={["brandName", "tagline"]} sectionKey="branding" />
      <Section title="Homepage" state={homepage} setState={setHomepage} fields={["heroTitle", "heroSubtitle"]} sectionKey="homepage" />
      <Section title="Social Links" state={social} setState={setSocial} fields={["facebook", "instagram", "twitter", "linkedin"]} sectionKey="social" />
    </div>
  );
}
