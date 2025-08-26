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
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Results Info */}
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {filteredCount} of {totalCount}
          </p>
          <p className="text-gray-600">accommodations found</p>
        </div>
      </div>

      {/* Active Filters & Reset */}
      {hasActiveFilters && (
        <div className="flex items-center space-x-3">
          <div className="bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium">
            🔍 Filters Active
          </div>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium text-sm border border-red-200 hover:border-red-300"
            >
              🗑️ Clear All
            </button>
          )}
        </div>
      )}

      {/* No Active Filters */}
      {!hasActiveFilters && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
          ✨ All Properties Shown
        </div>
      )}
    </div>
  </div>
);
