// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // keep this SECRET

const adminClient = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function POST(req: Request) {
  try {
    const { email, password, fullName, role } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: "email, password, fullName are required" },
        { status: 400 }
      );
    }

    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

    if (error || !data.user) {
      return NextResponse.json(
        { message: error?.message ?? "Failed to create user" },
        { status: 400 }
      );
    }

    const userId = data.user.id;

    // insert / upsert into profiles table
    const { error: profileErr } = await adminClient
      .from("profiles")
      .upsert(
        {
          id: userId,
          email,
          full_name: fullName,
          role: role === "admin" ? "admin" : "user",
        },
        { onConflict: "id" }
      );

    if (profileErr) {
      return NextResponse.json(
        { message: profileErr.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        id: userId,
        email,
        fullName,
        role: role === "admin" ? "admin" : "user",
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
