export type Post = {
  id: number;
  created_at: string;
  title: string;
  content: string;
};

export type Climb = {
  id: number;
  created_at: string;
  name: string;
  grade: string;
  city: string;
  area: string;
  subArea: string;
  slug: string;
  type: string;
};

export type Send = {
  id: number;
  created_at: string;
  climb_id: number;
  user_id: number;
};

export type Favorite = {
  id: number;
  created_at: string;
  climb_id: number;
  user_id: number;
};

export type SearchParams = {
  filter?: string;
};

export type Note = {
  id: number;
  created_at: string;
  climb_id: number;
  user_id: number;
  note: string;
};

export type PostImage = {
  id: number;
  created_at: string;
  url: string;
  post_id?: number;
};

export type ContentImage = {
  id: number;
  created_at: string;
  url: string;
  content_id?: number;
};

export type ContentVideo = {
  id: number;
  created_at: string;
  url: string;
  content_id?: number;
};

export type UserProfile = {
  id: string;
  created_at: string;
  avartar_url: string;
  email: string;
  role: "user" | "admin";
  username: string;
};
