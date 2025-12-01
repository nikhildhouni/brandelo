'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ViewUserDialog({ user }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-sky-500 text-white text-xs px-3">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="backdrop-blur-xl bg-slate-900/70 border border-white/20">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="text-sm mt-3 space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString()}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
