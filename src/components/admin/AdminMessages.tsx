import { useState } from 'react';
import { Search, Mail, MailOpen, Trash2, MoreHorizontal, User, Reply, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function AdminMessages() {
  const [activeTab, setActiveTab] = useState('Inbox');

  const messages = [
    { id: 1, name: 'Alice Wanjiku', subject: 'Construction Quote', excerpt: 'I would like to get a detailed quote for my house project in Nyeri...', date: '10:30 AM', unread: true, starred: false },
    { id: 2, name: 'Kevin Omondi', subject: 'Property Management Query', excerpt: 'How do you handle tenant disputes while the landlord is away?', date: 'Yesterday', unread: false, starred: true },
    { id: 3, name: 'Grace Mutua', subject: 'Travel Assistance', excerpt: 'I am planning a trip to Amboseli and need help with logistics.', date: 'Oct 12', unread: false, starred: false },
    { id: 4, name: 'Mark Kariuki', subject: 'Urgent: Document Collection', excerpt: 'I need some documents picked up from the Lands Office tomorrow.', date: 'Oct 11', unread: true, starred: false },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      <div className="flex border-b border-gray-100 h-full">
        {/* Sidebar Mini */}
        <div className="w-64 border-r border-gray-100 p-4 space-y-2 hidden md:block">
          <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 mb-4">
            <Reply className="w-4 h-4 rotate-180" /> Compose
          </Button>
          {['Inbox', 'Starred', 'Sent', 'Drafts', 'Trash'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab 
                  ? "bg-primary/5 text-primary" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                {tab === 'Inbox' && <Mail className="w-4 h-4" />}
                {tab === 'Starred' && <Star className="w-4 h-4" />}
                {tab === 'Sent' && <Reply className="w-4 h-4" />}
                {tab === 'Trash' && <Trash2 className="w-4 h-4" />}
                <span>{tab}</span>
              </div>
              {tab === 'Inbox' && (
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center text-[10px]">
                  2
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Message List */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search messages..." 
                className="pl-10 bg-gray-50/50 border-gray-100 h-10"
              />
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-900">
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-900">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "p-4 border-b border-gray-50 cursor-pointer transition-colors group relative",
                  msg.unread ? "bg-white" : "bg-gray-50/30",
                  "hover:bg-blue-50/30"
                )}
              >
                {msg.unread && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                )}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {msg.starred ? (
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Star className="w-4 h-4 text-gray-300 hover:text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={cn(
                        "text-sm truncate pr-4",
                        msg.unread ? "font-bold text-gray-900" : "font-medium text-gray-700"
                      )}>
                        {msg.name}
                      </h4>
                      <span className="text-xs text-gray-500 shrink-0">{msg.date}</span>
                    </div>
                    <p className={cn(
                      "text-sm mb-1 truncate pr-8",
                      msg.unread ? "font-semibold text-gray-800" : "text-gray-600"
                    )}>
                      {msg.subject}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{msg.excerpt}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                      {msg.unread ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
