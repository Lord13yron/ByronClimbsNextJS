import { getUser } from "@/lib/auth-actions";
import { createClient } from "@/lib/supabase/supabaseServer";
import HeroContent from "./HeroContent";

async function getLatestSendWithClimb() {
  try {
    const user = await getUser();
    if (!user) return null;

    const supabase = await createClient();
    const { data } = await supabase
      .from("sends")
      .select("*, climbs(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    return data ?? null;
  } catch {
    return null;
  }
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function HeroBanner() {
  const latestSend = await getLatestSendWithClimb();
  const climb = latestSend?.climbs ?? null;
  const sendDate = latestSend ? formatDate(latestSend.created_at) : null;

  return <HeroContent climb={climb} sendDate={sendDate} />;
}
