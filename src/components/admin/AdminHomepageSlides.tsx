import { useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useSlides } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { uploadToStorage, logActivity } from "@/lib/adminApi";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export function AdminHomepageSlides() {
  const { data: slides = [] } = useSlides();
  const qc = useQueryClient();
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await fileToDataUrl(file);
      const { error } = await supabase.from("homepage_slides").insert({
        image_url: url, caption, sort_order: slides.length, is_active: true,
      });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["slides"] });
      setCaption("");
      toast({ title: "Slide added" });
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally { setUploading(false); }
  };

  const toggle = async (s: any) => {
    await supabase.from("homepage_slides").update({ is_active: !s.is_active }).eq("id", s.id);
    qc.invalidateQueries({ queryKey: ["slides"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete slide?")) return;
    await supabase.from("homepage_slides").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["slides"] });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Homepage Slideshow</h2>
        <p className="text-muted-foreground">Upload background images shown on the homepage hero slideshow.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6 space-y-4">
          <Input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} />
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="w-4 h-4" />{uploading ? "Uploading..." : "Upload image from computer"}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
          </label>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((s: any) => (
          <Card key={s.id} className="border-none shadow-sm overflow-hidden">
            <img src={s.image_url} className="h-40 w-full object-cover" alt={s.caption || ""} />
            <CardContent className="p-4 space-y-2">
              {s.caption && <p className="text-sm">{s.caption}</p>}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm"><Switch checked={s.is_active} onCheckedChange={() => toggle(s)} /><span>{s.is_active ? "Active" : "Hidden"}</span></div>
                <Button size="sm" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
