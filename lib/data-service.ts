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

export async function getAllPostImages() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("post_images").select("*");

  if (error) {
    throw new Error("Failed to fetch all post images", error);
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

export async function getAllClimbImages(): Promise<
  { climb_id: number; url: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("climb_images")
    .select("climb_id, url");
  if (error) throw new Error("Failed to fetch climb images");
  return data ?? [];
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

export async function getAllImagesForLibrary(): Promise<string[]> {
  const supabase = await createClient();
  const [{ data: climbImages }, { data: postImages }] = await Promise.all([
    supabase.from("climb_images").select("url"),
    supabase.from("post_images").select("url"),
  ]);
  const allUrls = [
    ...(climbImages?.map((i: { url: string }) => i.url) ?? []),
    ...(postImages?.map((i: { url: string }) => i.url) ?? []),
  ];
  return [...new Set(allUrls)];
}

export async function getAdminStats() {
  const supabase = await createClient();
  const [
    { count: totalClimbs },
    { count: totalSends },
    { count: totalUsers },
    { count: totalPosts },
  ] = await Promise.all([
    supabase.from("climbs").select("*", { count: "exact", head: true }),
    supabase.from("sends").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
  ]);
  return {
    totalClimbs: totalClimbs ?? 0,
    totalSends: totalSends ?? 0,
    totalUsers: totalUsers ?? 0,
    totalPosts: totalPosts ?? 0,
  };
}

export type ActivityItem = {
  type: string;
  label: string;
  created_at: string;
};

export async function getRecentActivity(limit = 8): Promise<ActivityItem[]> {
  const supabase = await createClient();

  const [
    { data: users },
    { data: climbs },
    { data: posts },
    { data: sends },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, created_at, username")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("climbs")
      .select("id, created_at, name")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("posts")
      .select("id, created_at, title")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("sends")
      .select("id, created_at, climbs(name), profiles(username)")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const items: ActivityItem[] = [
    ...(users ?? []).map((u: { created_at: string; username: string }) => ({
      type: "user_registered",
      label: `New user registered: ${u.username ?? "unknown"}`,
      created_at: u.created_at,
    })),
    ...(climbs ?? []).map((c: { created_at: string; name: string }) => ({
      type: "climb_added",
      label: `Route added: ${c.name}`,
      created_at: c.created_at,
    })),
    ...(posts ?? []).map((p: { created_at: string; title: string }) => ({
      type: "post_added",
      label: `Blog post published: ${p.title}`,
      created_at: p.created_at,
    })),
    ...(sends ?? []).map(
      (s: {
        created_at: string;
        climbs: { name: string }[];
        profiles: { username: string }[];
      }) => ({
        type: "send_logged",
        label: `${s.profiles[0]?.username ?? "Someone"} sent ${s.climbs[0]?.name ?? "unknown route"}`,
        created_at: s.created_at,
      })
    ),
  ];

  return items
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, limit);
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
