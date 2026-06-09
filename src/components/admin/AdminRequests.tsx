import { useState } from 'react';
import { Search, Filter, MoreHorizontal, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
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

export function AdminRequests() {
  const [activeFilter, setActiveFilter] = useState('All');

  const requests = [
    { id: 'REQ-001', client: 'James Kimani', service: 'Property Management', status: 'Pending', date: 'Oct 12, 2023', priority: 'High' },
    { id: 'REQ-002', client: 'Sarah Wambui', service: 'Construction', status: 'In Progress', date: 'Oct 10, 2023', priority: 'Medium' },
    { id: 'REQ-003', client: 'David Mwangi', service: 'Travel Planning', status: 'Completed', date: 'Oct 05, 2023', priority: 'Low' },
    { id: 'REQ-004', client: 'Esther Njeri', service: 'Daily Tasks', status: 'Pending', date: 'Oct 14, 2023', priority: 'High' },
  ];

  const statusIcons: Record<string, any> = {
    'Pending': <Clock className="w-4 h-4 text-orange-500" />,
    'In Progress': <AlertCircle className="w-4 h-4 text-blue-500" />,
    'Completed': <CheckCircle className="w-4 h-4 text-green-500" />,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
        <p className="text-gray-500">Track and manage all incoming service requests from clients.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-100">
          {['All', 'Pending', 'In Progress', 'Completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeFilter === filter
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search requests..." 
              className="pl-10 bg-white border-gray-100"
            />
          </div>
          <Button variant="outline" className="border-gray-200 bg-white">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="w-[120px] font-semibold text-gray-700">Request ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Client</TableHead>
              <TableHead className="font-semibold text-gray-700">Service Type</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Date Received</TableHead>
              <TableHead className="font-semibold text-gray-700">Priority</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-mono text-xs font-semibold text-gray-600">
                  {request.id}
                </TableCell>
                <TableCell className="font-medium text-gray-900">{request.client}</TableCell>
                <TableCell className="text-gray-600">{request.service}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {statusIcons[request.status]}
                    <span className="text-sm font-medium">{request.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {request.date}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    "rounded-full px-2 py-0.5 border-none",
                    request.priority === 'High' ? "bg-red-50 text-red-700" :
                    request.priority === 'Medium' ? "bg-orange-50 text-orange-700" :
                    "bg-blue-50 text-blue-700"
                  )}>
                    {request.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Manage Request</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <FileText className="w-4 h-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Add Admin Note
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Upload Document
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600">
                        Archive Request
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
