import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'light';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  href?: string;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-white hover:bg-[#caa764] shadow-lg shadow-episcopal/15',
  secondary: 'border border-gold/70 bg-transparent text-episcopal hover:bg-gold/10',
  light: 'bg-parchment text-episcopal hover:bg-white',
};

export function Button({ children, href, variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `focus-ring inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link className={classes} to={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
