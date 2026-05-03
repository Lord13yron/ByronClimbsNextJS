"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "./auth-actions";
import { createClient } from "./supabase/supabaseServer";
import { getAllImagesForLibrary, getImagesForClimb, getImagesForPost } from "./data-service";
import { Climb } from "@/app/types/types";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

// Returns true only if this URL has no other references in climb_images or post_images.
// Used to decide whether deleting the DB row should also remove the storage file.
async function isSoleImageReference(
  supabase: SupabaseClient,
  url: string,
): Promise<boolean> {
  const [{ count: climbCount }, { count: postCount }] = await Promise.all([
    supabase
      .from("climb_images")
      .select("*", { count: "exact", head: true })
      .eq("url", url),
    supabase
      .from("post_images")
      .select("*", { count: "exact", head: true })
      .eq("url", url),
  ]);
  return (climbCount ?? 0) + (postCount ?? 0) <= 1;
}

export async function addClimbToSends(climbId: number) {
  // Implementation to add the climb to the user's sends
  const supabase = await createClient();
  const user = await getUser();
  console.log("User in addClimbToSends:", user);
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("sends")
    .insert([{ climb_id: climbId, user_id: user.id }]);

  if (error) {
    console.error("Error adding climb to sends:", error);
    throw new Error("Failed to add climb to sends");
  }
  revalidatePath("/database");
  return data;
}

export async function removeClimbFromSends(climbId: number) {
  // Implementation to remove the climb from the user's sends
  const supabase = await createClient();
  const user = await getUser();
  console.log("User in removeClimbFromSends:", user);
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("sends")
    .delete()
    .match({ climb_id: climbId, user_id: user.id });

  if (error) {
    console.error("Error removing climb from sends:", error);
    throw new Error("Failed to remove climb from sends");
  }
  revalidatePath("/database");
  return data;
}

export async function addClimbToFavorites(climbId: number) {
  const supabase = await createClient();
  const user = await getUser();
  console.log("User in addClimbToFavorites:", user);
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ climb_id: climbId, user_id: user.id }]);

  if (error) {
    console.error("Error adding climb to favorites:", error);
    throw new Error("Failed to add climb to favorites");
  }
  revalidatePath("/database");
  return data;
}

export async function removeClimbFromFavorites(climbId: number) {
  const supabase = await createClient();
  const user = await getUser();
  console.log("User in removeClimbFromFavorites:", user);
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .match({ climb_id: climbId, user_id: user.id });

  if (error) {
    console.error("Error removing climb from favorites:", error);
    throw new Error("Failed to remove climb from favorites");
  }
  revalidatePath("/database");
  return data;
}

export async function createNote(formData: FormData) {
  const supabase = await createClient();
  const user = await getUser();
  const noteContent = formData.get("note") as string;
  const climbId = formData.get("climb_id") as string;
  const climbSlug = formData.get("climb_slug") as string;

  console.log("User in createNote:", user);
  console.log("Climb ID in createNote:", climbId);
  console.log("Climb Slug in createNote:", climbSlug);
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("notes").insert([
    {
      climb_id: Number(climbId),
      user_id: user.id,
      note: noteContent,
    },
  ]);

  if (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note");
  }
  revalidatePath(`/database/${climbSlug}`);
}

export async function deleteNote(noteId: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("notes").delete().eq("id", noteId);

  if (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note");
  }
  revalidatePath("/database");
}

export async function editNote(formData: FormData) {
  const supabase = await createClient();
  const noteId = formData.get("note_id") as string;
  const noteContent = formData.get("note") as string;
  const climbSlug = formData.get("climb_slug") as string;
  console.log("Editing note ID:", noteId);
  console.log("New note content:", noteContent);
  console.log("Climb slug for revalidation:", climbSlug);

  const { error } = await supabase
    .from("notes")
    .update({ note: noteContent })
    .eq("id", Number(noteId));

  if (error) {
    console.error("Error editing note:", error);
    throw new Error("Failed to edit note");
  }
  revalidatePath(`/database/${climbSlug}`);
}

