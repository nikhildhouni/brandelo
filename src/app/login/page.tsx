// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Shield, AlertTriangle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (signInError || !data.session) {
      setError(signInError?.message || 'Login failed')
      setLoading(false)
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.session.user.id)
      .single()

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    if (profile?.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-10 h-80 w-80 rounded-full bg-linear-to-br from-emerald-400/40 via-cyan-400/40 to-sky-500/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-linear-to-tr from-pink-500/40 via-purple-500/40 to-indigo-500/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.9),transparent_60%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-size-[32px_32px]" />
      </div>

      <div className="relative w-full max-w-md px-4">
        <Card className="border border-white/15 bg-white/5 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.8)] rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-white/10 pb-5">
            <div className="flex flex-col items-center gap-3">
              {/* Glass icon badge */}
              <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-emerald-400/70 via-cyan-400/70 to-sky-500/70 border border-white/40 shadow-[0_12px_35px_rgba(16,185,129,0.65)] flex items-center justify-center backdrop-blur-xl">
                <Shield className="w-7 h-7 text-slate-950" />
              </div>
              <div className="text-center space-y-1">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                 Brandelo Login
                </CardTitle>
                <CardDescription className="text-xs text-slate-200/80">
                  Step into the Brandelo Box ✨
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 pb-7 px-5">
            {/* Status pill */}
            <div className="mb-4 flex items-center justify-between text-[11px]">
              <span className="uppercase tracking-[0.13em] text-slate-200/70">
                Session
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                {loading ? 'Connecting…' : 'Ready'}
              </span>
            </div>

            {error && (
              <Alert className="mb-4 border border-red-300/40 bg-red-400/10 text-red-100 backdrop-blur-xl">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-xs font-semibold">
                  Login error
                </AlertTitle>
                <AlertDescription className="text-[11px]">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-100/80 flex items-center gap-1.5">
                  <span className="text-[13px]">📧</span> Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/25 bg-white/5 backdrop-blur-sm" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="relative z-10 h-10 rounded-xl border-none bg-transparent px-3 text-xs text-slate-50 placeholder:text-slate-300/50 focus-visible:ring-1 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-100/80 flex items-center gap-1.5">
                  <span className="text-[13px]">🧩</span> Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/25 bg-white/5 backdrop-blur-sm" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="relative z-10 h-10 rounded-xl border-none bg-transparent px-3 text-xs text-slate-50 placeholder:text-slate-300/50 focus-visible:ring-1 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-0"
                  />
                </div>
                <p className="text-[10px] text-slate-200/70 mt-1">
                  Keep your secret key safe in this glass vault 🔐
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 w-full h-10 rounded-xl bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-500 text-slate-950 text-[11px] font-semibold tracking-[0.18em] uppercase shadow-[0_14px_35px_rgba(34,197,94,0.45)] border border-white/40 hover:opacity-95 hover:shadow-[0_18px_40px_rgba(59,130,246,0.55)] transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting…
                  </span>
                ) : (
                  'Enter realm'
                )}
              </Button>

              {/* Footer */}
              <p className="mt-3 text-[10px] text-center text-slate-200/80">
                Forgot password?{' '}
                <button
                  type="button"
                  disabled
                  className="font-semibold text-slate-50/90 underline underline-offset-2 decoration-slate-200/60 cursor-not-allowed"
                >
                  reset coming soon
                </button>
              </p>
              <p className="text-[9px] text-center text-slate-300/60 mt-1.5">
                v1.0 • Brandelo Admin Panel • Secure access only
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
