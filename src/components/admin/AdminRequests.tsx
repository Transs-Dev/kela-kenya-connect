import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRequests } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const STATUSES = ["pending", "in_progress", "completed", "on_hold"];

export function AdminRequests() {
  const { data: requests = [] } = useRequests();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ client_name: "", client_email: "", service: "", description: "" });

  const create = async () => {
    if (!form.client_name || !form.service) return toast({ title: "Name & service required", variant: "destructive" });
    const { error } = await supabase.from("service_requests").insert(form);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setForm({ client_name: "", client_email: "", service: "", description: "" });
    setOpen(false);
    toast({ title: "Request created" });
  };

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from("service_requests").update(patch).eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else toast({ title: "Updated" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Service Requests</h2>
          <p className="text-muted-foreground">Manage all service requests in real time.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New Request</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Request</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Client name *" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
              <Input placeholder="Client email" value={form.client_email} onChange={(e) => setForm({ ...form, client_email: e.target.value })} />
              <Input placeholder="Service *" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Button onClick={create} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {requests.length === 0 ? (
        <Card className="border-none shadow-sm"><CardContent className="py-12 text-center text-muted-foreground">No requests yet.</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((r: any) => (
            <Card key={r.id} className="border-none shadow-sm">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-base">{r.service}</CardTitle>
                  <p className="text-sm text-muted-foreground">{r.client_name} {r.client_email && `· ${r.client_email}`}</p>
                </div>
                <Select value={r.status} onValueChange={(v) => update(r.id, { status: v })}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}</SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="space-y-3">
                {r.description && <p className="text-sm">{r.description}</p>}
                <Input placeholder="Assigned to" defaultValue={r.assigned_to ?? ""} onBlur={(e) => e.target.value !== (r.assigned_to ?? "") && update(r.id, { assigned_to: e.target.value })} />
                <Textarea placeholder="Internal notes" defaultValue={r.internal_notes ?? ""} onBlur={(e) => e.target.value !== (r.internal_notes ?? "") && update(r.id, { internal_notes: e.target.value })} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
