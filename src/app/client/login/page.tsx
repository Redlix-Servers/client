"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, ChevronRight } from "lucide-react";
import Hyperspeed, { hyperspeedPresets } from "@/components/Hyperspeed/Hyperspeed";
import Image from "next/image";

export default function ClientLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // CUSTOM HYBRID PRESET: White Background + Colored Hero Lines
  const hybridPreset = {
    ...hyperspeedPresets.light,
    colors: {
      ...hyperspeedPresets.light.colors,
      leftCars: [0xdc2626, 0xdb2777, 0x9333ea, 0xc026d3],
      rightCars: [0x2563eb, 0x0891b2, 0x0d9488, 0x65a30d],
      sticks: [0xdc2626, 0xdb2777, 0x9333ea, 0xc026d3, 0x2563eb, 0x0891b2]
    }
  } as any;

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const uniqueId = formData.get("uniqueId") as string;

    const response = await fetch("/api/auth/client", {
      method: "POST",
      body: JSON.stringify({ uniqueId }),
    });

    if (response.ok) {
      router.push("/client/dashboard");
    } else {
      const data = await response.json();
      setError(data.error || "Authentication failed.");
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-white overflow-hidden selection:bg-zinc-900 selection:text-white">
      {/* BACKGROUND ENGINE - HYBRID COLORED LINES ON WHITE */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={hybridPreset} />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* BRAND LOGO */}
        <div className="flex justify-center mb-10">
           <Image
              src="https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772213109/Screenshot_2026-02-27_at_22.49.23-removebg-preview_nn1jee.png"
              alt="Redlix Systems"
              width={160}
              height={40}
              className="h-10 w-auto"
              style={{ width: "auto" }}
              priority
           />
        </div>

        {/* LOGIN CONTAINER - ULTRA LIGHT THEME */}
        <div className="bg-white/95 backdrop-blur-3xl border border-zinc-100 rounded-[2.5rem] p-10 space-y-10 shadow-2xl shadow-zinc-200/50">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-light text-zinc-900 tracking-tight leading-none">Client Access</h1>
            <p className="text-zinc-400 text-[10px] font-normal italic">Secure Identification Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-light text-zinc-900 tracking-tight transition-colors hover:text-zinc-500">Identification Key</label>
              <div className="relative group">
                <input
                  name="uniqueId"
                  type="text"
                  placeholder="RED-SYS-26-XXX"
                  className="w-full h-14 px-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 text-zinc-900 focus:border-zinc-900 focus:bg-white outline-none transition-all text-sm font-normal tracking-widest placeholder:text-zinc-300 shadow-inner"
                  required
                />
                <ShieldCheck className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-200 group-focus-within:text-zinc-900 transition-colors" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full h-14 bg-zinc-900 text-white text-[11px] font-medium rounded-2xl transition-all flex items-center justify-center gap-2 hover:bg-zinc-800 shadow-xl shadow-zinc-200/50 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Enter Portal <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-1 duration-300">
                <p className="text-[10px] text-red-600 font-normal text-center uppercase tracking-widest leading-none">{error}</p>
              </div>
            )}
          </form>

          <div className="pt-6 border-t border-zinc-50 flex items-center justify-center text-[10px] font-normal text-zinc-200 uppercase tracking-[0.3em]">
             Authorized Session Only
          </div>
        </div>
        
        {/* FOOTER */}
        <p className="text-center mt-8 text-zinc-300 text-[10px] font-bold uppercase tracking-[0.1em]">
          &copy; 2026 Redlix Engineering.
        </p>
      </div>
    </div>
  );
}
