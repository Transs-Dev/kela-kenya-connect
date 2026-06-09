import { useState } from 'react';
import { Plus, Edit2, Trash2, Power, Briefcase, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

export function AdminServices() {
  const [services, setServices] = useState([
    { id: 1, name: 'Property Management', category: 'Real Estate', status: 'Enabled', inquiries: 24, description: 'Rent collection, maintenance and tenant care while you live abroad.' },
    { id: 2, name: 'Construction Management', category: 'Construction', status: 'Enabled', inquiries: 15, description: 'End-to-end oversight of your build, from foundation to handover.' },
    { id: 3, name: 'Travel Planning', category: 'Lifestyle', status: 'Enabled', inquiries: 12, description: 'Flights, stays and itineraries — planned to feel effortless.' },
    { id: 4, name: 'Daily Task Assistance', category: 'General', status: 'Disabled', inquiries: 42, description: 'Errands, appointments and documents — handled for you in Kenya.' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
          <p className="text-gray-500">Enable, disable or edit the services you offer to clients.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className={cn(
            "overflow-hidden border-none shadow-sm transition-all hover:shadow-md",
            service.status === 'Disabled' && "opacity-80"
          )}>
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{service.name}</h3>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{service.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 mr-1">
                      {service.status === 'Enabled' ? 'Visible' : 'Hidden'}
                    </span>
                    <Switch 
                      checked={service.status === 'Enabled'} 
                      onCheckedChange={(checked) => {
                        setServices(services.map(s => 
                          s.id === service.id ? { ...s, status: checked ? 'Enabled' : 'Disabled' } : s
                        ));
                      }}
                    />
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-6 line-clamp-2 min-h-[40px]">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Total Inquiries</span>
                      <span className="font-bold text-gray-900">{service.inquiries}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-gray-900">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
