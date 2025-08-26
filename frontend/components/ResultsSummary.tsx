interface ResultsSummaryProps {
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onResetFilters?: () => void;
}

export const ResultsSummary = ({ 
  filteredCount, 
  totalCount, 
  hasActiveFilters, 
  onResetFilters 
}: ResultsSummaryProps) => (
  <div className="mb-4 flex items-center justify-between">
    <div className="text-sm text-gray-600">
      Showing {filteredCount} of {totalCount} properties
    </div>
    
    {hasActiveFilters && onResetFilters && (
      <button
        onClick={onResetFilters}
        className="text-sm text-blue-600 hover:text-blue-800 underline"
      >
        Clear all filters
      </button>
    )}
  </div>
);
