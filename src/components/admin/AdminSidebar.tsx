import { LayoutDashboard, Users, MessageSquare, Settings, Briefcase, Star, FileText, Clock, LogOut, ChevronRight, Image, Activity, Images, Mic } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface Props { activeSection: string; onSectionChange: (s: string) => void; onLogout: () => void; }

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "homepage", label: "Homepage Slides", icon: Image },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "podcasts", label: "Podcasts", icon: Mic },
  { id: "clients", label: "Clients", icon: Users },
  { id: "requests", label: "Service Requests", icon: Clock },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "portfolio", label: "Portfolio", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "process", label: "Process Tracking", icon: ChevronRight },
  { id: "audit", label: "Activity Log", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ activeSection, onSectionChange, onLogout }: Props) {
  return (
    <Sidebar collapsible="icon" className="border-r bg-white">
      <SidebarHeader className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">K</div>
          <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">Kela Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={activeSection === item.id}
                    className={cn("flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2", activeSection === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted")}
                    tooltip={item.label}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onLogout} className="text-destructive hover:bg-destructive/10" tooltip="Logout">
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
