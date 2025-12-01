// app/admin/users/page.tsx
"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  Search,
  Shield,
  User as UserIcon,
  KeyRound,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "admin" | "user";

type ProfileRow = {
  id: string;
  email: string | null;
  role: Role;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  created_at: string | null;
};

type Profile = {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  avatarUrl: string | null;
  phone: string;
  bio: string;
  createdAt: string;
};

function toDisplayDate(iso?: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function fromRow(r: ProfileRow): Profile {
  return {
    id: r.id,
    email: r.email ?? "-",
    role: r.role,
    fullName: r.full_name ?? "Unknown",
    avatarUrl: r.avatar_url,
    phone: r.phone ?? "-",
    bio: r.bio ?? "",
    createdAt: toDisplayDate(r.created_at),
  };
}

export default function UsersPage() {
  const supabase = React.useMemo(() => createClient(), []);

  const [users, setUsers] = React.useState<Profile[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<"all" | Role>("all");

  // Add-user dialog state
  const [openAdd, setOpenAdd] = React.useState(false);
  const [addEmail, setAddEmail] = React.useState("");
  const [addPassword, setAddPassword] = React.useState("");
  const [addFullName, setAddFullName] = React.useState("");
  const [addRole, setAddRole] = React.useState<Role>("user");
  const [addLoading, setAddLoading] = React.useState(false);

  // Edit-user dialog state
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<Profile | null>(null);
  const [editFullName, setEditFullName] = React.useState("");
  const [editPhone, setEditPhone] = React.useState("");
  const [editBio, setEditBio] = React.useState("");
  const [editLoading, setEditLoading] = React.useState(false);

  // reset password loading per user
  const [resettingId, setResettingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    void fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, email, role, full_name, avatar_url, phone, bio, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setUsers([]);
      setLoading(false);
      return;
    }

    setUsers(((data ?? []) as ProfileRow[]).map(fromRow));
    setLoading(false);
  }

  // ---- change role (admin/user) via API (bypass RLS) ----
  async function handleRoleChange(id: string, role: Role) {
    const prevUsers = users;
    // optimistic update
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role } : u))
    );

    try {
      const res = await fetch("/api/admin/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        window.alert(
          body?.message || "Failed to update role. Check server logs."
        );
        setUsers(prevUsers); // rollback
      }
    } catch (e: any) {
      window.alert("Unexpected error: " + e?.message);
      setUsers(prevUsers);
    }
  }

  // ---- add user (auth + profile) via API route ----
  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!addEmail.trim() || !addPassword || !addFullName.trim()) {
      window.alert("Full name, email and password are required.");
      return;
    }

    setAddLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: addEmail.trim(),
          password: addPassword,
          fullName: addFullName.trim(),
          role: addRole,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg =
          (body && (body.message as string)) ||
          "Failed to create user. Check server logs.";
        window.alert(msg);
        return;
      }

      await fetchUsers();

      setAddEmail("");
      setAddPassword("");
      setAddFullName("");
      setAddRole("user");
      setOpenAdd(false);
    } catch (e: any) {
      window.alert("Unexpected error: " + e?.message);
    } finally {
      setAddLoading(false);
    }
  }

  // ---- edit user profile (name / phone / bio) via API ----
  function openEditDialog(u: Profile) {
    setEditingUser(u);
    setEditFullName(u.fullName);
    setEditPhone(u.phone === "-" ? "" : u.phone);
    setEditBio(u.bio);
    setOpenEdit(true);
  }

  async function handleSaveEdit() {
    if (!editingUser) return;
    if (!editFullName.trim()) {
      window.alert("Name is required.");
      return;
    }

    setEditLoading(true);
    try {
      const res = await fetch("/api/admin/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          fullName: editFullName.trim(),
          phone: editPhone.trim(),
          bio: editBio.trim(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        window.alert(
          body?.message || "Failed to update user. Check server logs."
        );
        return;
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                fullName: editFullName.trim(),
                phone: editPhone.trim() || "-",
                bio: editBio.trim(),
              }
            : u
        )
      );
      setOpenEdit(false);
    } finally {
      setEditLoading(false);
    }
  }

  // ---- send reset password link (no direct password edit) ----
  async function handleSendReset(email: string, id: string) {
    if (!email || email === "-") {
      window.alert("This user does not have an email address.");
      return;
    }

    setResettingId(id);
    try {
      const redirectTo = `${window.location.origin}/auth/update-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        window.alert("Failed to send reset link: " + error.message);
        return;
      }

      window.alert("Password reset link sent to " + email);
    } finally {
      setResettingId(null);
    }
  }

  // ---- filters ----
  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    return users.filter((u) => {
      const matchesSearch =
        q.length === 0
          ? true
          : [u.fullName, u.email, u.phone, u.bio]
              .join(" ")
              .toLowerCase()
              .includes(q);

      const matchesRole =
        roleFilter === "all" ? true : u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const total = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            Users
          </h1>
          <p className="text-xs text-muted-foreground md:text-sm">
            Users synced from <code>auth.users</code> and the
            <code className="ml-1">profiles</code> table.
          </p>
        </div>

        {/* TOP CARD: FILTERS + STATS */}
        <Card className="border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <CardHeader className="space-y-3 pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  User directory
                </CardTitle>
                <p className="text-[11px] text-muted-foreground">
                  {total} total • {filtered.length} shown
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="rounded-full border-border/70 text-[11px]"
                >
                  Total: {total}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-emerald-600/50 text-[11px] text-emerald-700 dark:text-emerald-300"
                >
                  Admins: {adminCount}
                </Badge>

                <Button
                  size="sm"
                  className="h-9 gap-2 rounded-full bg-indigo-600 text-[13px] font-medium text-white shadow-sm hover:bg-indigo-700"
                  onClick={() => setOpenAdd(true)}
                >
                  <UserIcon className="h-4 w-4" />
                  Add user
                </Button>
              </div>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative w-full sm:max-w-sm">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search className="h-4 w-4" />
                </div>
                <Input
                  placeholder="Search by name, email, phone…"
                  className="h-9 rounded-lg pl-9 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Role filter */}
              <div className="flex gap-2 sm:items-center">
                <Select
                  value={roleFilter}
                  onValueChange={(v) =>
                    setRoleFilter(v === "all" ? "all" : (v as Role))
                  }
                >
                  <SelectTrigger className="h-9 w-full rounded-full border-border bg-background/70 text-[12px] sm:w-[160px]">
                    <SelectValue placeholder="All roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                    <SelectItem value="user">Users</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full text-[12px]"
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("all");
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* TABLE + MOBILE LIST */}
        <Card className="border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <CardHeader className="border-b border-border/60 px-4 py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Users list
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {loading && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="py-6 text-center text-xs text-muted-foreground"
                        >
                          Loading…
                        </TableCell>
                      </TableRow>
                    )}

                    {errorMsg && !loading && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="py-6 text-center text-xs text-red-500"
                        >
                          {errorMsg}
                        </TableCell>
                      </TableRow>
                    )}

                    {!loading && !errorMsg && filtered.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="py-6 text-center text-xs text-muted-foreground"
                        >
                          No users found.
                        </TableCell>
                      </TableRow>
                    )}

                    {filtered.map((u) => (
                      <TableRow key={u.id}>
                        {/* User */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {u.avatarUrl ? (
                                <AvatarImage
                                  src={u.avatarUrl}
                                  alt={u.fullName}
                                />
                              ) : (
                                <AvatarFallback className="text-xs">
                                  {u.fullName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1">
                                <p className="text-sm font-medium">
                                  {u.fullName}
                                </p>
                                {u.role === "admin" && (
                                  <Shield className="h-3.5 w-3.5 text-amber-500" />
                                )}
                              </div>
                              <p className="text-[11px] text-muted-foreground">
                                ID: {u.id.slice(0, 8)}…
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Email */}
                        <TableCell className="text-sm text-muted-foreground">
                          {u.email}
                        </TableCell>

                        {/* Phone */}
                        <TableCell className="text-sm">
                          {u.phone || "-"}
                        </TableCell>

                        {/* Role */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-full text-[11px] capitalize",
                                u.role === "admin"
                                  ? "border-amber-500/60 bg-amber-500/5"
                                  : "border-slate-600/60 bg-slate-800/40"
                              )}
                            >
                              {u.role}
                            </Badge>

                            <Select
                              value={u.role}
                              onValueChange={(v) =>
                                handleRoleChange(u.id, v as Role)
                              }
                            >
                              <SelectTrigger className="h-8 w-[120px] rounded-full border-border bg-background/70 text-[11px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>

                        {/* Joined */}
                        <TableCell className="text-[12px] text-muted-foreground">
                          {u.createdAt}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1 rounded-full text-[11px]"
                              onClick={() => openEditDialog(u)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1 rounded-full text-[11px]"
                              disabled={resettingId === u.id}
                              onClick={() =>
                                handleSendReset(u.email, u.id)
                              }
                            >
                              <KeyRound className="h-3.5 w-3.5" />
                              {resettingId === u.id
                                ? "Sending…"
                                : "Reset password"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>

            {/* MOBILE CARD LIST */}
            <div className="block md:hidden">
              {loading && (
                <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                  Loading…
                </div>
              )}

              {errorMsg && !loading && (
                <div className="px-4 py-6 text-center text-xs text-red-500">
                  {errorMsg}
                </div>
              )}

              {!loading && !errorMsg && filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                  No users found.
                </div>
              )}

              {filtered.length > 0 && (
                <div className="space-y-3 p-3">
                  {filtered.map((u) => (
                    <div
                      key={u.id}
                      className="rounded-lg border border-border/60 bg-background/80 p-3 text-[13px] shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          {u.avatarUrl ? (
                            <AvatarImage src={u.avatarUrl} alt={u.fullName} />
                          ) : (
                            <AvatarFallback>
                              {u.fullName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <div className="font-semibold leading-tight">
                              {u.fullName}
                            </div>
                            {u.role === "admin" && (
                              <Shield className="h-3 w-3 text-amber-500" />
                            )}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {u.email}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            Phone: {u.phone || "-"}
                          </div>
                          <div className="mt-1 text-[11px] text-muted-foreground">
                            Joined: {u.createdAt}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full text-[11px] capitalize",
                            u.role === "admin"
                              ? "border-amber-500/60 bg-amber-500/5"
                              : "border-slate-600/60 bg-slate-800/40"
                          )}
                        >
                          {u.role}
                        </Badge>
                      </div>

                      <div className="mt-3 space-y-2">
                        <Select
                          value={u.role}
                          onValueChange={(v) =>
                            handleRoleChange(u.id, v as Role)
                          }
                        >
                          <SelectTrigger className="h-8 w-full rounded-full border-border bg-background/70 text-[11px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 flex-1 gap-1 rounded-full text-[11px]"
                            onClick={() => openEditDialog(u)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 flex-1 gap-1 rounded-full text-[11px]"
                            disabled={resettingId === u.id}
                            onClick={() =>
                              handleSendReset(u.email, u.id)
                            }
                          >
                            <KeyRound className="h-3.5 w-3.5" />
                            {resettingId === u.id
                              ? "Sending…"
                              : "Reset password"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ADD USER DIALOG */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add user</DialogTitle>
            <DialogDescription className="text-xs">
              Create a new auth user and profile. Password can be changed later
              by the user via reset link.
            </DialogDescription>
          </DialogHeader>

          <form
            className="space-y-4 pt-2"
            onSubmit={(e) => void handleCreateUser(e)}
          >
            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Full name</Label>
              <Input
                value={addFullName}
                onChange={(e) => setAddFullName(e.target.value)}
                placeholder="John Doe"
                className="h-9 text-sm"
                required
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Email</Label>
              <Input
                type="email"
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
                placeholder="user@example.com"
                className="h-9 text-sm"
                required
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Password</Label>
              <Input
                type="password"
                value={addPassword}
                onChange={(e) => setAddPassword(e.target.value)}
                placeholder="Temporary password"
                className="h-9 text-sm"
                required
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Role</Label>
              <Select
                value={addRole}
                onValueChange={(v) => setAddRole(v as Role)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 rounded-md text-[13px]"
                  disabled={addLoading}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="h-9 rounded-md text-[13px] font-medium"
                disabled={addLoading}
              >
                {addLoading ? "Creating…" : "Create user"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT USER DIALOG (NO PASSWORD) */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
            <DialogDescription className="text-xs">
              Update name, phone and bio. Password cannot be edited here – use
              the reset link instead.
            </DialogDescription>
          </DialogHeader>

          {editingUser && (
            <div className="space-y-4 pt-2">
              <div className="grid gap-1.5">
                <Label className="text-xs font-medium">Full name</Label>
                <Input
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="h-9 text-sm"
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs font-medium">Phone</Label>
                <Input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="h-9 text-sm"
                />
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs font-medium">Bio</Label>
                <Input
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="h-9 text-sm"
                  placeholder="Short description"
                />
              </div>

              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="h-9 rounded-md text-[13px]"
                    disabled={editLoading}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="h-9 rounded-md text-[13px] font-medium"
                  disabled={editLoading}
                  onClick={() => void handleSaveEdit()}
                >
                  {editLoading ? "Saving…" : "Save changes"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
