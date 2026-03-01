// import AdminsidebarSkeleton from "@/components/AdminSidebarSkeleton";
// import AdminSidebarWrapper from "@/components/AdminSidebarWrapper";
// import { ToggleSidebar } from "@/components/ToggleSidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Suspense } from "react";

// export default async function AdminLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="antialiased min-h-screen">
//       <SidebarProvider>
//         <div className="flex h-full">
//           <ToggleSidebar />
//           <Suspense fallback={<AdminsidebarSkeleton />}>
//             <AdminSidebarWrapper />
//           </Suspense>
//         </div>
//         <main className="h-full w-full overflow-auto pb-8 ">{children}</main>
//       </SidebarProvider>
//     </div>
//   );
// }

import AdminSidebar from "@/components/AdminSidebar";
import AdminsidebarSkeleton from "@/components/AdminSidebarSkeleton";

import { ToggleSidebar } from "@/components/ToggleSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth-actions";
import { Suspense } from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <div className="antialiased min-h-screen">
      <SidebarProvider>
        <div className="flex h-full">
          <ToggleSidebar />
          <Suspense fallback={<AdminsidebarSkeleton />}>
            <AdminSidebar user={user} />
          </Suspense>
        </div>
        <main className="h-full w-full overflow-auto pb-8 ">{children}</main>
      </SidebarProvider>
    </div>
  );
}
