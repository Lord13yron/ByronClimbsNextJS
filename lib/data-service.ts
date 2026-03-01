import {
  Climb,
  ContentImage,
  ContentVideo,
  Favorite,
  Note,
  Post,
  PostImage,
  Send,
} from "@/app/types/types";
import { createClient } from "./supabase/supabaseServer";
import { getUser } from "./auth-actions";

export async function getPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch posts", error);
  }
  return data as Post[];
}

// export async function getRecentPosts(limit: number) {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from("posts")
//     .select("*")
//     .order("created_at", { ascending: false })
//     .limit(limit);

//   if (error) {
//     throw new Error("Failed to fetch recent posts", error);
//   }
//   return data as Post[];
// }

export async function getRecentPosts(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Failed to fetch recent posts", error);
  }
  return data as Post[];
}

export async function getPostById(postId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) {
    throw new Error("Failed to fetch post by ID", error);
  }
  return data as Post;
}

export async function getImagesForPost(postId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("post_images")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    throw new Error("Failed to fetch images for post", error);
  }
  return data as PostImage[];
}

export async function getVideosForPost(postId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("post_videos")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    throw new Error("Failed to fetch videos for post", error);
  }
  return data as ContentVideo[];
}

export async function getImagesForClimb(climbId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("climb_images")
    .select("*")
    .eq("climb_id", climbId);

  if (error) {
    throw new Error("Failed to fetch images for climb", error);
  }
  return data as ContentImage[];
}

export async function getVideosForClimb(climbId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("climb_videos")
    .select("*")
    .eq("climb_id", climbId);

  if (error) {
    throw new Error("Failed to fetch videos for climb", error);
  }
  return data as ContentVideo[];
}

export async function getClimbs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("climbs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch climbs", error);
  }
  return data as Climb[];
}

export async function getClimbBySlug(climbSlug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("climbs")
    .select("*")
    .eq("slug", climbSlug)
    .single();

  if (error) {
    throw new Error("Failed to fetch climb by slug", error);
  }
  return data as Climb;
}

export async function getClimbById(climbId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("climbs")
    .select("*")
    .eq("id", climbId)
    .single();

  if (error) {
    throw new Error("Failed to fetch climb by slug", error);
  }
  return data as Climb;
}

export async function getSendsForUser() {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("sends")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Failed to fetch sends for user", error);
  }
  return data as Send[];
}

export async function getFavoritesForUser() {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Failed to fetch favorites for user", error);
  }
  return data as Favorite[];
}

export async function getNotesForClimb(climbId: number) {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("climb_id", climbId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch notes for climb", error);
  }
  return data as Note[];
}
