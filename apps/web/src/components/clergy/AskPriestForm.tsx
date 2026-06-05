import { CheckCircle2, LockKeyhole } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { dioceseService } from '../../services/diocese.service';
import { Button } from '../common/Button';
import { FormInput, FormTextarea } from '../common/FormInput';

interface FormState {
  question: string;
  category: string;
  contactEmail: string;
  isAnonymous: boolean;
}

const initialState: FormState = { question: '', category: '', contactEmail: '', isAnonymous: true };

export function AskPriestForm() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (form.question.trim().length < 20) {
      setError('Հարցը պետք է պարունակի առնվազն 20 նիշ։');
      return;
    }
    if (form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      setError('Մուտքագրեք վավեր էլեկտրոնային հասցե։');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await dioceseService.submitQuestion(form);
      setReferenceId(result.referenceId);
      setForm(initialState);
    } catch {
      setError('Հարցը չհաջողվեց ուղարկել։ Խնդրում ենք փորձել կրկին։');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (referenceId) {
    return <div className="border border-forest/30 bg-white/55 p-8 text-center"><CheckCircle2 className="mx-auto size-10 text-forest" /><h2 className="mt-5 font-display text-3xl font-bold text-episcopal">Ձեր հարցն ընդունված է</h2><p className="mt-4 text-sm leading-7 text-ink/60">Հարցը կդիտարկվի գաղտնիությամբ։ Հղման համարը՝ <strong>{referenceId.slice(0, 8)}</strong></p><Button className="mt-7" onClick={() => setReferenceId('')}>Ուղարկել մեկ այլ հարց</Button></div>;
  }

  return (
    <form className="border border-gold/25 bg-white/45 p-6 shadow-sacred sm:p-9" onSubmit={handleSubmit}>
      <div className="mb-7 flex gap-3 border border-gold/25 bg-parchment/65 p-4 text-xs leading-6 text-ink/60"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-forest" /><p>Հարցերը հասանելի են միայն թեմի լիազորված պատասխանատուներին։ Ձեր էլեկտրոնային հասցեն երբեք չի հրապարակվի։</p></div>
      <div className="grid gap-5">
        <FormTextarea error={error} label="Ձեր հարցը *" maxLength={2000} placeholder="Գրեք ձեր հոգևոր կամ եկեղեցական հարցը..." rows={7} value={form.question} onChange={(event) => setForm({ ...form, question: event.target.value })} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label="Թեմա" maxLength={80} placeholder="Օրինակ՝ ընտանիք, աղոթք" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
          <FormInput label="Էլ. հասցե՝ պատասխան ստանալու համար" placeholder="email@example.com" type="email" value={form.contactEmail} onChange={(event) => setForm({ ...form, contactEmail: event.target.value })} />
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/65"><input checked={form.isAnonymous} className="mt-1 accent-royal" type="checkbox" onChange={(event) => setForm({ ...form, isAnonymous: event.target.checked })} /><span><strong className="text-episcopal">Ուղարկել անանուն</strong><br />Ձեր անունը չի պահանջվում և չի պահպանվում։</span></label>
        <Button disabled={isSubmitting} type="submit">{isSubmitting ? 'Ուղարկվում է...' : 'Ուղարկել հարցը'}</Button>
      </div>
    </form>
  );
}
