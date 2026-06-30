import { Cross } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../features/admin/AdminAuthContext';

export function AdminLoginPage() {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@syunikdiocese.am');
  const [password, setPassword] = useState('Admin12345!');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (auth.token && auth.user) return <Navigate replace to="/admin" />;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await auth.login(email, password);
      navigate((location.state as { from?: string } | null)?.from ?? '/admin', { replace: true });
    } catch {
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-episcopal px-5 py-12">
      <form className="w-full max-w-md rounded-3xl bg-parchment p-8 shadow-2xl" onSubmit={submit}>
        <div className="grid size-20 place-items-center rounded-full bg-gold shadow-lg shadow-gold/25">
          <span className="grid size-16 place-items-center rounded-full border-2 border-white text-white">
            <Cross className="size-8 text-white" strokeWidth={2.6} />
          </span>
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold text-episcopal">Admin Login</h1>
        <p className="mt-3 text-sm leading-6 text-ink/60">Protected management area for Diocese content and submissions.</p>
        <label className="mt-8 grid gap-2 text-xs font-bold uppercase tracking-wide text-episcopal">Email<input className="min-h-12 rounded-xl border border-gold/35 bg-white/60 px-4 text-sm normal-case" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label className="mt-4 grid gap-2 text-xs font-bold uppercase tracking-wide text-episcopal">Password<input className="min-h-12 rounded-xl border border-gold/35 bg-white/60 px-4 text-sm normal-case" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error && <p className="mt-4 rounded-xl bg-royal/10 p-3 text-sm text-royal">{error}</p>}
        <button className="mt-6 min-h-12 w-full rounded-xl bg-gold px-5 text-sm font-bold text-white disabled:opacity-60" disabled={isLoading} type="submit">{isLoading ? 'Signing in...' : 'Sign in'}</button>
        <p className="mt-4 text-xs leading-5 text-ink/45">Dev seed account: admin@syunikdiocese.am / Admin12345!</p>
      </form>
    </main>
  );
}
