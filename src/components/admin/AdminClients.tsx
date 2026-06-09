import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AdminClients() {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    { id: '1', name: 'James Kimani', email: 'james@example.com', phone: '+254 712 345 678', status: 'Active', projects: 2, lastContact: '2 days ago' },
    { id: '2', name: 'Sarah Wambui', email: 'sarah@example.com', phone: '+254 722 987 654', status: 'Active', projects: 1, lastContact: '5 days ago' },
    { id: '3', name: 'David Mwangi', email: 'david@example.com', phone: '+44 20 7123 4567', status: 'Inactive', projects: 0, lastContact: '1 month ago' },
    { id: '4', name: 'Esther Njeri', email: 'esther@example.com', phone: '+254 733 111 222', status: 'Active', projects: 3, lastContact: 'Today' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-500">View and manage your client profiles and history.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add New Client
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search clients by name, email or phone..." 
            className="pl-10 bg-gray-50/50 border-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-gray-200">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="w-[300px] font-semibold">Client</TableHead>
              <TableHead className="font-semibold">Contact Info</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Projects</TableHead>
              <TableHead className="font-semibold">Last Contact</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="group hover:bg-gray-50/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${client.name}`} />
                      <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{client.name}</span>
                      <span className="text-xs text-gray-500">ID: {client.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3.5 h-3.5" /> {client.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-3.5 h-3.5" /> {client.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={client.status === 'Active' ? 'default' : 'secondary'} className={cn(
                    "rounded-full px-2.5 py-0.5 font-medium",
                    client.status === 'Active' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600"
                  )}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-gray-700">
                  {client.projects} {client.projects === 1 ? 'Project' : 'Projects'}
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {client.lastContact}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <ExternalLink className="w-4 h-4 mr-2" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        View History
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600">
                        Deactivate Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
