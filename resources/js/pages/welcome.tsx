import { Head, Link } from "@inertiajs/react"
import { ArrowRight, BarChart3, CalendarDays, Check, Lightbulb, PlayCircle, Sparkles } from "lucide-react"

export default function Welcome() {
  return (
    <>
      <Head title="CreatorPlan" />
      <div className="min-h-screen overflow-hidden bg-[#0b1220] text-white">
        <div className="absolute left-1/2 top-[-22rem] h-[40rem] w-[50rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-lg font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500"><PlayCircle className="h-5 w-5" /></span>
            Creator<span className="text-indigo-300">Plan</span>
          </Link>
          <Link href="/auth/google" className="hidden items-center gap-2 text-sm text-slate-300 transition hover:text-white sm:flex">Sign in <ArrowRight className="h-4 w-4" /></Link>
        </nav>

        <main className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-8 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-400/10 px-3 py-1.5 text-xs font-medium text-indigo-200">
              <Sparkles className="h-3.5 w-3.5" /> Build your path to 10,000 subscribers
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl">
              Turn your channel into a <span className="text-indigo-300">repeatable system.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              CreatorPlan gives you a clear strategy, a 12-week content calendar, and the metrics you need to make smarter videos every month.
            </p>
            <Link href="/auth/google" className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.35 12.23c0-.79-.07-1.56-.22-2.29H12v4.33h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.43Z"/><path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.04H3.26v2.53A9.74 9.74 0 0 0 12 21.5Z"/><path fill="#FBBC05" d="M6.51 13.57a5.86 5.86 0 0 1 0-3.14V7.9H3.26a9.75 9.75 0 0 0 0 8.2l3.25-2.53Z"/><path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.4 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.74 5.4l3.25 2.53C7.29 8.11 9.45 6.39 12 6.39Z"/></svg>
              Continue with Google
            </Link>
          </div>

          <div className="mt-20 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Lightbulb, title: "Find your angle", text: "Turn your experience into a focused strategy your audience understands." },
              { icon: CalendarDays, title: "Plan 12 weeks", text: "Keep your next videos visible and move ideas from planned to published." },
              { icon: BarChart3, title: "Track what matters", text: "See your subscriber trend and learn what is actually moving the channel." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                <item.icon className="h-5 w-5 text-indigo-300" />
                <h2 className="mt-8 font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}