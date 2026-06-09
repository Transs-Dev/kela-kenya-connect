import { useState } from 'react';
import { Plus, Image as ImageIcon, Trash2, Edit2, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AdminPortfolio() {
  const projects = [
    { id: 1, title: 'Luxury Villa Management', category: 'Property', image: '/portfolio1.jpeg', status: 'Published' },
    { id: 2, title: 'Modern Office Construction', category: 'Construction', image: '/portfolio2.jpeg', status: 'Published' },
    { id: 3, title: 'Bespoke Safari Planning', category: 'Travel', image: '/portfolio3.jpeg', status: 'Draft' },
    { id: 4, title: 'Residential Renovation', category: 'Construction', image: '/portfolio1.jpeg', status: 'Published' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio & Projects</h2>
          <p className="text-gray-500">Showcase your best work and completed projects to potential clients.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        {['All Projects', 'Construction', 'Property', 'Travel', 'General'].map((cat) => (
          <Button key={cat} variant={cat === 'All Projects' ? 'secondary' : 'ghost'} className="rounded-lg h-9">
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-0">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" className="h-9 w-9 p-0 rounded-full">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" className="h-9 w-9 p-0 rounded-full">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className={cn(
                    "font-medium",
                    project.status === 'Published' ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                  )}>
                    {project.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">{project.category}</p>
                <h3 className="font-bold text-gray-900 line-clamp-1">{project.title}</h3>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-400">Added Oct 12, 2023</span>
                  <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary hover:bg-primary/5 p-2">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <button className="aspect-video rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-all bg-gray-50/50">
          <Plus className="w-6 h-6" />
          <span className="text-sm font-medium">Add Project</span>
        </button>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
