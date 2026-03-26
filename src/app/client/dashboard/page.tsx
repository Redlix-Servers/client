import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ClientDashboardContent from "./ClientDashboardContent";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function ClientDashboard({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("client_session");
  const uniqueId = cookieStore.get("client_id");

  if (!session || session.value !== "authenticated" || !uniqueId) {
    redirect("/client/login");
  }

  const { tab = "overview" } = await searchParams;

  const client = await prisma.user.findUnique({
    where: { uniqueId: uniqueId.value },
    include: { assets: true }
  });

  if (!client) {
    redirect("/client/login");
  }

  return (
    <ClientDashboardContent client={client} tab={tab} />
  );
}
