import {
  getClimbById,
  getImagesForClimb,
  getVideosForClimb,
} from "@/lib/data-service";
import AdminEditClimb from "./AdminEditClimb";

type AdminClimbProps = {
  climbId: string;
};

export default async function AdminClimb({ climbId }: AdminClimbProps) {
  const climb = await getClimbById(climbId);
  const images = await getImagesForClimb(Number(climbId));
  const videos = await getVideosForClimb(Number(climbId));
  return <AdminEditClimb climb={climb} images={images} videos={videos} />;
}
