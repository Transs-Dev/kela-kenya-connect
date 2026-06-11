import { supabase } from "@/integrations/supabase/client";

/**
 * Upload a file to the public `media` bucket and return its public URL.
 */
export async function uploadToStorage(file: File, folder = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

/** Deprecated: kept for backwards-compat — please use uploadToStorage. */
export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/** Write an audit log entry. Safe to call anywhere — failures are swallowed. */
export async function logActivity(
  action: string,
  entity: string,
  entity_id?: string | null,
  details: Record<string, any> = {},
) {
  try {
    await supabase.from("audit_logs").insert({
      actor: "admin",
      action,
      entity,
      entity_id: entity_id ?? null,
      details,
    });
  } catch (e) {
    console.warn("audit log failed", e);
  }
}

export const tables = {
  clients: "clients",
  requests: "service_requests",
  messages: "messages",
  services: "services_mgmt",
  portfolio: "portfolio_items",
  testimonials: "testimonials",
  process: "process_stages",
  settings: "site_settings",
  slides: "homepage_slides",
  contactSubmissions: "contact_submissions",
  auditLogs: "audit_logs",
} as const;

export { supabase };
