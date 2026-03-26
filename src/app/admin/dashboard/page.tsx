import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AdminDashboardContent from "./AdminDashboardContent";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ tab?: string; query?: string }>;
}

export default async function AdminDashboard({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  const { tab = "overview", query = "" } = await searchParams;

  const users = await prisma.user.findMany({
    orderBy: { id: "desc" },
    include: { assets: true }
  });

  return (
    <AdminDashboardContent users={users} tab={tab} query={query} />
  );
}
