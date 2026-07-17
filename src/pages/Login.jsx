import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Mock login: any email + a 4+ character password signs you in.
export default function Login() {
  const [email, setEmail] = useState('admin@campus.edu');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!email || password.length < 4) {
      setError('Enter an email and a password of at least 4 characters.');
      return;
    }
    login({ name: email.split('@')[0], email, role: 'Administrator' });
    navigate('/');
  };

  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-aws-navy to-brand-700 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mb-2 text-4xl">☁️</div>
          <h1 className="text-2xl font-bold text-slate-800">Cloud Campus Portal</h1>
          <p className="text-sm text-slate-500">Cloud-enabled university management</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Demo mode — any email with a 4+ character password works.
        </p>
      </div>
    </div>
  );
}