export async function addClimb(formData: FormData) {
  const supabase = await createClient();
  const name = (formData.get("name") as string).trim().toLowerCase();
  const type = formData.get("type") as string;
  const grade = formData.get("grade") as string;
  const city = (formData.get("city") as string).trim().toLowerCase();
  const area = (formData.get("area") as string).trim().toLowerCase();
  const subArea = (formData.get("sub-area") as string).trim().toLowerCase();
  const images = formData.getAll("images") as File[];
  const video = formData.get("video") as string;
  const existingImageUrls = formData.getAll("existing_image_urls") as string[];

  const hasVideo = video && typeof video === "string" && video.trim() !== "";
  const hasImages = images.length > 0 && images[0] instanceof File && images[0].size > 0;
  console.log("Video URL:", video);
  console.log("Has video?", hasVideo);

  if (!name || !type || !grade || !city || !area || !subArea) {
    throw new Error("Missing required fields");
  }

  const { data: climbData, error } = await supabase
    .from("climbs")
    .insert([
      {
        name,
        type,
        grade,
        city,
        area,
        subArea,
      },
    ])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "That climb already exists." };
    }
    console.error("Error adding climb:", error);
    throw new Error("Failed to add climb");
  }

  if (hasImages) {
    // Upload images and create product_images records
    const newImages = Array.from(images);
    const promises = newImages.map(async (image) => {
      const imageName = `${Date.now()}-${image.name
        .replace(/\s+/g, "-")
        .toLowerCase()}`;
      try {
        const { error: storageError } = await supabase.storage
          .from("postImages")
          .upload(imageName, image);
        if (storageError) {
          console.error("Image upload error:", storageError);
          throw new Error("Error uploading climb image");
        }

        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/postImages/${imageName}`;

        const { error } = await supabase
          .from("climb_images")
          .insert({ url, climb_id: climbData.id })
          .select();
        if (error) {
          console.error("Error inserting climb image:", error);
          throw new Error("Climb image could not be inserted");
        }
      } catch (imageError) {
        console.error("Image upload error:", imageError);
        throw new Error("Climb image could not be uploaded");
      }
    });
    await Promise.all(promises);
  }

  if (existingImageUrls.length > 0) {
    const { error: linkError } = await supabase
      .from("climb_images")
      .insert(existingImageUrls.map((url) => ({ url, climb_id: climbData.id })));
    if (linkError) {
      console.error("Error linking existing images to climb:", linkError);
      throw new Error("Failed to link existing images to climb");
    }
  }

  if (hasVideo) {
    const { error: videoError } = await supabase
      .from("climb_videos")
      .insert({ url: video, climb_id: climbData.id })
      .select();
    if (videoError) {
      console.error("Error inserting climb video:", videoError);
      throw new Error("Climb video could not be inserted");
    }
  }

  return climbData;
}

export async function editClimb(formData: FormData) {
  const supabase = await createClient();
  const climbId = formData.get("climb_id") as string;
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const grade = formData.get("grade") as string;
  const city = formData.get("city") as string;
  const area = formData.get("area") as string;
  const subArea = formData.get("sub-area") as string;

  if (!climbId || !name || !type || !grade || !city || !area || !subArea) {
    throw new Error("Missing required fields");
  }

  const { data, error } = await supabase
    .from("climbs")
    .update({ name, type, grade, city, area, subArea })
    .eq("id", Number(climbId));

  if (error) {
    console.error("Error editing climb:", error);
    throw new Error("Failed to edit climb");
  }

  return data;
}

export async function deleteClimb(climbId: number) {
  const supabase = await createClient();
  try {
    const images = await getImagesForClimb(climbId);
    if (images.length > 0) {
      const soleChecks = await Promise.all(
        images.map((img) => isSoleImageReference(supabase, img.url)),
      );
      const pathsToDelete = images
        .filter((_, i) => soleChecks[i])
        .map((img) => img.url.split("/").pop() || "")
        .filter(Boolean);

      if (pathsToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("postImages")
          .remove(pathsToDelete);

        if (storageError) {
          throw new Error(
            "Failed to delete climb images from storage",
            storageError,
          );
        }
      }
    }

    const { error } = await supabase.from("climbs").delete().eq("id", climbId);

    if (error) {
      throw new Error("Failed to delete climb", error);
    }
  } catch (error) {
    console.error("Error deleting climb:", error);
    throw new Error("Failed to delete climb");
  }

  return true;
}

export async function getClimbByIdClient(climbId: string) {
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

export async function deleteClimbImage(imageId: number, imageUrl: string) {
  const supabase = await createClient();
  const imagePath = imageUrl.split("/").pop() || "";

  try {
    const sole = await isSoleImageReference(supabase, imageUrl);
    if (sole) {
      const { error: storageError } = await supabase.storage
        .from("postImages")
        .remove([imagePath]);

      if (storageError) {
        throw new Error(
          "Failed to delete climb image from storage",
          storageError,
        );
      }
    }

    const { error } = await supabase
      .from("climb_images")
      .delete()
      .eq("id", imageId);

    if (error) {
      throw new Error("Failed to delete climb image record", error);
    }
  } catch (error) {
    console.error("Error deleting climb image:", error);
    throw new Error("Failed to delete climb image");
  }

  return true;
}

export async function addImagesToClimb(formData: FormData) {
  const supabase = await createClient();
  const climbId = formData.get("climb_id") as string;
  const images = formData.getAll("new_images") as File[];

  const validImages = images.filter((f) => f instanceof File && f.size > 0);
  if (!climbId || validImages.length === 0) {
    throw new Error("Missing required fields");
  }

  const newImages = validImages;
  const promises = newImages.map(async (image) => {
    const imageName = `${Date.now()}-${image.name.replace(/\s+/g, "-").toLowerCase()}`;
    try {
      const { error: storageError } = await supabase.storage
        .from("postImages")
        .upload(imageName, image);
      if (storageError) {
        console.error("Image upload error:", storageError);
        throw new Error("Error uploading climb image");
      }

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/postImages/${imageName}`;

      const { error } = await supabase
        .from("climb_images")
        .insert({ url, climb_id: climbId })
        .select();
      if (error) {
        console.error("Error inserting climb image:", error);
        throw new Error("Climb image could not be inserted");
      }
    } catch (imageError) {
      console.error("Image upload error:", imageError);
      throw new Error("Climb image could not be uploaded");
    }
  });
  await Promise.all(promises);
  return true;
}

