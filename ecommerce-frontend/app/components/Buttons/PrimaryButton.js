export default function PrimaryButton({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
    outline: 'border-2 border-amber-600 text-amber-600 hover:bg-amber-50 active:bg-amber-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
