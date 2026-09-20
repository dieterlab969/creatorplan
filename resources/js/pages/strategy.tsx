import AuthenticatedLayout from "@/layouts/authenticated-layout"
import { Head, router, useForm } from "@inertiajs/react"
import { Plus, Save, Sparkles, X } from "lucide-react"
import { FormEvent, KeyboardEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Strategy, PageProps } from "@/types"

type StrategyForm = { audience: string; problem: string; unique_angle: string; content_pillars: string[] }
const fields = [
  { key: "audience", label: "Who are you targeting?", hint: "Describe the person you want to reach. What are they trying to achieve, and where are they starting from?" },
  { key: "problem", label: "What problem do you solve?", hint: "Name the recurring frustration or obstacle your videos help people overcome." },
  { key: "unique_angle", label: "What makes you different?", hint: "Explain the perspective, experience, or method that makes your channel worth choosing." },
] as const

export default function Strategy({ strategy }: PageProps<{ strategy: Strategy | null }>) {
  const form = useForm<StrategyForm>({ audience: strategy?.audience ?? "", problem: strategy?.problem ?? "", unique_angle: strategy?.unique_angle ?? "", content_pillars: strategy?.content_pillars ?? [] })
  const [pillar, setPillar] = useState("")
  const submit = (event: FormEvent) => { event.preventDefault(); if (form.data.content_pillars.length < 3) { form.setError("content_pillars", "Add at least 3 content pillars."); return } form.post("/strategy", { preserveScroll: true }) }
  const addPillar = () => { const value = pillar.trim(); if (value && form.data.content_pillars.length < 5 && !form.data.content_pillars.includes(value)) { form.setData("content_pillars", [...form.data.content_pillars, value]); setPillar("") } }
  const onKey = (event: KeyboardEvent<HTMLInputElement>) => { if (event.key === "Enter") { event.preventDefault(); addPillar() } }

  return <AuthenticatedLayout header="Strategy"><Head title="Strategy" /><div className="mx-auto max-w-4xl space-y-8"><div><p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Your foundation</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">Channel strategy</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Get specific about who you help and why they should choose your channel. This becomes the filter for every content decision.</p></div><form onSubmit={submit} className="space-y-6">{fields.map((field) => <Card key={field.key}><CardHeader><CardTitle className="text-lg">{field.label}</CardTitle><CardDescription>{field.hint}</CardDescription></CardHeader><CardContent><Textarea value={form.data[field.key]} onChange={(e) => form.setData(field.key, e.target.value)} placeholder="Write your answer here..." />{form.errors[field.key] && <p className="mt-2 text-sm text-destructive">{form.errors[field.key]}</p>}</CardContent></Card>)}<Card><CardHeader><CardTitle className="text-lg">Content pillars</CardTitle><CardDescription>Choose 3–5 repeatable themes your audience can come back to.</CardDescription></CardHeader><CardContent><div className="flex gap-2"><Input value={pillar} onChange={(e) => setPillar(e.target.value)} onKeyDown={onKey} placeholder="e.g. Video packaging" /><Button type="button" variant="outline" onClick={addPillar} disabled={form.data.content_pillars.length >= 5}><Plus className="h-4 w-4" />Add</Button></div><div className="mt-4 flex flex-wrap gap-2">{form.data.content_pillars.map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">{item}<button type="button" onClick={() => form.setData("content_pillars", form.data.content_pillars.filter((value) => value !== item))} aria-label={`Remove ${item}`}><X className="h-3.5 w-3.5" /></button></span>)}</div>{form.errors.content_pillars && <p className="mt-2 text-sm text-destructive">{form.errors.content_pillars}</p>}</CardContent></Card><div className="flex justify-end"><Button type="submit" disabled={form.processing}><Save className="h-4 w-4" />{form.processing ? "Saving..." : "Save strategy"}</Button></div></form></div></AuthenticatedLayout>
}