export async function deleteClimbVideo(videoId: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("climb_videos")
      .delete()
      .eq("id", videoId);

    if (error) {
      throw new Error("Failed to delete climb video", error);
    }
  } catch (error) {
    console.error("Error deleting climb video:", error);
    throw new Error("Failed to delete climb video");
  }

  return true;
}

export async function addVideoToClimb(formData: FormData) {
  const supabase = await createClient();
  const climbId = formData.get("climb_id") as string;
  const videoUrl = formData.get("new_video") as string;

  if (!climbId || !videoUrl) {
    throw new Error("Missing required fields");
  }

  const { error } = await supabase
    .from("climb_videos")
    .insert({ url: videoUrl, climb_id: climbId })
    .select();

  if (error) {
    console.error("Error inserting climb video:", error);
    throw new Error("Climb video could not be inserted");
  }
  return true;
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const images = formData.getAll("images") as File[];
  const video = formData.get("video") as string;
  const existingImageUrls = formData.getAll("existing_image_urls") as string[];

  const hasVideo = video && typeof video === "string" && video.trim() !== "";
  const hasImages = images.length > 0 && images[0] instanceof File && images[0].size > 0;
  console.log("Video URL:", video);
  console.log("Has video?", hasVideo);

  if (!title || !content) {
    throw new Error("Missing required fields");
  }

  const { data: postData, error } = await supabase
    .from("posts")
    .insert([
      {
        title,
        content,
      },
    ])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("That post already exists.");
    }
    console.error("Error adding post:", error);
    throw new Error("Failed to add post");
  }

  if (hasImages) {
    // Upload images and create product_images records
    const newImages = Array.from(images);
    const promises = newImages.map(async (image) => {
      const imageName = `${Date.now()}-${image.name
        .replace(/\s+/g, "-")
        .toLowerCase()}`;
      try {
        const { error: storageError } = await supabase.storage
          .from("postImages")
          .upload(imageName, image);
        if (storageError) {
          console.error("Image upload error:", storageError);
          throw new Error("Error uploading post image");
        }

        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/postImages/${imageName}`;

        const { error } = await supabase
          .from("post_images")
          .insert({ url, post_id: postData.id })
          .select();
        if (error) {
          console.error("Error inserting post image:", error);
          throw new Error("Post image could not be inserted");
        }
      } catch (imageError) {
        console.error("Image upload error:", imageError);
        throw new Error("Post image could not be uploaded");
      }
    });
    await Promise.all(promises);
  }

  if (existingImageUrls.length > 0) {
    const { error: linkError } = await supabase
      .from("post_images")
      .insert(existingImageUrls.map((url) => ({ url, post_id: postData.id })));
    if (linkError) {
      console.error("Error linking existing images to post:", linkError);
      throw new Error("Failed to link existing images to post");
    }
  }

  if (hasVideo) {
    const { error: videoError } = await supabase
      .from("post_videos")
      .insert({ url: video, post_id: postData.id })
      .select();
    if (videoError) {
      console.error("Error inserting post video:", videoError);
      throw new Error("Post video could not be inserted");
    }
  }

  return postData;
}

export async function deleteBlogPost(postId: number) {
  const supabase = await createClient();
  try {
    const images = await getImagesForPost(postId);
    if (images.length > 0) {
      const soleChecks = await Promise.all(
        images.map((img) => isSoleImageReference(supabase, img.url)),
      );
      const pathsToDelete = images
        .filter((_, i) => soleChecks[i])
        .map((img) => img.url.split("/").pop() || "")
        .filter(Boolean);

      if (pathsToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("postImages")
          .remove(pathsToDelete);

        if (storageError) {
          throw new Error(
            "Failed to delete post images from storage",
            storageError,
          );
        }
      }
    }

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      throw new Error("Failed to delete post", error);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }

  return true;
}

export async function deletePost(postId: number) {
  const supabase = await createClient();
  try {
    const images = await getImagesForPost(postId);
    if (images.length > 0) {
      const soleChecks = await Promise.all(
        images.map((img) => isSoleImageReference(supabase, img.url)),
      );
      const pathsToDelete = images
        .filter((_, i) => soleChecks[i])
        .map((img) => img.url.split("/").pop() || "")
        .filter(Boolean);

      if (pathsToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("postImages")
          .remove(pathsToDelete);

        if (storageError) {
          throw new Error(
            "Failed to delete post images from storage",
            storageError,
          );
        }
      }
    }

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      throw new Error("Failed to delete post", error);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }

  return true;
}

export async function editBlogPost(formData: FormData) {
  const supabase = await createClient();
  const postId = formData.get("post_id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!postId || !title || !content) {
    throw new Error("Missing required fields");
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", Number(postId));

  if (error) {
    console.error("Error editing post:", error);
    throw new Error("Failed to edit post");
  }

  return data;
}

export async function addImagesToPost(formData: FormData) {
  const supabase = await createClient();
  const postId = formData.get("post_id") as string;
  const images = formData.getAll("new_images") as File[];

  const validImages = images.filter((f) => f instanceof File && f.size > 0);
  if (!postId || validImages.length === 0) {
    throw new Error("Missing required fields");
  }

  const newImages = validImages;
  const promises = newImages.map(async (image) => {
    const imageName = `${Date.now()}-${image.name.replace(/\s+/g, "-").toLowerCase()}`;
    try {
      const { error: storageError } = await supabase.storage
        .from("postImages")
        .upload(imageName, image);
      if (storageError) {
        console.error("Image upload error:", storageError);
        throw new Error("Error uploading post image");
      }

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/postImages/${imageName}`;

      const { error } = await supabase
        .from("post_images")
        .insert({ url, post_id: postId })
        .select();
      if (error) {
        console.error("Error inserting post image:", error);
        throw new Error("Post image could not be inserted");
      }
    } catch (imageError) {
      console.error("Image upload error:", imageError);
      throw new Error("Post image could not be uploaded");
    }
  });
  await Promise.all(promises);
  return true;
}

