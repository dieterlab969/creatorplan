import AuthenticatedLayout from "@/layouts/authenticated-layout"
import { Head, router, useForm } from "@inertiajs/react"
import { CalendarDays, Edit3, GripVertical, Plus, Trash2 } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarVideo, PageProps } from "@/types"

type VideoForm = { week_number: number; title: string; topic: string; upload_date: string; status: CalendarVideo["status"] }
const blank: VideoForm = { week_number: 1, title: "", topic: "", upload_date: "", status: "Planned" }
const statusStyles: Record<string, string> = { Planned: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", Filming: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300", Editing: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", Published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" }

export default function Calendar({ videos }: PageProps<{ videos: CalendarVideo[] }>) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<CalendarVideo | null>(null)
  const [ordered, setOrdered] = useState(videos)
  const [dragged, setDragged] = useState<number | null>(null)
  const form = useForm<VideoForm>(blank)
  useEffect(() => setOrdered(videos), [videos])

  const startAdd = () => { setEditing(null); form.reset(); form.setData("week_number", Math.min(12, (videos.length ? Math.max(...videos.map((video) => video.week_number)) : 0) + 1)); setOpen(true) }
  const startEdit = (video: CalendarVideo) => { setEditing(video); form.setData({ week_number: video.week_number, title: video.title, topic: video.topic, upload_date: video.upload_date?.slice(0, 10) ?? "", status: video.status }); setOpen(true) }
  const submit = (event: FormEvent) => { event.preventDefault(); const options = { preserveScroll: true, onSuccess: () => setOpen(false) }; editing ? form.put(`/calendar/${editing.id}`, options) : form.post("/calendar", options) }
  const remove = (video: CalendarVideo) => { if (window.confirm(`Remove "${video.title}" from your calendar?`)) router.delete(`/calendar/${video.id}`, { preserveScroll: true }) }
  const drop = (targetIndex: number) => {
    if (dragged === null || dragged === targetIndex) return
    const next = [...ordered]
    const [moved] = next.splice(dragged, 1)
    next.splice(targetIndex, 0, moved)
    setOrdered(next)
    setDragged(null)
    next.forEach((video, index) => {
      const week = index + 1
      if (video.week_number !== week) router.put(`/calendar/${video.id}`, { ...video, week_number: week }, { preserveScroll: true, preserveState: true })
    })
  }

  return <AuthenticatedLayout header="Content calendar"><Head title="Content calendar" /><div className="mx-auto max-w-7xl space-y-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Your next 12 weeks</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">Content calendar</h1><p className="mt-2 text-sm text-muted-foreground">Keep ideas moving from planned to published.</p></div><Button onClick={startAdd}><Plus className="h-4 w-4" />Add video</Button></div><Card><CardHeader><CardTitle className="text-lg">Video plan <span className="ml-2 text-sm font-normal text-muted-foreground">{videos.length} scheduled</span></CardTitle></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead className="w-14"></TableHead><TableHead className="w-20">Week</TableHead><TableHead>Title</TableHead><TableHead className="hidden md:table-cell">Topic</TableHead><TableHead className="hidden sm:table-cell">Upload date</TableHead><TableHead>Status</TableHead><TableHead className="w-24"></TableHead></TableRow></TableHeader><TableBody>{ordered.length ? ordered.map((video, index) => <TableRow key={video.id} draggable onDragStart={() => setDragged(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => drop(index)} className="group"><TableCell><GripVertical className="h-4 w-4 cursor-grab text-muted-foreground/50 group-hover:text-muted-foreground" /></TableCell><TableCell><span className="font-mono text-xs text-muted-foreground">{String(video.week_number).padStart(2, "0")}</span></TableCell><TableCell><p className="max-w-[220px] truncate font-medium">{video.title}</p><p className="mt-1 max-w-[220px] truncate text-xs text-muted-foreground md:hidden">{video.topic}</p></TableCell><TableCell className="hidden max-w-[260px] truncate text-muted-foreground md:table-cell">{video.topic}</TableCell><TableCell className="hidden text-sm text-muted-foreground sm:table-cell">{video.upload_date ? new Date(video.upload_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}</TableCell><TableCell><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[video.status]}`}>{video.status}</span></TableCell><TableCell><div className="flex justify-end gap-1"><Button variant="ghost" size="icon" onClick={() => startEdit(video)} aria-label={`Edit ${video.title}`}><Edit3 className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => remove(video)} aria-label={`Delete ${video.title}`}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></TableCell></TableRow>) : <TableRow><TableCell colSpan={7}><div className="py-16 text-center"><CalendarDays className="mx-auto h-8 w-8 text-muted-foreground/50" /><p className="mt-3 font-medium">Your calendar is empty</p><p className="mt-1 text-sm text-muted-foreground">Add your first video to start planning.</p><Button variant="outline" className="mt-4" onClick={startAdd}>Add a video</Button></div></TableCell></TableRow>}</TableBody></Table></CardContent></Card></div><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>{editing ? "Edit video" : "Add a video"}</DialogTitle><DialogDescription>Capture the next idea before it gets lost.</DialogDescription></DialogHeader><form onSubmit={submit} className="space-y-4"><div className="grid grid-cols-2 gap-4"><label className="space-y-2 text-sm font-medium">Week<Select value={form.data.week_number} onChange={(event) => form.setData("week_number", Number(event.target.value))}>{Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>Week {i + 1}</option>)}</Select></label><label className="space-y-2 text-sm font-medium">Status<Select value={form.data.status} onChange={(event) => form.setData("status", event.target.value as VideoForm["status"])}>{["Planned", "Filming", "Editing", "Published"].map((status) => <option key={status}>{status}</option>)}</Select></label></div><label className="block space-y-2 text-sm font-medium">Title<Input required value={form.data.title} onChange={(event) => form.setData("title", event.target.value)} placeholder="e.g. How I reached 1,000 subscribers" />{form.errors.title && <span className="text-xs text-destructive">{form.errors.title}</span>}</label><label className="block space-y-2 text-sm font-medium">Topic<Input required value={form.data.topic} onChange={(event) => form.setData("topic", event.target.value)} placeholder="What will this video teach or explore?" />{form.errors.topic && <span className="text-xs text-destructive">{form.errors.topic}</span>}</label><label className="block space-y-2 text-sm font-medium">Upload date<Input type="date" value={form.data.upload_date} onChange={(event) => form.setData("upload_date", event.target.value)} /></label><div className="flex justify-end gap-2 pt-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" disabled={form.processing}>{form.processing ? "Saving..." : editing ? "Save changes" : "Add video"}</Button></div></form></DialogContent></Dialog></AuthenticatedLayout>
}