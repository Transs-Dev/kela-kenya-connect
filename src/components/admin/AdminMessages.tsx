import { Mail, Archive, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMessages, useContactSubmissions } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

export function AdminMessages() {
  const { data: messages = [] } = useMessages();
  const { data: contacts = [] } = useContactSubmissions();

  const all = [
    ...messages.map((m: any) => ({
      id: m.id, src: "messages", from: m.sender_name, email: m.email, subject: m.subject, body: m.body, status: m.status, when: m.created_at,
    })),
    ...contacts.map((c: any) => ({
      id: c.id, src: "contact_submissions", from: `${c.first_name} ${c.last_name}`, email: c.email, subject: "Contact form", body: c.message, status: c.status, when: c.submitted_at,
    })),
  ].sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime());

  const setStatus = async (src: string, id: string, status: string) => {
    const { error } = await supabase.from(src as any).update({ status }).eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Inbox</h2>
        <p className="text-muted-foreground">All incoming messages — updates live as they arrive.</p>
      </div>
      {all.length === 0 ? (
        <Card className="border-none shadow-sm"><CardContent className="py-12 text-center text-muted-foreground">No messages yet.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {all.map((m) => (
            <Card key={`${m.src}-${m.id}`} className={`border-none shadow-sm ${m.status === "unread" || m.status === "new" ? "border-l-4 border-l-primary" : ""}`}>
              <CardHeader className="flex flex-row justify-between items-start pb-2">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />{m.from}
                    {m.email && <span className="text-xs font-normal text-muted-foreground">· {m.email}</span>}
                  </CardTitle>
                  <p className="text-sm font-medium mt-1">{m.subject}</p>
                </div>
                <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(m.when), { addSuffix: true })}</span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{m.body}</p>
                <div className="flex gap-2 mt-4">
                  {m.email && <Button size="sm" variant="outline" asChild><a href={`mailto:${m.email}`}>Reply</a></Button>}
                  <Button size="sm" variant="ghost" onClick={() => setStatus(m.src, m.id, "read")}><Check className="w-4 h-4 mr-1" />Mark read</Button>
                  <Button size="sm" variant="ghost" onClick={() => setStatus(m.src, m.id, "archived")}><Archive className="w-4 h-4 mr-1" />Archive</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
