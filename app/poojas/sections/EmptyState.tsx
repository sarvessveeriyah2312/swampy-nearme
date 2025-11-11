import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EmptyState = ({
  searchQuery,
  activeFilter,
}: {
  searchQuery: string;
  activeFilter: string;
}) => (
  <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-amber-200">
    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Search className="h-8 w-8 text-amber-600" />
    </div>
    <h3 className="text-xl font-semibold text-amber-900 mb-2">No Poojas Found</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      {searchQuery || activeFilter !== 'all'
        ? 'Try adjusting your search criteria or filters'
        : 'Be the first to announce a pooja in your area'}
    </p>
    <Button className="bg-amber-600 hover:bg-amber-700">
      Announce a Pooja
    </Button>
  </div>
);
