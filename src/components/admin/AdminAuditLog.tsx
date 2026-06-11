import { useEffect, useState } from "react";
import { Activity, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

export function AdminAuditLog() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("");

  const { data: logs = [] } = useQuery({
    queryKey: ["audit_logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    const ch = supabase
      .channel("rt-audit_logs")
      .on("postgres_changes", { event: "*", schema: "public", table: "audit_logs" }, () =>
        qc.invalidateQueries({ queryKey: ["audit_logs"] }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [qc]);

  const filtered = logs.filter((l: any) =>
    !filter ||
    [l.action, l.entity, l.entity_id, JSON.stringify(l.details)].join(" ").toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Activity className="w-6 h-6 text-primary" />Activity Log</h2>
          <p className="text-muted-foreground">Every admin action is recorded here in real time.</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Filter…" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-64" />
          <button onClick={() => qc.invalidateQueries({ queryKey: ["audit_logs"] })} className="p-2 rounded-md hover:bg-muted">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-0 divide-y">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">No activity recorded yet.</div>
          ) : (
            filtered.map((l: any) => (
              <div key={l.id} className="p-4 flex items-start justify-between gap-4 hover:bg-muted/40">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="border-primary/30 text-primary capitalize">{l.action}</Badge>
                    <span className="text-sm font-medium capitalize">{l.entity.replace(/_/g, " ")}</span>
                    {l.entity_id && <span className="text-xs text-muted-foreground font-mono">{l.entity_id.slice(0, 8)}</span>}
                  </div>
                  {l.details && Object.keys(l.details).length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {Object.entries(l.details).map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`).join(" · ")}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-semibold">{l.actor}</div>
                  <div className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(l.created_at), { addSuffix: true })}</div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
