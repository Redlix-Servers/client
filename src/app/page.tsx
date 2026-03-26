import Image from "next/image";
import Link from "next/link";
import Hyperspeed from "@/components/Hyperspeed/Hyperspeed";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-zinc-900 selection:text-white relative overflow-hidden">
      {/* BACKGROUND MOTION ENGINE */}
      <Hyperspeed />

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full border-b border-zinc-100 bg-white/60 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772213109/Screenshot_2026-02-27_at_22.49.23-removebg-preview_nn1jee.png"
              alt="Redlix Systems"
              width={180}
              height={45}
              className="h-12 w-auto object-contain"
              style={{ width: "auto" }}
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/login"
              className="px-6 py-2.5 bg-zinc-950 text-white text-[10px] font-normal uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200/50"
            >
              Control Hub
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-start justify-center pt-40 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-3xl w-full text-left space-y-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-zinc-50 border border-zinc-100 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] animate-in fade-in slide-in-from-left-4 duration-700">
            System V.1.0 // Production Ready
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl md:text-5xl font-light text-zinc-950 leading-[0.9] tracking-tighter">
              Manage your assets <br />
              <span className="text-zinc-300">with Redlix Hub.</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-lg">
              The synchronized portal for secure brand collateral, client management, and real-time asset verification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-start pt-6">
            <Link
              href="/client/login"
              className="group flex h-14 items-center justify-center gap-4 rounded-2xl bg-zinc-950 px-8 text-white transition-all hover:bg-zinc-800 shadow-2xl shadow-zinc-200/50"
            >
              <span className="font-normal text-sm uppercase tracking-[0.2em]">Connect Hub</span>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-zinc-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-zinc-200 uppercase tracking-[0.3em] w-full text-left md:w-auto italic">
            &copy; 2026 Redlix Systems // Secured Assets Protocol
          </p>
          <div className="flex gap-10 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] w-full justify-start md:w-auto">
             {/* Simplified Footer / Legal removed per request */}
             <span className="text-zinc-100">Synchronized Portal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}