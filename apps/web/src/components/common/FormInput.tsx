import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { useI18n } from '../../i18n/I18nContext';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, className = '', ...props }: FormInputProps) {
  const { localize } = useI18n();
  const id = useId();
  const errorId = `${id}-error`;
  const placeholder = typeof props.placeholder === 'string' ? localize(props.placeholder) : props.placeholder;

  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-episcopal">{localize(label)}</span>
      <input
        aria-describedby={error ? errorId : props['aria-describedby']}
        aria-invalid={Boolean(error)}
        className={`focus-ring mt-2 min-h-12 w-full rounded-xl border bg-white/55 px-4 text-sm text-ink placeholder:text-ink/35 ${error ? 'border-royal' : 'border-gold/35'} ${className}`}
        id={props.id ?? id}
        {...props}
        placeholder={placeholder}
      />
      {error && <span className="mt-2 block text-xs text-royal" id={errorId}>{localize(error)}</span>}
    </label>
  );
}

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function FormTextarea({ label, error, className = '', ...props }: FormTextareaProps) {
  const { localize } = useI18n();
  const id = useId();
  const errorId = `${id}-error`;
  const placeholder = typeof props.placeholder === 'string' ? localize(props.placeholder) : props.placeholder;

  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-episcopal">{localize(label)}</span>
      <textarea
        aria-describedby={error ? errorId : props['aria-describedby']}
        aria-invalid={Boolean(error)}
        className={`focus-ring mt-2 w-full resize-y rounded-xl border bg-white/55 px-4 py-3 text-sm leading-7 text-ink placeholder:text-ink/35 ${error ? 'border-royal' : 'border-gold/35'} ${className}`}
        id={props.id ?? id}
        {...props}
        placeholder={placeholder}
      />
      {error && <span className="mt-2 block text-xs text-royal" id={errorId}>{localize(error)}</span>}
    </label>
  );
}
