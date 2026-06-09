import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Briefcase,
  Star,
  FileText,
  Clock,
  LogOut,
  ChevronRight,
  Menu,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'requests', label: 'Service Requests', icon: Clock },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'portfolio', label: 'Portfolio', icon: FileText },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'process', label: 'Process Tracking', icon: ChevronRight },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar({ activeSection, onSectionChange, onLogout }: AdminSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="border-r bg-white">
      <SidebarHeader className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            K
          </div>
          <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">
            Kela Admin
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={activeSection === item.id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mx-2",
                      activeSection === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    )}
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
            <SidebarMenuButton
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors w-full mx-2"
              tooltip="Logout"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
