interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading properties..." }: LoadingStateProps) => (
  <div className="p-6">
    <div className="flex items-center justify-center h-64">
      <div className="text-lg">{message}</div>
    </div>
  </div>
);
