"use client";

import { useState } from "react";
import { updateClient } from "@/app/actions/user";

export default function ClientSettingsForm({ client }: { client: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await updateClient(formData, client.uniqueId);

    if (result.success) {
      setMessage({ type: "success", text: "Profile updated." });
    } else {
      setMessage({ type: "error", text: result.error || "Failed." });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md bg-white border border-zinc-200 rounded p-6 shadow-sm space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-tight">Profile Settings</h3>
        <p className="text-zinc-400 text-[10px] font-normal uppercase tracking-widest">Update your basic information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-normal text-zinc-400 uppercase tracking-widest">Contact Person</label>
          <input
            name="name"
            defaultValue={client.name || ""}
            type="text"
            className="w-full h-10 px-3 rounded border border-zinc-200 bg-white focus:border-zinc-900 outline-none text-xs font-normal transition-all"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-normal text-zinc-400 uppercase tracking-widest">Mobile Number</label>
          <input
            name="mobile"
            defaultValue={client.mobile || ""}
            type="tel"
            className="w-full h-10 px-3 rounded border border-zinc-200 bg-white focus:border-zinc-900 outline-none text-xs font-normal transition-all"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-normal text-zinc-400 uppercase tracking-widest">Office Address</label>
          <input
            name="address"
            defaultValue={client.address || ""}
            type="text"
            className="w-full h-10 px-3 rounded border border-zinc-200 bg-white focus:border-zinc-900 outline-none text-xs font-normal transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded transition-all uppercase tracking-widest"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>

      {message && (
        <div className={`p-3 rounded text-[10px] text-center font-bold border uppercase tracking-widest ${
          message.type === "success" 
            ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
            : "bg-red-50 border-red-100 text-red-700"
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
