// src/components/ui/Button.jsx
export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300';
  
  const variants = {
    primary: 'bg-harmonia-red text-white hover:bg-opacity-90 disabled:bg-gray-400',
    secondary: 'bg-harmonia-black text-white hover:bg-harmonia-red disabled:bg-gray-400',
    outline: 'border-2 border-harmonia-red text-harmonia-red hover:bg-harmonia-red hover:text-white disabled:border-gray-400 disabled:text-gray-400',
    ghost: 'text-harmonia-red hover:bg-harmonia-red hover:bg-opacity-10 disabled:text-gray-400'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
