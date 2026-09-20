import AuthenticatedLayout from "@/layouts/authenticated-layout"
import { Head, Link } from "@inertiajs/react"
import { ArrowUpRight, CalendarDays, CheckCircle2, ChevronRight, Lightbulb, Play, Target } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Strategy, CalendarVideo, Kpi, PageProps } from "@/types"
import { usePage } from "@inertiajs/react"

const number = (value = 0) => new Intl.NumberFormat("en-US", { notation: value > 9999 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value)
const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(value)) : "No date"

export default function Dashboard({ strategy, latestKpi, kpis, upcomingVideos }: PageProps<{ strategy: Strategy | null; latestKpi: Kpi | null; kpis: Kpi[]; upcomingVideos: CalendarVideo[] }>) {
  const { auth } = usePage<PageProps>().props
  const current = latestKpi?.subscribers ?? 0
  const progress = Math.min(100, Math.round((current / 10000) * 100))
  const chartData = kpis.map((kpi) => ({ name: `${kpi.month}/${String(kpi.year).slice(2)}`, subscribers: kpi.subscribers }))

  return (
    <AuthenticatedLayout header="Dashboard">
      <Head title="Dashboard" />
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Good morning, {auth.user?.name?.split(" ")[0] ?? "creator"}</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">Your channel at a glance</h1><p className="mt-2 text-sm text-muted-foreground">Keep the next right action in sight.</p></div>
          <Button asChild><Link href="/calendar">Plan a video <ArrowUpRight className="h-4 w-4" /></Link></Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-indigo-600 text-white shadow-lg shadow-indigo-200/50 dark:shadow-none"><CardContent className="p-6"><div className="flex items-center justify-between"><span className="text-sm text-indigo-100">Subscribers</span><Target className="h-5 w-5 text-indigo-200" /></div><p className="mt-6 text-4xl font-semibold">{number(current)}</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-indigo-400/40"><div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} /></div><p className="mt-2 text-xs text-indigo-100">{progress}% of the way to 10K</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Avg. views</span><Play className="h-5 w-5 text-emerald-500" /></div><p className="mt-6 text-4xl font-semibold">{number(latestKpi?.avg_views)}</p><p className="mt-2 text-xs text-muted-foreground">Latest monthly average</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Watch hours</span><CheckCircle2 className="h-5 w-5 text-amber-500" /></div><p className="mt-6 text-4xl font-semibold">{number(latestKpi?.watch_hours)}</p><p className="mt-2 text-xs text-muted-foreground">Logged in your latest KPI</p></CardContent></Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle className="text-lg">Subscriber growth</CardTitle><p className="mt-1 text-sm text-muted-foreground">Your progress over the last logged months</p></div><Link href="/kpis" className="text-sm font-medium text-indigo-600 hover:underline">View KPIs</Link></CardHeader><CardContent><div className="h-64">{chartData.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}><defs><linearGradient id="subscriberFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => number(v)} /><Tooltip /><Area type="monotone" dataKey="subscribers" stroke="#6366f1" strokeWidth={3} fill="url(#subscriberFill)" /></AreaChart></ResponsiveContainer> : <div className="flex h-full flex-col items-center justify-center rounded-xl bg-muted/40 text-center"><BarChartEmpty /><p className="mt-3 text-sm font-medium">Start tracking your growth</p><Link href="/kpis" className="mt-1 text-sm text-indigo-600 hover:underline">Log your first KPI</Link></div>}</div></CardContent></Card>
          <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle className="text-lg">Next up</CardTitle><p className="mt-1 text-sm text-muted-foreground">Your next four videos</p></div><Link href="/calendar" className="text-sm font-medium text-indigo-600 hover:underline">View all</Link></CardHeader><CardContent className="space-y-1">{upcomingVideos.length ? upcomingVideos.map((video) => <div key={video.id} className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-muted/60"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">{String(video.week_number).padStart(2, "0")}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{video.title}</p><p className="mt-0.5 truncate text-xs text-muted-foreground">{date(video.upload_date)}</p></div><Badge variant={video.status === "Published" ? "default" : "secondary"}>{video.status}</Badge></div>) : <EmptyState href="/calendar" text="Add your first video" />}</CardContent></Card>
        </div>

        <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle className="text-lg">Build your strategy</CardTitle><p className="mt-1 text-sm text-muted-foreground">A clear strategy turns random ideas into a focused channel.</p></div><Link href="/strategy"><Button variant="outline">Open strategy <ChevronRight className="h-4 w-4" /></Button></Link></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-3">{[["Audience", strategy?.audience], ["Problem", strategy?.problem], ["Unique angle", strategy?.unique_angle]].map(([label, value]) => <div key={label} className="rounded-xl bg-muted/50 p-4"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-2 line-clamp-2 text-sm">{value || "Not defined yet"}</p></div>)}</div></CardContent></Card>
      </div>
    </AuthenticatedLayout>
  )
}

function EmptyState({ href, text }: { href: string; text: string }) { return <div className="py-8 text-center text-sm text-muted-foreground"><CalendarDays className="mx-auto h-7 w-7 opacity-40" /><Link href={href} className="mt-2 block text-indigo-600 hover:underline">{text}</Link></div> }
function BarChartEmpty() { return <div className="flex h-9 items-end gap-1 opacity-30">{[20, 30, 17, 28, 22].map((height) => <span key={height} className="w-2 rounded-t bg-indigo-500" style={{ height }} />)}</div> }