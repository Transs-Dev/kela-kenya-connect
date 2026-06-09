import { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Shield, 
  Bell, 
  Database,
  Save,
  CheckCircle2,
  Circle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdminProcess() {
  const journeySteps = [
    { id: 1, title: 'Inquiry Received', description: 'Client submits contact form or messages via WhatsApp.', status: 'completed' },
    { id: 2, title: 'Consultation', description: 'Discussion to understand unique needs and define scope.', status: 'completed' },
    { id: 3, title: 'Proposal & Quote', description: 'Tailored plan with transparent pricing sent to client.', status: 'current' },
    { id: 4, title: 'Onboarding', description: 'Agreement signed and initial documents/payments received.', status: 'upcoming' },
    { id: 5, title: 'Execution', description: 'Service delivery with regular progress updates.', status: 'upcoming' },
    { id: 6, title: 'Completion', description: 'Final handover, reporting and client feedback.', status: 'upcoming' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Process Tracking</h2>
        <p className="text-gray-500">Visualize and manage the client journey from first contact to completion.</p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100 hidden md:block"></div>
        <div className="space-y-12">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col md:flex-row gap-6 md:gap-12 group">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center shrink-0 z-10 transition-all shadow-sm",
                step.status === 'completed' ? "bg-green-500 text-white" :
                step.status === 'current' ? "bg-primary text-white scale-110 shadow-lg ring-4 ring-primary/10" :
                "bg-white border-2 border-gray-200 text-gray-400"
              )}>
                {step.status === 'completed' ? <CheckCircle2 className="w-8 h-8" /> : 
                 step.status === 'current' ? <div className="text-xl font-bold">{step.id}</div> : 
                 <Circle className="w-6 h-6" />}
              </div>
              
              <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  {step.status === 'current' && (
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      Current Stage
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">Edit Workflow</Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-primary">View Analytics</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminSettings() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings & Configuration</h2>
        <p className="text-gray-500">Manage your company profile, contact details and system preferences.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white border border-gray-100 p-1 rounded-xl shadow-sm mb-8 overflow-x-auto h-auto">
          <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2">General</TabsTrigger>
          <TabsTrigger value="contact" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2">Contact Info</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Update your public business information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Kela Assistance Services" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" defaultValue="Your bridge to Kenya from abroad" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <textarea 
                  id="description" 
                  className="w-full min-h-[100px] p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  defaultValue="Providing property, travel, construction, and daily assistance services for Kenyans living abroad."
                ></textarea>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>How clients can reach your business.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" /> Support Email
                    </Label>
                    <Input defaultValue="support@kelakenya.com" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" /> Phone Number
                    </Label>
                    <Input defaultValue="+254 712 345 678" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> Office Address
                    </Label>
                    <Input defaultValue="Nairobi, Kenya" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" /> Website URL
                    </Label>
                    <Input defaultValue="www.kelakenya.com" />
                  </div>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" /> Update Contact Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Manage your admin credentials and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPin">Current Admin PIN</Label>
                <Input id="currentPin" type="password" value="••••" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPin">New 4-Digit PIN</Label>
                <Input id="newPin" type="password" placeholder="Enter new PIN" maxLength={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPin">Confirm New PIN</Label>
                <Input id="confirmPin" type="password" placeholder="Confirm new PIN" maxLength={4} />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Update Security Credentials
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
