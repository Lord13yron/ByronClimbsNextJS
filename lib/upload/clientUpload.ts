import { createClient } from "@/lib/supabase/supabaseClient";

const BUCKET = "postImages";

export async function uploadFilesToBucket(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];
  const supabase = createClient();

  return Promise.all(
    files.map(async (file) => {
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const objectName = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(objectName, file);
      if (error) {
        throw new Error(`Upload failed for ${file.name}: ${error.message}`);
      }
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectName}`;
    })
  );
}
