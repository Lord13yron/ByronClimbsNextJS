import { getUser } from "@/lib/auth-actions";
import AdminSidebar from "./AdminSidebar";

export default async function AdminSidebarWrapper() {
  const user = await getUser();
  return <AdminSidebar user={user} />;
}
