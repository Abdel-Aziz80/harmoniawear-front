// src/components/common/LoadingSpinner.jsx
export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div 
      className={`inline-block animate-spin rounded-full border-harmonia-red border-t-transparent ${sizeClasses[size]} ${className}`}
      data-testid="loading-spinner"
      role="status"
      aria-label="Chargement"
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );
}
