import prisma from "@/lib/prisma";
import Link from "next/link";
import { createUser } from "../actions/user";

export const dynamic = "force-dynamic";

export default async function FormPage() {
  const users = await prisma.user.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Test Database</h1>
          <Link 
            href="/"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            ← Back
          </Link>
        </div>
        
        <form 
          action={async (formData: FormData) => {
            "use server";
            await createUser(formData);
          }} 
          className="space-y-4"
        >
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50"
            />
          </div>
          
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-zinc-900 text-zinc-50 rounded-lg font-medium hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Create User
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Existing Users</h2>
          <div className="space-y-3">
            {users.length === 0 ? (
              <p className="text-sm text-zinc-500 italic">No users found in database yet.</p>
            ) : (
              users.map((user: any) => (
                <div 
                  key={user.id} 
                  className="flex flex-col p-3 bg-zinc-50 rounded-lg dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-200">{user.name || "Anonymous"}</span>
                  <span className="text-xs text-zinc-500">{user.email}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
