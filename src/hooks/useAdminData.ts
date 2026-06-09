import { useQuery } from '@tanstack/react-query';
import { blink } from '@/blink/client';

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [clientsCount, inquiriesCount, requestsCount, completedCount] = await Promise.all([
        blink.db.clients.count(),
        blink.db.messages.count({ where: { status: 'new' } }),
        blink.db.serviceRequests.count({ where: { status: 'pending' } }),
        blink.db.serviceRequests.count({ where: { status: 'completed' } }),
      ]);
      return {
        clients: clientsCount,
        newInquiries: inquiriesCount,
        activeRequests: requestsCount,
        completedJobs: completedCount,
      };
    },
  });
}

export function useClients() {
  return useQuery({
    queryKey: ['admin-clients'],
    queryFn: () => blink.db.clients.list({ orderBy: { createdAt: 'desc' } }),
  });
}

export function useServiceRequests() {
  return useQuery({
    queryKey: ['admin-requests'],
    queryFn: () => blink.db.serviceRequests.list({ orderBy: { createdAt: 'desc' } }),
  });
}

export function useMessages() {
  return useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => blink.db.messages.list({ orderBy: { createdAt: 'desc' } }),
  });
}

export function useServices() {
  return useQuery({
    queryKey: ['admin-services'],
    queryFn: () => blink.db.servicesManagement.list({ orderBy: { name: 'asc' } }),
  });
}

export function usePortfolio() {
  return useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: () => blink.db.portfolioItems.list({ orderBy: { createdAt: 'desc' } }),
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: () => blink.db.testimonials.list({ orderBy: { createdAt: 'desc' } }),
  });
}
