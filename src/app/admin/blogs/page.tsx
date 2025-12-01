// app/admin/blogs/page.tsx
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
import { Plus, Edit3 } from "lucide-react";

const mockPosts = [
  {
    id: "b301",
    title: "Kaise banaye ek mast landing page",
    slug: "mast-landing-page",
    status: "published",
    published_at: "2025-01-05T09:00:00Z",
  },
  {
    id: "b302",
    title: "Leads ko clients mein kaise convert karein",
    slug: "leads-to-clients",
    status: "draft",
    published_at: null,
  },
];

export default async function BlogsPage() {
  const posts = mockPosts; // TODO: Supabase se fetch

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            Blog posts
          </h1>
          <p className="text-xs text-muted-foreground md:text-sm">
            Yahi se apne content ko handle karo – publish, draft, update.
          </p>
        </div>
        <Button
          size="sm"
          className="rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 text-xs font-semibold text-slate-950 shadow-md shadow-indigo-500/40 hover:opacity-90"
        >
          <Plus className="mr-1 h-3 w-3" />
          New post
        </Button>
      </div>

      <Card className="border-slate-800/80 bg-background/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">All posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{post.title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          /blog/{post.slug}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="rounded-full border-slate-700/80 bg-slate-950/60 text-[11px] capitalize"
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[11px] text-muted-foreground">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString(
                            "en-IN",
                            { dateStyle: "medium" }
                          )
                        : "Not published"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full border-slate-700/80 text-[11px]"
                      >
                        <Edit3 className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {posts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-6 text-center text-xs text-muted-foreground">
                      Abhi tak koi blog nahi – thoda gyaan baanto 😄
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
