// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; // <-- apne project ke hisaab se adjust karo

export async function POST() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Signed out" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
