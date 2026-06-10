import { Users, FileText, Clock, CheckCircle, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminStats, useRequests, useMessages } from "@/hooks/useAdminData";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export function AdminOverview() {
  const { data: stats, isLoading } = useAdminStats();
  const { data: requests = [] } = useRequests();
  const { data: messages = [] } = useMessages();

  const cards = [
    { label: "Total Clients", value: stats?.clients ?? 0, icon: Users },
    { label: "New Inquiries", value: stats?.newInquiries ?? 0, icon: FileText },
    { label: "Active Requests", value: stats?.activeRequests ?? 0, icon: Clock },
    { label: "Completed Jobs", value: stats?.completed ?? 0, icon: CheckCircle },
    { label: "Unread Messages", value: stats?.unreadMessages ?? 0, icon: MessageSquare },
  ];

  const activity = [
    ...requests.slice(0, 5).map((r: any) => ({
      id: r.id, type: "Request", who: r.client_name, what: r.service, status: r.status, when: r.created_at,
    })),
    ...messages.slice(0, 5).map((m: any) => ({
      id: m.id, type: "Message", who: m.sender_name, what: m.subject || "(no subject)", status: m.status, when: m.created_at,
    })),
  ].sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime()).slice(0, 8);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Dashboard Overview</h2>
        <p className="text-muted-foreground">Live business metrics — synced from the cloud.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{c.label}</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10"><c.icon className="w-4 h-4 text-primary" /></div>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-7 w-12" /> : <div className="text-2xl font-bold">{c.value}</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No activity yet. Requests and messages will appear here in real time.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead><TableHead>From</TableHead><TableHead>Detail</TableHead>
                  <TableHead>Status</TableHead><TableHead className="text-right">When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.type}</TableCell>
                    <TableCell>{a.who}</TableCell>
                    <TableCell className="text-muted-foreground">{a.what}</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{a.status}</span></TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(a.when), { addSuffix: true })}
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
