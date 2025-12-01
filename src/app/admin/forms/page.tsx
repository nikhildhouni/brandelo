// app/admin/forms/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Eye } from "lucide-react";

const mockSubmissions = [
  {
    id: "f201",
    form_key: "contact_form",
    form_title: "Contact Form",
    status: "new",
    submitted_at: "2025-01-02T10:00:00Z",
  },
  {
    id: "f202",
    form_key: "landing_lead",
    form_title: "Landing Page Lead",
    status: "reviewed",
    submitted_at: "2025-01-03T11:30:00Z",
  },
];

export default async function FormsPage() {
  const submissions = mockSubmissions; // TODO: Supabase se fetch

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Form submissions
        </h1>
        <p className="text-xs text-muted-foreground md:text-sm">
          Website / landing forms ka raw data – jis se leads banenge.
        </p>
      </div>

      <Card className="border-slate-800/80 bg-background/70">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Submissions</CardTitle>
          <Badge variant="outline" className="rounded-full border-slate-700/70 text-[11px]">
            Total: {submissions.length}
          </Badge>
        </CardHeader>
        <CardContent>
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
                {submissions.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{row.form_title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          key: {row.form_key}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="rounded-full border-slate-700/80 bg-slate-950/60 text-[11px] capitalize"
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full border-slate-700/80 text-[11px]"
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View JSON
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {submissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-6 text-center text-xs text-muted-foreground">
                      Abhi koi form submit nahi hua – website pe traffic bhej 🚀
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
