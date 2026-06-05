import { CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { socialService } from '../../services/social.service';
import { email, minLength, required } from '../../utils/validation';
import { Button } from '../common/Button';
import { FormInput, FormTextarea } from '../common/FormInput';

const initialForm = { fullName: '', email: '', phone: '', interests: '', availability: '', message: '' };

export function VolunteerForm({ programSlug }: { programSlug?: string }) {
  const [form, setForm] = useState(initialForm);
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const nextErrors = {
      fullName: minLength(form.fullName, 2, 'Լրացրեք անունը։'),
      email: required(form.email, 'Էլ. հասցեն պարտադիր է։') || email(form.email),
    };
    setErrors(Object.fromEntries(Object.entries(nextErrors).filter(([, value]) => value)));
    return Object.values(nextErrors).every((value) => !value);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await socialService.submitVolunteer({ ...form, programSlug });
      setReference(result.referenceId);
      setForm(initialForm);
    } catch {
      setErrors({ form: 'Դիմումը չհաջողվեց ուղարկել։ Խնդրում ենք փորձել կրկին։' });
    } finally {
      setLoading(false);
    }
  }

  if (reference) {
    return (
      <div className="card-surface p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-forest" />
        <h2 className="mt-5 font-display text-3xl font-bold text-episcopal">Դիմումն ընդունված է</h2>
        <p className="mt-3 text-sm text-ink/55">Հղման համարը՝ {reference.slice(0, 8)}</p>
        <Button className="mt-7" onClick={() => setReference('')} type="button">Ուղարկել նոր դիմում</Button>
      </div>
    );
  }

  return (
    <form className="card-surface p-6 sm:p-9" noValidate onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput error={errors.fullName} label="Անուն, ազգանուն *" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
        <FormInput error={errors.email} label="Էլ. հասցե *" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <FormInput label="Հեռախոս" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        <FormInput label="Հասանելիություն" placeholder="Օրինակ՝ շաբաթ օրերին" value={form.availability} onChange={(event) => setForm({ ...form, availability: event.target.value })} />
      </div>
      <div className="mt-5 grid gap-5">
        <FormInput label="Հետաքրքրությունների ոլորտ" value={form.interests} onChange={(event) => setForm({ ...form, interests: event.target.value })} />
        <FormTextarea label="Ինչպե՞ս կցանկանաք օգնել" rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
        {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
        <Button disabled={loading} type="submit">{loading ? 'Ուղարկվում է...' : 'Ուղարկել դիմումը'}</Button>
      </div>
    </form>
  );
}
