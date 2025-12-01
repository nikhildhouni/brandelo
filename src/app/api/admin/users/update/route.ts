// app/api/admin/users/update/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // SECRET, .env.me

const adminClient = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function POST(req: Request) {
  try {
    const { id, role, fullName, phone, bio } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 }
      );
    }

    const payload: Record<string, any> = {};

    if (role) payload.role = role;                 // "admin" | "user"
    if (fullName !== undefined) payload.full_name = fullName;
    if (phone !== undefined) payload.phone = phone || null;
    if (bio !== undefined) payload.bio = bio || null;

    if (Object.keys(payload).length === 0) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 }
      );
    }

    const { error } = await adminClient
      .from("profiles")
      .update(payload)
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
