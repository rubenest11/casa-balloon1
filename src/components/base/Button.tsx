
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap';
  
  const variants = {
    primary: 'bg-pink-500 hover:bg-pink-600 text-white',
    secondary: 'bg-purple-500 hover:bg-purple-600 text-white',
    outline: 'border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
