import { supabase } from "@/integrations/supabase/client";

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

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
} as const;

export { supabase };
