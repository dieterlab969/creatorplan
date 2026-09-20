import { usePage } from "@inertiajs/react"
import { CheckCircle2, XCircle, X } from "lucide-react"
import { useEffect, useState } from "react"
import { PageProps } from "@/types"

export function FlashToaster() {
  const { flash } = usePage<PageProps>().props
  const [visible, setVisible] = useState(false)
  const message = flash?.success || flash?.error
  const isError = Boolean(flash?.error)

  useEffect(() => {
    if (!message) return
    setVisible(true)
    const timeout = window.setTimeout(() => setVisible(false), 3800)
    return () => window.clearTimeout(timeout)
  }, [message])

  if (!message || !visible) return null

  return (
    <div className="fixed right-4 top-4 z-[100] flex max-w-sm items-start gap-3 rounded-xl border bg-card px-4 py-3 text-sm shadow-xl">
      {isError ? <XCircle className="mt-0.5 h-5 w-5 text-destructive" /> : <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />}
      <span className="flex-1">{message}</span>
      <button onClick={() => setVisible(false)} aria-label="Dismiss notification"><X className="h-4 w-4 text-muted-foreground" /></button>
    </div>
  )
}