export async function deletePostImage(imageId: number, imageUrl: string) {
  const supabase = await createClient();
  const imagePath = imageUrl.split("/").pop() || "";

  try {
    const sole = await isSoleImageReference(supabase, imageUrl);
    if (sole) {
      const { error: storageError } = await supabase.storage
        .from("postImages")
        .remove([imagePath]);

      if (storageError) {
        throw new Error("Failed to delete post image from storage", storageError);
      }
    }

    const { error } = await supabase
      .from("post_images")
      .delete()
      .eq("id", imageId);

    if (error) {
      throw new Error("Failed to delete post image record", error);
    }
  } catch (error) {
    console.error("Error deleting post image:", error);
    throw new Error("Failed to delete post image");
  }

  return true;
}

export async function addVideoToPost(formData: FormData) {
  const supabase = await createClient();
  const postId = formData.get("post_id") as string;
  const videoUrl = formData.get("new_video") as string;

  if (!postId || !videoUrl) {
    throw new Error("Missing required fields");
  }

  const { error } = await supabase
    .from("post_videos")
    .insert({ url: videoUrl, post_id: postId })
    .select();

  if (error) {
    console.error("Error inserting post video:", error);
    throw new Error("Post video could not be inserted");
  }
  return true;
}

export async function deletePostVideo(videoId: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("post_videos")
      .delete()
      .eq("id", videoId);

    if (error) {
      throw new Error("Failed to delete post video", error);
    }
  } catch (error) {
    console.error("Error deleting post video:", error);
    throw new Error("Failed to delete post video");
  }

  return true;
}

export async function getImageLibrary(): Promise<string[]> {
  return getAllImagesForLibrary();
}

export async function linkExistingImageToClimb(url: string, climbId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("climb_images")
    .insert({ url, climb_id: climbId });
  if (error) {
    console.error("Error linking image to climb:", error);
    throw new Error("Failed to link image to climb");
  }
  return true;
}

export async function linkExistingImageToPost(url: string, postId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("post_images")
    .insert({ url, post_id: postId });
  if (error) {
    console.error("Error linking image to post:", error);
    throw new Error("Failed to link image to post");
  }
  return true;
}
