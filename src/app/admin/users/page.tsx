import { createClient } from "@/lib/supabase/server"
import { AddUserDialog } from "@/components/admin/users/add-user-dialog"
import { EditUserDialog } from "@/components/admin/users/edit-user-dialog"
import { DeleteUserDialog } from "@/components/admin/users/delete-user-dialog"
import { ViewUserDialog } from "@/components/admin/users/view-user-dialog"

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: users, error } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
            👥 Users Management
          </h1>
          <p className="text-sm text-slate-300">
            Manage Pixelar Realm users with full control panel.
          </p>
        </div>

        <AddUserDialog />
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-300 border border-red-300/30 bg-red-500/10 p-3 rounded-xl">
          Error: {error.message}
        </div>
      )}

      {/* Table */}
      {users && users.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/10 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-slate-300">Email</th>
                <th className="px-4 py-3 text-slate-300">Role</th>
                <th className="px-4 py-3 text-slate-300">Created</th>
                <th className="px-4 py-3 text-right text-slate-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-white/10 hover:bg-white/10 transition"
                >
                  <td className="px-4 py-3 text-slate-100">{u.email}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs border ${
                        u.role === "admin"
                          ? "bg-yellow-400/20 border-yellow-300 text-yellow-200"
                          : "bg-emerald-400/20 border-emerald-300 text-emerald-200"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-400">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <ViewUserDialog user={u} />
                      <EditUserDialog user={u} />
                      <DeleteUserDialog user={u} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-center text-xs text-slate-500 pt-3">
        Pixelar Admin • User Directory
      </p>
    </div>
  )
}
