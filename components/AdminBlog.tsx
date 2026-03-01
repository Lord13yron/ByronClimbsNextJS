import {
  getImagesForPost,
  getPostById,
  getVideosForPost,
} from "@/lib/data-service";
import AdminEditPost from "./AdminEditPost";

type AdminBlogProps = {
  editId: string;
};

export default async function AdminBlog({ editId }: AdminBlogProps) {
  const post = await getPostById(Number(editId));
  if (!post) {
    return <div>Post not found</div>;
  }
  const images = await getImagesForPost(Number(editId));
  const videos = await getVideosForPost(Number(editId));
  return <AdminEditPost post={post} images={images} videos={videos} />;
}
