'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type DeleteUserDialogProps = {
  userId: string
  email: string | null
}

export function DeleteUserDialog({ userId, email }: DeleteUserDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border border-red-300/60 bg-red-400/15 px-3 py-1 text-[11px] text-red-100 hover:bg-red-400/25 hover:border-red-200/80 transition-all backdrop-blur-md"
        >
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border border-white/20 bg-slate-900/80 text-slate-50 backdrop-blur-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Delete user?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-slate-300">
            This action cannot be undone. This will permanently delete the
            profile for{' '}
            <span className="font-medium text-red-200">
              {email || 'this user'}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form
          action={`/api/admin/users/${userId}/delete`}
          method="post"
          className="mt-4 flex justify-end gap-2"
        >
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="outline"
              className="h-8 rounded-full border border-white/30 bg-white/5 px-3 text-[11px]"
            >
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <button
              type="submit"
              className="h-8 rounded-full border border-red-300/60 bg-red-500/80 px-3 text-[11px] font-medium text-slate-50 hover:bg-red-500 transition-all shadow-[0_8px_20px_rgba(248,113,113,0.55)]"
            >
              Confirm delete
            </button>
          </AlertDialogAction>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
