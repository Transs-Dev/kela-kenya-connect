import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const list = async (table: string, order = "created_at", asc = false) => {
  const { data, error } = await supabase.from(table as any).select("*").order(order, { ascending: asc });
  if (error) throw error;
  return data ?? [];
};

const count = async (table: string, filter?: (q: any) => any) => {
  let q = supabase.from(table as any).select("*", { count: "exact", head: true });
  if (filter) q = filter(q);
  const { count: c, error } = await q;
  if (error) throw error;
  return c ?? 0;
};

export function useRealtime(table: string, queryKey: string[]) {
  const qc = useQueryClient();
  useEffect(() => {
    const ch = supabase
      .channel(`rt-${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => {
        qc.invalidateQueries({ queryKey });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [table, queryKey.join("|")]);
}

export const useClients = () => {
  useRealtime("clients", ["clients"]);
  return useQuery({ queryKey: ["clients"], queryFn: () => list("clients") });
};
export const useRequests = () => {
  useRealtime("service_requests", ["requests"]);
  return useQuery({ queryKey: ["requests"], queryFn: () => list("service_requests") });
};
export const useMessages = () => {
  useRealtime("messages", ["messages"]);
  return useQuery({ queryKey: ["messages"], queryFn: () => list("messages") });
};
export const useContactSubmissions = () => {
  useRealtime("contact_submissions", ["contact_submissions"]);
  return useQuery({
    queryKey: ["contact_submissions"],
    queryFn: () => list("contact_submissions", "submitted_at"),
  });
};
export const useServicesMgmt = () =>
  useQuery({ queryKey: ["services_mgmt"], queryFn: () => list("services_mgmt", "sort_order", true) });
export const usePortfolio = () =>
  useQuery({ queryKey: ["portfolio"], queryFn: () => list("portfolio_items", "sort_order", true) });
export const useTestimonials = () =>
  useQuery({ queryKey: ["testimonials"], queryFn: () => list("testimonials") });
export const useProcessStages = () =>
  useQuery({ queryKey: ["process_stages"], queryFn: () => list("process_stages", "step_number", true) });
export const useSlides = () =>
  useQuery({ queryKey: ["slides"], queryFn: () => list("homepage_slides", "sort_order", true) });

export const useAdminStats = () => {
  useRealtime("service_requests", ["admin-stats"]);
  useRealtime("messages", ["admin-stats"]);
  useRealtime("clients", ["admin-stats"]);
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [clients, newInquiries, activeRequests, completed, unreadMessages] = await Promise.all([
        count("clients"),
        count("service_requests", (q) => q.eq("status", "pending")),
        count("service_requests", (q) => q.in("status", ["pending", "in_progress"])),
        count("service_requests", (q) => q.eq("status", "completed")),
        count("messages", (q) => q.eq("status", "unread")),
      ]);
      return { clients, newInquiries, activeRequests, completed, unreadMessages };
    },
  });
};

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, any> = {};
      (data ?? []).forEach((r: any) => { map[r.key] = r.value; });
      return map;
    },
  });
