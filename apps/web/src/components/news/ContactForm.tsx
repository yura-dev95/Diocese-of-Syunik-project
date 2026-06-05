import { CheckCircle2, LockKeyhole } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { newsService } from '../../services/news.service';
import { email, minLength, required } from '../../utils/validation';
import { Button } from '../common/Button';
import { FormInput, FormTextarea } from '../common/FormInput';

const initialForm = { fullName: '', email: '', phone: '', subject: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    const nextErrors = {
      fullName: minLength(form.fullName, 2, 'Լրացրեք անունը։'),
      email: required(form.email, 'Էլ. հասցեն պարտադիր է։') || email(form.email),
      subject: minLength(form.subject, 3, 'Թեման պետք է պարունակի առնվազն 3 նիշ։'),
      message: minLength(form.message, 20, 'Հաղորդագրությունը պետք է պարունակի առնվազն 20 նիշ։'),
    };
    setErrors(Object.fromEntries(Object.entries(nextErrors).filter(([, value]) => value)));
    return Object.values(nextErrors).every((value) => !value);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await newsService.contact(form);
      setReference(result.referenceId);
      setForm(initialForm);
    } catch {
      setErrors({ form: 'Հաղորդագրությունը չհաջողվեց ուղարկել։ Խնդրում ենք փորձել կրկին։' });
    } finally {
      setLoading(false);
    }
  }

  if (reference) {
    return (
      <div className="card-surface p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-forest" />
        <h2 className="mt-5 font-display text-3xl font-bold text-episcopal">Հաղորդագրությունն ընդունված է</h2>
        <p className="mt-3 text-sm text-ink/55">Հղման համարը՝ {reference.slice(0, 8)}</p>
        <Button className="mt-7" onClick={() => setReference('')} type="button">Ուղարկել նոր հաղորդագրություն</Button>
      </div>
    );
  }

  return (
    <form className="card-surface p-6 sm:p-9" noValidate onSubmit={submit}>
      <div className="mb-6 flex gap-3 rounded-2xl border border-gold/25 bg-parchment/70 p-4 text-xs leading-6 text-ink/55">
        <LockKeyhole className="size-4 shrink-0 text-forest" />
        Ձեր կոնտակտային տվյալները չեն հրապարակվում և օգտագործվում են միայն պատասխանելու համար։
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput error={errors.fullName} label="Անուն, ազգանուն *" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
        <FormInput error={errors.email} label="Էլ. հասցե *" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <FormInput label="Հեռախոս" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        <FormInput error={errors.subject} label="Թեմա *" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} />
      </div>
      <div className="mt-5 grid gap-5">
        <FormTextarea error={errors.message} label="Հաղորդագրություն *" rows={7} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
        {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
        <Button disabled={loading} type="submit">{loading ? 'Ուղարկվում է...' : 'Ուղարկել հաղորդագրությունը'}</Button>
      </div>
    </form>
  );
}
