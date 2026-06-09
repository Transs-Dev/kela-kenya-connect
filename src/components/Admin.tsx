import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminOverview } from './admin/AdminOverview';
import { AdminClients } from './admin/AdminClients';
import { AdminRequests } from './admin/AdminRequests';
import { AdminMessages } from './admin/AdminMessages';
import { AdminServices } from './admin/AdminServices';
import { AdminPortfolio } from './admin/AdminPortfolio';
import { AdminTestimonials } from './admin/AdminTestimonials';
import { AdminProcess, AdminSettings } from './admin/AdminProcessSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, LayoutDashboard, Menu } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const { toast } = useToast();

  const correctPin = '1200';

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the premium admin dashboard.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect PIN. Please try again.",
        variant: "destructive",
      });
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    setActiveSection('overview');
    toast({
      title: "Logged Out",
      description: "You have been securely logged out.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 animate-fade-in">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Operations Portal</h1>
            <p className="text-gray-500">Secure access for Kela Assistance administrators</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 animate-scale-in">
            <form onSubmit={handlePinSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Enter Admin PIN</label>
                <div className="relative">
                  <Input
                    type={showPin ? "text" : "password"}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••"
                    className="h-14 text-2xl tracking-[1em] text-center font-bold bg-gray-50 border-gray-100 focus:bg-white transition-all"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" 
                disabled={pin.length !== 4}
              >
                Unlock Dashboard
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                Unauthorized access is strictly prohibited. <br />
                All activity is logged and monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <AdminOverview />;
      case 'clients': return <AdminClients />;
      case 'requests': return <AdminRequests />;
      case 'messages': return <AdminMessages />;
      case 'services': return <AdminServices />;
      case 'portfolio': return <AdminPortfolio />;
      case 'testimonials': return <AdminTestimonials />;
      case 'process': return <AdminProcess />;
      case 'settings': return <AdminSettings />;
      default: return <AdminOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50/50">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
          onLogout={handleLogout} 
        />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 border-b bg-white flex items-center justify-between px-8 shrink-0 z-20 sticky top-0">
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                {/* Mobile Trigger would go here if using SidebarTrigger */}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 capitalize">{activeSection}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-gray-900">Operations Manager</span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Super Admin</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-600">
                AD
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto pb-12">
              {renderSection()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
