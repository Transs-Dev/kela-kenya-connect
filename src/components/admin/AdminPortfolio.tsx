import { useState } from "react";
import { Plus, Trash2, Edit2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePortfolio } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { uploadToStorage, logActivity } from "@/lib/adminApi";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const empty = { id: "", title: "", description: "", image_url: "", category: "", sort_order: 0 };

export function AdminPortfolio() {
  const { data: items = [] } = usePortfolio();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(empty);
  const [uploading, setUploading] = useState(false);

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await fileToDataUrl(file);
      setForm({ ...form, image_url: url });
    } finally { setUploading(false); }
  };

  const save = async () => {
    if (!form.title) return toast({ title: "Title required", variant: "destructive" });
    const payload = { title: form.title, description: form.description, image_url: form.image_url, category: form.category, sort_order: Number(form.sort_order) || 0 };
    const { error } = form.id
      ? await supabase.from("portfolio_items").update(payload).eq("id", form.id)
      : await supabase.from("portfolio_items").insert(payload);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    qc.invalidateQueries({ queryKey: ["portfolio"] });
    setOpen(false); setForm(empty);
    toast({ title: "Saved" });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("portfolio_items").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["portfolio"] });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Portfolio</h2>
          <p className="text-muted-foreground">Manage projects shown on the public site.</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setForm(empty); }}>
          <DialogTrigger asChild><Button onClick={() => setForm(empty)}><Plus className="w-4 h-4 mr-2" />New Project</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{form.id ? "Edit" : "New"} Project</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <Input type="number" placeholder="Sort order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
              <label className="block">
                <span className="text-sm font-medium">Image (upload from your computer)</span>
                <div className="mt-2 flex items-center gap-2">
                  <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} className="text-sm" />
                  {uploading && <span className="text-xs text-muted-foreground">Processing…</span>}
                </div>
                {form.image_url && <img src={form.image_url} className="mt-3 h-32 rounded-lg object-cover" alt="" />}
              </label>
              <Button onClick={save} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p: any) => (
          <Card key={p.id} className="border-none shadow-sm overflow-hidden">
            {p.image_url && <img src={p.image_url} className="h-44 w-full object-cover" alt={p.title} />}
            <CardContent className="p-4 space-y-2">
              <h3 className="font-bold">{p.title}</h3>
              {p.category && <p className="text-xs uppercase tracking-wider text-primary font-semibold">{p.category}</p>}
              <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
              <div className="flex gap-2 pt-2 border-t">
                <Button size="sm" variant="ghost" onClick={() => { setForm(p); setOpen(true); }}><Edit2 className="w-4 h-4 mr-1" />Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4 mr-1 text-destructive" />Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
