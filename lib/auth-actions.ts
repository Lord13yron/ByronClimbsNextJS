"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/supabaseServer";
import { UserProfile } from "@/app/types/types";

// export async function getUser() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     return user;
//   }

//   return null;
// }

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return profile as UserProfile;
  }

  return null;
}

export async function signOutUser() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    throw new Error("Failed to sign out");
  }
  redirect("/account/signin");
}

// export async function signInUser(formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   console.log("Signing in user with email:", email);
//   const supabase = await createClient();
//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) {
//     console.error("Error signing in:", error);
//     throw new Error("Failed to sign in");
//   }
//   redirect("/account");
// }

export async function signInWithMagicLink(formData: FormData) {
  const email = formData.get("email-magic") as string;
  console.log("Sending magic link to email:", email);
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });
  if (error) {
    console.error("Error sending magic link:", error);
    throw new Error("Failed to send magic link");
  }
  redirect("/account/confirm");
}
