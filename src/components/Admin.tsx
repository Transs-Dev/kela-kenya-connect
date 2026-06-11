import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin/AdminSidebar";
import { AdminOverview } from "./admin/AdminOverview";
import { AdminClients } from "./admin/AdminClients";
import { AdminRequests } from "./admin/AdminRequests";
import { AdminMessages } from "./admin/AdminMessages";
import { AdminServices } from "./admin/AdminServices";
import { AdminPortfolio } from "./admin/AdminPortfolio";
import { AdminTestimonials } from "./admin/AdminTestimonials";
import { AdminProcess, AdminSettings } from "./admin/AdminProcessSettings";
import { AdminHomepageSlides } from "./admin/AdminHomepageSlides";
import { AdminAuditLog } from "./admin/AdminAuditLog";
import { WelcomeBanner } from "./admin/WelcomeBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, LayoutDashboard } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const { toast } = useToast();
  const correctPin = "1200";

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthenticated(true);
      toast({ title: "Access Granted", description: "Welcome to the admin dashboard." });
    } else {
      toast({ title: "Access Denied", description: "Incorrect PIN.", variant: "destructive" });
      setPin("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin("");
    setActiveSection("overview");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Operations Portal</h1>
            <p className="text-muted-foreground">Secure access for Kela Assistance administrators</p>
          </div>
          <div className="bg-card rounded-3xl shadow-xl p-8 border">
            <form onSubmit={handlePinSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Enter Admin PIN</label>
                <div className="relative">
                  <Input type={showPin ? "text" : "password"} value={pin} onChange={(e) => setPin(e.target.value)} placeholder="••••" className="h-14 text-2xl tracking-[1em] text-center font-bold" maxLength={4} />
                  <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-14 text-lg font-bold" disabled={pin.length !== 4}>Unlock Dashboard</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <AdminOverview />;
      case "homepage": return <AdminHomepageSlides />;
      case "clients": return <AdminClients />;
      case "requests": return <AdminRequests />;
      case "messages": return <AdminMessages />;
      case "services": return <AdminServices />;
      case "portfolio": return <AdminPortfolio />;
      case "testimonials": return <AdminTestimonials />;
      case "process": return <AdminProcess />;
      case "settings": return <AdminSettings />;
      default: return <AdminOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} onLogout={handleLogout} />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 border-b bg-background flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <LayoutDashboard className="w-4 h-4" /><span>Admin</span><span>/</span>
              <span className="text-foreground capitalize">{activeSection}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold">Operations Manager</span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Super Admin</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-muted border flex items-center justify-center font-bold">AD</div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto pb-12">
              {activeSection === "overview" && <WelcomeBanner />}
              {renderSection()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
