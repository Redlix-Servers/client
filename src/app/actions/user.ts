"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function uploadAsset(formData: FormData, uniqueId: string) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string; 
  const file = formData.get("file") as File;

  if (!uniqueId) {
    return { success: false, error: "Authentication required" };
  }

  if (!file || file.size === 0) {
    return { success: false, error: "No file selected." };
  }

  // 3MB LIMIT
  if (file.size > 3 * 1024 * 1024) {
    return { success: false, error: "File too large. Max limit is 3MB." };
  }

  const client = await prisma.user.findUnique({
    where: { uniqueId }
  });

  if (!client) {
    return { success: false, error: "Client not found" };
  }

  try {
    // CONVERT FILE TO BASE64 FOR PERSISTENCE
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64String}`;

    const asset = await prisma.asset.create({
      data: {
        name: name || file.name,
        type: type || file.type.split('/')[1] || 'doc',
        url: dataUrl, // ACTUAL FILE CONTENT STORED
        userId: client.id,
      },
    });
    
    revalidatePath("/client/dashboard");
    revalidatePath("/admin/dashboard");
    return { success: true, asset };
  } catch (error: any) {
    console.error("Error saving asset:", error);
    if (error.code === 'P2021') {
       return { success: false, error: "Database not ready. Please run the SQL migration." };
    }
    return { success: false, error: error.message || "Failed to upload asset." };
  }
}

export async function updateClient(formData: FormData, uniqueId: string) {
  const name = formData.get("name") as string;
  const mobile = formData.get("mobile") as string;
  const address = formData.get("address") as string;

  if (!uniqueId) {
    return { success: false, error: "Authentication required" };
  }

  try {
    const user = await prisma.user.update({
      where: { uniqueId },
      data: {
        name,
        mobile,
        address,
      },
    });
    
    revalidatePath("/client/dashboard");
    return { success: true, user };
  } catch (error: any) {
    console.error("Error updating client:", error);
    return { success: false, error: error.message || "Failed to update profile." };
  }
}

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const mobile = formData.get("mobile") as string;
  const address = formData.get("address") as string;
  const company = formData.get("company") as string;
  const productName = formData.get("productName") as string;
  const deliveryDate = formData.get("deliveryDate") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const members: any[] = [];
  for (let i = 1; i <= 5; i++) {
    const mName = formData.get(`memberName_${i}`) as string;
    const mEmail = formData.get(`memberEmail_${i}`) as string;
    if (mName && mEmail) {
      members.push({ name: mName, email: mEmail });
    }
  }

  if (!email) {
    return { success: false, error: "Primary email is required" };
  }

  try {
    const lastUser = await prisma.user.findFirst({
        orderBy: { id: 'desc' }
    });
    
    const nextNumber = lastUser ? lastUser.id + 1 : 1;
    const nextIdString = nextNumber.toString().padStart(3, '0');
    const uniqueId = `RED-SYS-26-${nextIdString}`;

    const user = await prisma.user.create({
      data: {
        uniqueId,
        name,
        email,
        mobile,
        address,
        company,
        productName,
        deliveryDate,
        startDate,
        endDate,
        members: members.length > 0 ? members : [],
      },
    });
    
    revalidatePath("/form");
    revalidatePath("/admin/dashboard");
    return { success: true, user };
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === 'P2002') {
       return { success: false, error: "Email or Unique ID already exists." };
    }
    return { success: false, error: error.message || "Something went wrong" };
  }
}
