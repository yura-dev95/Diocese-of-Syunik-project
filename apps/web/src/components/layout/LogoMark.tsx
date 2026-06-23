import logoSrc from '../../assets/logo.png';

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <span className={`relative block shrink-0 ${className || 'h-20 w-16'}`}>
      <img
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain drop-shadow-md"
        decoding="async"
        src={logoSrc}
      />
    </span>
  );
}
