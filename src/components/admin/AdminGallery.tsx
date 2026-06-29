import { useRef, useState } from "react";
import { Trash2, Upload, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useGallery } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { uploadToStorage, logActivity } from "@/lib/adminApi";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export function AdminGallery() {
  const { data: items = [] } = useGallery();
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onUpload = async (files: FileList) => {
    setUploading(true);
    setProgress({ done: 0, total: files.length });
    try {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const url = await uploadToStorage(f, "gallery");
        const { data, error } = await supabase.from("gallery_items").insert({
          image_url: url,
          title: f.name.replace(/\.[^.]+$/, ""),
          sort_order: items.length + i,
          is_featured: false,
        }).select().single();
        if (error) throw error;
        await logActivity("create", "gallery_items", data?.id, { title: f.name });
        setProgress({ done: i + 1, total: files.length });
      }
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast({ title: `${files.length} image${files.length > 1 ? "s" : ""} uploaded` });
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
      setProgress(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const toggleFeatured = async (it: any) => {
    await supabase.from("gallery_items").update({ is_featured: !it.is_featured }).eq("id", it.id);
    await logActivity(it.is_featured ? "unfeature" : "feature", "gallery_items", it.id);
    qc.invalidateQueries({ queryKey: ["gallery"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery_items").delete().eq("id", id);
    await logActivity("delete", "gallery_items", id);
    qc.invalidateQueries({ queryKey: ["gallery"] });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Gallery</h2>
        <p className="text-muted-foreground">Upload multiple images at once. Mark featured items to show on the homepage preview.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="w-4 h-4" />{uploading ? `Uploading ${progress?.done}/${progress?.total}…` : "Upload images (multiple)"}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && e.target.files.length > 0 && onUpload(e.target.files)}
            />
          </label>
          <p className="text-xs text-muted-foreground">Tip: hold Ctrl/Cmd to select multiple photos. Each image is saved to cloud storage.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it: any) => (
          <Card key={it.id} className="border-none shadow-sm overflow-hidden">
            <img src={it.image_url} className="h-40 w-full object-cover" alt={it.title || ""} />
            <CardContent className="p-3 space-y-2">
              <p className="text-xs truncate font-medium">{it.title || "Untitled"}</p>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <Switch checked={it.is_featured} onCheckedChange={() => toggleFeatured(it)} />
                  <Star className={`w-3 h-3 ${it.is_featured ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                </label>
                <Button size="sm" variant="ghost" onClick={() => remove(it.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
