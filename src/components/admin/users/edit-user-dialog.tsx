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
import { useState } from "react"

export function EditUserDialog({ user }) {
  const [role, setRole] = useState(user.role)
  const [loading, setLoading] = useState(false)

  async function handleUpdate() {
    setLoading(true)

    const res = await fetch(`/api/admin/users/${user.id}/edit`, {
      method: "POST",
      body: JSON.stringify({ role }),
    })

    setLoading(false)

    if (res.ok) window.location.reload()
    else alert("Failed to update user")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-purple-500 text-white text-xs px-3">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="backdrop-blur-xl bg-slate-900/70 border border-white/20">
        <DialogHeader>
          <DialogTitle>Edit User Role</DialogTitle>
        </DialogHeader>

        <select
          className="w-full rounded-md bg-white/10 border border-white/20 h-9 px-2 text-white mt-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <DialogFooter>
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-purple-500 text-white text-xs rounded-full px-4 mt-4"
          >
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
