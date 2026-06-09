import { useState } from 'react';
import { Star, CheckCircle, Clock, Trash2, MoreHorizontal, MessageSquareQuote, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AdminTestimonials() {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'John Doe', role: 'Property Owner', content: 'Kela Services has been a lifesaver. I can manage my properties in Nairobi from London with zero stress.', rating: 5, status: 'Approved', date: '2 days ago' },
    { id: 2, name: 'Alice Smith', role: 'Expat in USA', content: 'Their travel planning was seamless. Everything from flights to safaris was perfectly organized.', rating: 5, status: 'Pending', date: '5 days ago' },
    { id: 3, name: 'Peter Parker', role: 'Construction Client', content: 'I built my home from foundation to finish through their construction management. Truly professional.', rating: 4, status: 'Approved', date: '1 week ago' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Stories & Testimonials</h2>
          <p className="text-gray-500">Manage client reviews and feedback before publishing them on the website.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Manual Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 uppercase tracking-wider">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">42</div>
            <p className="text-xs text-blue-600 mt-1">From all platforms</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-yellow-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600 uppercase tracking-wider">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900 flex items-center gap-2">
              4.8 <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
            </div>
            <p className="text-xs text-yellow-600 mt-1">Based on 42 reviews</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 uppercase tracking-wider">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">3</div>
            <p className="text-xs text-purple-600 mt-1">New reviews to check</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 p-6 bg-gray-50/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                  <Avatar className="w-16 h-16 border-4 border-white shadow-md mb-3">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`} />
                    <AvatarFallback>{review.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{review.role}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn(
                        "w-3 h-3",
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      )} />
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-6 relative">
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      review.status === 'Approved' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {review.status}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">Edit Review</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">Delete Review</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="mb-6">
                    <MessageSquareQuote className="w-8 h-8 text-primary/10 mb-2" />
                    <p className="text-gray-700 italic leading-relaxed">"{review.content}"</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs text-gray-400">Received {review.date}</span>
                    {review.status === 'Pending' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs">Reject</Button>
                        <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700">Approve & Publish</Button>
                      </div>
                    )}
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

// Re-using common components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

function Plus({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}
