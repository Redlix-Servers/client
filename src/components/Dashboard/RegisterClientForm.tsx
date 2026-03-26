"use client";

import { useState } from "react";
import { createUser } from "@/app/actions/user";

export default function RegisterClientForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string; uniqueId?: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await createUser(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Registered Successfully!", uniqueId: result.user?.uniqueId });
      (event.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: "error", text: result.error || "Failed to register" });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl w-full bg-white border border-zinc-200 rounded-lg p-8 space-y-8 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-xl font-normal text-zinc-900 tracking-tight">Enterprise Client Registration</h3>
          <p className="text-zinc-500 text-sm">Full lifecycle client onboarding for Redlix Systems.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 group">
        {/* Core Company Info */}
        <section className="space-y-4">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Organization & Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-normal text-zinc-500 px-1">Point of Contact Name</label>
              <input name="name" type="text" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-normal text-zinc-500 px-1">Primary Email Address</label>
              <input name="email" type="email" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-normal text-zinc-500 px-1">Mobile Number</label>
              <input name="mobile" type="tel" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-normal text-zinc-500 px-1">Company Name</label>
              <input name="company" type="text" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-normal text-zinc-500 px-1">Office Address</label>
            <input name="address" type="text" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
          </div>
        </section>

        {/* Product Details */}
        <section className="space-y-4 pt-4 border-t border-zinc-50">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Project & Lifecycle</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-1">
              <label className="text-xs font-normal text-zinc-500 px-1">Product/Service Name</label>
              <input name="productName" type="text" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-normal text-zinc-500 px-1">Product Delivery Date</label>
              <input name="deliveryDate" type="date" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-normal text-zinc-500 px-1">Contract Start Date</label>
              <input name="startDate" type="date" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-normal text-zinc-500 px-1">Contract End Date</label>
              <input name="endDate" type="date" className="w-full h-10 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-white focus:border-zinc-900 outline-none transition-all" required />
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="space-y-4 pt-4 border-t border-zinc-50">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Team Members (Max 5)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50/50 p-4 rounded-lg">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 border border-zinc-100 bg-white rounded space-y-3">
                <span className="text-[10px] font-black text-zinc-300 uppercase">MEMBER {i}</span>
                <div className="space-y-2">
                  <input name={`memberName_${i}`} placeholder="Name" className="w-full h-8 px-2 text-xs rounded border border-zinc-100 bg-white outline-none focus:border-zinc-400" />
                  <input name={`memberEmail_${i}`} placeholder="Email" className="w-full h-8 px-2 text-xs rounded border border-zinc-100 bg-white outline-none focus:border-zinc-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-zinc-950 hover:bg-zinc-800 text-white font-normal rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Registering..." : "Finalize Registration"}
        </button>
      </form>

      {message && (
        <div className={`p-6 rounded-lg text-sm font-normal border shadow-lg animate-in slide-in-from-top-2 flex flex-col items-center gap-4 ${
          message.type === "success" 
            ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
            : "bg-red-50 border-red-100 text-red-700"
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-bold">{message.text}</span>
          </div>
          {message.uniqueId && (
            <div className="bg-white p-4 rounded border border-emerald-200 text-center space-y-2">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">System Unique ID</p>
              <p className="text-2xl font-black text-zinc-900 font-mono tracking-tighter">{message.uniqueId}</p>
              <p className="text-[10px] text-zinc-400 font-normal">Give this to the client for login.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
