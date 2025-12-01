// app/admin/forms/page.tsx
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Eye, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type SubmissionStatus = "new" | "reviewed" | "converted";

type FormSubmission = {
  id: string;
  form_key: string;
  form_title: string | null;
  status: SubmissionStatus;
  submitted_at: string;
  payload: Record<string, any>;
};

export default function FormsPage() {
  const supabase = React.useMemo(() => createClient(), []);

  const [submissions, setSubmissions] = React.useState<FormSubmission[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const [formFilter, setFormFilter] = React.useState<"all" | string>("all");
  const [statusFilter, setStatusFilter] =
    React.useState<"all" | SubmissionStatus>("all");

  const [openJson, setOpenJson] = React.useState(false);
  const [activeRow, setActiveRow] = React.useState<FormSubmission | null>(null);

  React.useEffect(() => {
    void fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSubmissions() {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("form_submissions")
      .select("id, form_key, form_title, status, submitted_at, payload")
      .is("deleted_at", null)
      .order("submitted_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setSubmissions([]);
      setLoading(false);
      return;
    }

    setSubmissions((data ?? []) as FormSubmission[]);
    setLoading(false);
  }

  // ---- update status for a row ----
  async function handleStatusChange(id: string, status: SubmissionStatus) {
    // optimistic update
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );

    const { error } = await supabase
      .from("form_submissions")
      .update({ status })
      .eq("id", id);

    if (error) {
      window.alert("Failed to update status: " + error.message);
      // ideally you’d re-fetch or store previous state; simple fallback:
      void fetchSubmissions();
    }
  }

  const filtered = React.useMemo(() => {
    return submissions.filter((s) => {
      const matchesForm =
        formFilter === "all" ? true : s.form_key === formFilter;
      const matchesStatus =
        statusFilter === "all" ? true : s.status === statusFilter;
      return matchesForm && matchesStatus;
    });
  }, [submissions, formFilter, statusFilter]);

  const total = submissions.length;

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            Form submissions
          </h1>
          <p className="text-xs text-muted-foreground md:text-sm">
            Raw data from your website / landing forms – this is where leads
            start.
          </p>
        </div>

        {/* CARD */}
        <Card className="border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <CardHeader className="space-y-3 pb-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Submissions
                </CardTitle>
                <p className="text-[11px] text-muted-foreground">
                  {total} total • {filtered.length} shown
                </p>
              </div>

              <Badge
                variant="outline"
                className="self-start rounded-full border-border/70 text-[11px]"
              >
                Total: {total}
              </Badge>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex items-center gap-2 text-[11px]">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="hidden sm:inline text-muted-foreground">
                  Filters
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select
                  value={formFilter}
                  onValueChange={(v) => setFormFilter(v)}
                >
                  <SelectTrigger className="h-8 w-full rounded-full border-border bg-background/70 text-[11px] sm:w-[150px]">
                    <SelectValue placeholder="All forms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All forms</SelectItem>
                    <SelectItem value="simple_service">
                      Simple service
                    </SelectItem>
                    <SelectItem value="growth_project">
                      Growth project
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={statusFilter}
                  onValueChange={(v) =>
                    setStatusFilter(
                      v === "all" ? "all" : (v as SubmissionStatus)
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-full rounded-full border-border bg-background/70 text-[11px] sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Form</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="py-6 text-center text-xs text-muted-foreground"
                        >
                          Loading…
                        </TableCell>
                      </TableRow>
                    )}

                    {errorMsg && !loading && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="py-6 text-center text-xs text-red-500"
                        >
                          {errorMsg}
                        </TableCell>
                      </TableRow>
                    )}

                    {!loading && !errorMsg && filtered.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="py-6 text-center text-xs text-muted-foreground"
                        >
                          No submissions yet – send some traffic to your
                          website 🚀
                        </TableCell>
                      </TableRow>
                    )}

                    {filtered.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">
                              {row.form_title || "Untitled form"}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              key: {row.form_key}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-full border-slate-700/80 bg-slate-950/60 text-[11px] capitalize",
                              row.status === "new" && "border-emerald-500/60",
                              row.status === "reviewed" &&
                                "border-amber-500/60",
                              row.status === "converted" &&
                                "border-indigo-500/60"
                            )}
                          >
                            {row.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-[11px] text-muted-foreground">
                          {new Date(row.submitted_at).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Select
                              value={row.status}
                              onValueChange={(v) =>
                                handleStatusChange(
                                  row.id,
                                  v as SubmissionStatus
                                )
                              }
                            >
                              <SelectTrigger className="h-8 w-[120px] rounded-full border-border bg-background/70 text-[11px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="reviewed">
                                  Reviewed
                                </SelectItem>
                                <SelectItem value="converted">
                                  Converted
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-full border-slate-700/80 text-[11px]"
                              onClick={() => {
                                setActiveRow(row);
                                setOpenJson(true);
                              }}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View JSON
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
                  No submissions yet – send some traffic to your website 🚀
                </div>
              )}

              {filtered.length > 0 && (
                <div className="space-y-3 p-3">
                  {filtered.map((row) => (
                    <div
                      key={row.id}
                      className="rounded-lg border border-border/60 bg-background/80 p-3 text-[13px] shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-semibold leading-tight">
                            {row.form_title || "Untitled form"}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            key: {row.form_key}
                          </div>
                          <div className="mt-1 text-[11px] text-muted-foreground">
                            {new Date(row.submitted_at).toLocaleString(
                              "en-IN",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )}
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full border-slate-700/80 bg-slate-950/60 text-[11px] capitalize",
                            row.status === "new" && "border-emerald-500/60",
                            row.status === "reviewed" &&
                              "border-amber-500/60",
                            row.status === "converted" &&
                              "border-indigo-500/60"
                          )}
                        >
                          {row.status}
                        </Badge>
                      </div>

                      <div className="mt-3 space-y-2">
                        <Select
                          value={row.status}
                          onValueChange={(v) =>
                            handleStatusChange(row.id, v as SubmissionStatus)
                          }
                        >
                          <SelectTrigger className="h-8 w-full rounded-full border-border bg-background/70 text-[11px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-full justify-center rounded-full border-slate-700/80 text-[11px]"
                          onClick={() => {
                            setActiveRow(row);
                            setOpenJson(true);
                          }}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View JSON
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* JSON VIEWER */}
      <Dialog open={openJson} onOpenChange={setOpenJson}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission payload</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-xs">
            Raw JSON of this submission. You can create leads / clients from
            here.
          </DialogDescription>
          <pre className="mt-2 max-h-[60vh] overflow-auto rounded-md bg-slate-950/80 p-3 text-xs text-slate-100">
            {activeRow ? JSON.stringify(activeRow.payload, null, 2) : "{}"}
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
}
