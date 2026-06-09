import { Users, FileText, Clock, CheckCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export function AdminOverview() {
  const stats = [
    { label: 'Total Clients', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+12%', positive: true },
    { label: 'New Inquiries', value: '8', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', change: '+2', positive: true },
    { label: 'Active Requests', value: '15', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', change: '-3%', positive: false },
    { label: 'Completed Jobs', value: '45', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', change: '+5', positive: true },
  ];

  const recentActivity = [
    { id: 1, type: 'New Inquiry', client: 'John Doe', service: 'Property Management', status: 'Pending', time: '2 hours ago' },
    { id: 2, type: 'Request Updated', client: 'Jane Smith', service: 'Construction', status: 'In Progress', time: '4 hours ago' },
    { id: 3, type: 'Job Completed', client: 'Peter Parker', service: 'Travel Planning', status: 'Completed', time: 'Yesterday' },
    { id: 4, type: 'New Client', client: 'Mary Jane', service: 'Daily Tasks', status: 'New', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, Admin</h2>
        <p className="text-gray-500">Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={cn(
                "text-xs flex items-center mt-1",
                stat.positive ? "text-green-600" : "text-red-600"
              )}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-gray-600">Client</TableHead>
                  <TableHead className="font-semibold text-gray-600">Service</TableHead>
                  <TableHead className="font-semibold text-gray-600">Status</TableHead>
                  <TableHead className="font-semibold text-gray-600 text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{activity.client}</TableCell>
                    <TableCell className="text-gray-600">{activity.service}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        activity.status === 'Completed' ? "bg-green-100 text-green-700" :
                        activity.status === 'Pending' ? "bg-orange-100 text-orange-700" :
                        activity.status === 'In Progress' ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-700"
                      )}>
                        {activity.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-gray-500 text-sm">{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Business Performance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 75) / 100}
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">75%</span>
                <span className="text-xs text-gray-500">Goal reached</span>
              </div>
            </div>
            <div className="mt-8 space-y-4 w-full">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Client Retention</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Avg. Response Time</span>
                <span className="font-semibold">1.2 hrs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function for conditional classes
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
