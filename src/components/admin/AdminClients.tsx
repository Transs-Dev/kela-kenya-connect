import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useClients } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function AdminClients() {
  const { data: clients = [] } = useClients();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", notes: "" });

  const submit = async () => {
    if (!form.name) return toast({ title: "Name required", variant: "destructive" });
    const { error } = await supabase.from("clients").insert(form);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setForm({ name: "", email: "", phone: "", country: "", notes: "" });
    setOpen(false);
    toast({ title: "Client added" });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this client?")) return;
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Clients</h2>
          <p className="text-muted-foreground">Manage your client database.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Add Client</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Client</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input placeholder="Country (e.g. UK, USA)" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              <Textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              <Button onClick={submit} className="w-full">Save Client</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader><CardTitle>{clients.length} clients</CardTitle></CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No clients yet. Add your first client above.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Country</TableHead><TableHead></TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((c: any) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.country}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => remove(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
