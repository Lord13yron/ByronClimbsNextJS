import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased min-h-screen">
      <AdminTopBar />
      <main className="min-h-screen w-full">{children}</main>
    </div>
  );
}
