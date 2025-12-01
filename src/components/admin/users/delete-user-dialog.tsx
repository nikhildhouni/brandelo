'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DeleteUserDialog({ user }) {
  async function handleDelete() {
    const res = await fetch(`/api/admin/users/${user.id}/delete`, {
      method: "POST",
    })

    if (res.ok) window.location.reload()
    else alert("Failed to delete user")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-red-500 text-white text-xs px-3">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="backdrop-blur-xl bg-slate-900/70 border border-white/20">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-slate-300">
          Are you sure you want to delete user{" "}
          <span className="text-red-300">{user.email}</span>?
        </p>

        <DialogFooter>
          <Button
            onClick={handleDelete}
            className="bg-red-600 text-white text-xs rounded-full px-4 mt-4"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
