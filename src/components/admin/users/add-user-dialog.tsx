'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AddUserDialog() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("user")
  const [loading, setLoading] = useState(false)

  async function handleCreate() {
    setLoading(true)

    const res = await fetch("/api/admin/users/create", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    })

    setLoading(false)

    if (res.ok) {
      window.location.reload()
    } else {
      alert("Failed to create user")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full border bg-emerald-500 text-white px-4 text-xs">
          ➕ Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="backdrop-blur-xl bg-slate-900/70 border border-white/20">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user profile inside Pixelar Realm.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4 text-sm">
          <label className="block text-slate-200">Email</label>
          <input
            className="w-full rounded-md bg-white/10 border border-white/20 h-9 px-2 text-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-slate-200 mt-2">Role</label>
          <select
            className="w-full rounded-md bg-white/10 border border-white/20 h-9 px-2 text-white"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <DialogFooter>
          <Button
            onClick={handleCreate}
            disabled={loading}
            className="bg-emerald-500 text-white text-xs rounded-full px-4"
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
