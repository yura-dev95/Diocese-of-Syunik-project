import { CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { socialService } from '../../services/social.service';
import { Button } from '../common/Button';
import { FormInput, FormTextarea } from '../common/FormInput';

export function VolunteerForm({ programSlug }: { programSlug?: string }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', interests: '', availability: '', message: '' });
  const [reference, setReference] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); if (form.fullName.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Լրացրեք անունը և վավեր էլեկտրոնային հասցեն։'); return; } setLoading(true); try { const result = await socialService.submitVolunteer({ ...form, programSlug }); setReference(result.referenceId); } catch { setError('Դիմումը չհաջողվեց ուղարկել։'); } finally { setLoading(false); } }
  if (reference) return <div className="border border-forest/30 bg-white/55 p-8 text-center"><CheckCircle2 className="mx-auto size-10 text-forest" /><h2 className="mt-5 font-display text-3xl font-bold text-episcopal">Դիմումն ընդունված է</h2><p className="mt-3 text-sm text-ink/55">Հղման համարը՝ {reference.slice(0, 8)}</p></div>;
  return <form className="border border-gold/25 bg-white/45 p-6 shadow-sacred sm:p-9" onSubmit={submit}><div className="grid gap-5 sm:grid-cols-2"><FormInput label="Անուն, ազգանուն *" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /><FormInput label="Էլ. հասցե *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><FormInput label="Հեռախոս" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><FormInput label="Հասանելիություն" placeholder="Օրինակ՝ շաբաթ օրերին" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} /></div><div className="mt-5 grid gap-5"><FormInput label="Հետաքրքրությունների ոլորտ" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} /><FormTextarea label="Ինչպե՞ս կցանկանաք օգնել" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />{error && <p className="text-xs text-royal">{error}</p>}<Button disabled={loading} type="submit">{loading ? 'Ուղարկվում է...' : 'Ուղարկել դիմումը'}</Button></div></form>;
}
