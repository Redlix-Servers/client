"use client";

import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import RegisterClientForm from "@/components/Dashboard/RegisterClientForm";
import Link from "next/link";
import Image from "next/image";
import AssetViewer from "@/components/Dashboard/AssetViewer";
import { 
  Users, 
  Database, 
  Activity, 
  AlertCircle,
  History,
  File as FileIcon,
  ImageIcon,
  FileText,
  Search,
  Building2,
  ExternalLink,
  Layers,
  CheckCircle,
  Clock,
  Maximize2
} from "lucide-react";

interface PageProps {
  users: any[];
  tab: string;
  query: string;
}

export default function AdminDashboardContent({ users, tab, query }: PageProps) {
  const [viewingAsset, setViewingAsset] = useState<any | null>(null);

  // Flat list of all assets
  const allAssets = users.flatMap((u: any) => (u.assets || []).map((a: any) => ({ ...a, company: u.company, uniqueId: u.uniqueId })));
  allAssets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredAssets = query 
    ? allAssets.filter(a => a.company?.toLowerCase().includes(query.toLowerCase()) || a.name.toLowerCase().includes(query.toLowerCase()) || a.uniqueId.toLowerCase().includes(query.toLowerCase()))
    : allAssets;

  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-zinc-100 selection:text-zinc-900">
      <Sidebar />

      <main className="flex-1 ml-56 p-6 space-y-8 text-zinc-900">
        <header className="flex flex-col gap-1 pb-4 border-b border-zinc-100 mt-2">
          <h1 className="text-xl font-light text-zinc-900 tracking-tight">
            {tab === "overview" && "System Dashboard"}
            {tab === "clients" && "Client Registry"}
            {tab === "assets" && "Assets Archive"}
            {tab === "register" && "New Registration"}
          </h1>
          <p className="text-zinc-400 text-[10px] font-normal italic">
            Redlix Portal // Service Control Interface
          </p>
        </header>

        {tab === "overview" && (
           <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-zinc-900">
                <div className="p-5 bg-zinc-50 border border-zinc-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-normal text-zinc-300">Active Clients</span>
                  <p className="text-3xl font-normal text-zinc-900">{users.length}</p>
                </div>
                <div className="p-5 bg-zinc-50 border border-zinc-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-normal text-zinc-300">Daily Registrations</span>
                  <p className="text-3xl font-normal text-zinc-900">
                    {users.filter(u => new Date(u.createdAt).toDateString() === new Date().toDateString()).length} Today
                  </p>
                </div>
                <div className="p-5 bg-zinc-50 border border-zinc-100 rounded-xl space-y-1 flex flex-col justify-center">
                  <span className="text-[11px] font-normal text-zinc-300">Global Archive</span>
                  <p className="text-3xl font-normal text-zinc-900">{allAssets.length} file(s)</p>
                </div>
                <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1 text-white">
                   <span className="text-[11px] font-normal text-zinc-500">System Status</span>
                   <p className="text-xs font-normal text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded inline-block">Live</p>
                </div>
              </div>

              <div className="p-8 border border-zinc-100 bg-zinc-50/20 rounded-2xl space-y-6">
                <h3 className="text-sm font-normal flex items-center gap-2 text-zinc-400"> <History className="w-5 h-5 text-zinc-300" /> Recent Activity</h3>
                <div className="space-y-4">
                    {users.length === 0 ? (
                      <p className="text-zinc-400 text-xs italic">No registrations logged.</p>
                    ) : (
                      users.slice(0, 3).map((u, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0 text-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 rounded-xl flex items-center justify-center font-normal text-zinc-400">{u.company?.[0] || '?'}</div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-normal text-zinc-900 uppercase tracking-tight leading-none">{u.company || 'N/A'}</p>
                                <p className="text-[10px] text-zinc-400 font-normal uppercase tracking-widest">{u.uniqueId}</p>
                            </div>
                          </div>
                      </div>
                    ))
                    )}
                </div>
              </div>
           </div>
        )}

        {tab === "clients" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300 text-zinc-900 pb-20">
             {users.length === 0 ? (
                <div className="col-span-full py-20 bg-white border border-zinc-100 rounded-2xl text-center">
                   <AlertCircle className="w-10 h-10 text-zinc-100 mx-auto mb-3" />
                   <p className="text-zinc-400 text-sm font-medium italic">Directory Empty</p>
                </div>
             ) : (
                users.map((user) => (
                    <div key={user.id} className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-6 hover:border-zinc-400 transition-all shadow-sm">
                        <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                           <div className="space-y-1">
                              <h3 className="text-base font-normal text-zinc-900 uppercase tracking-tight">{user.company || "N/A"}</h3>
                              <p className="text-[10px] font-normal text-zinc-300 uppercase tracking-widest font-mono">{user.uniqueId}</p>
                           </div>
                           <Link 
                            href={`/admin/dashboard?tab=assets&query=${user.uniqueId}`}
                            className="text-[10px] font-normal text-zinc-400 hover:text-zinc-900 uppercase tracking-widest flex items-center gap-2 transition-colors border border-zinc-100 px-3 py-1.5 rounded-lg bg-zinc-50 shadow-sm"
                           >
                            Assets <ExternalLink className="w-3.5 h-3.5" />
                           </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-y-5 gap-x-8 text-xs font-medium">
                            <div className="space-y-1">
                                <p className="text-[10px] font-normal text-zinc-200 uppercase tracking-widest italic">Contact Point</p>
                                <p className="text-zinc-900">{user.name || "-"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-normal text-zinc-200 uppercase tracking-widest italic">Mobile</p>
                                <p className="text-zinc-900">{user.mobile || "-"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-normal text-zinc-200 uppercase tracking-widest italic">Primary Email</p>
                                <p className="text-zinc-900 truncate">{user.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-normal text-emerald-200 uppercase tracking-widest italic">Archive</p>
                                <p className="text-emerald-700 font-normal">{(user.assets || []).length} items</p>
                            </div>
                        </div>

                        <div className="h-px bg-zinc-50" />

                        <div className="space-y-3">
                            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">Authorized Members ({(user.members as any[])?.length || 0})</p>
                            <div className="grid grid-cols-1 gap-1.5">
                                {(user.members as any[])?.length > 0 ? (
                                    (user.members as any[]).map((m: any, i: number) => (
                                       <div key={i} className="flex gap-3 text-[11px] text-zinc-500 font-medium">
                                          <span className="text-zinc-200 select-none">•</span>
                                          <span>{m.name} <span className="text-zinc-300 font-normal">// {m.email}</span></span>
                                       </div>
                                    ))
                                ) : (
                                    <span className="text-zinc-300 italic text-xs">No extra members documented.</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
             )}
          </div>
        )}

        {tab === "assets" && (
           <div className="animate-in fade-in duration-500 space-y-8 pb-20 text-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-50 pb-5 px-2">
                 <form className="relative w-full max-w-sm">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" />
                    <input 
                       name="query"
                       defaultValue={query}
                       onChange={(e) => {
                          const url = new URL(window.location.href);
                          url.searchParams.set('query', e.target.value);
                          window.history.replaceState({}, '', url);
                       }}
                       type="text" 
                       placeholder="Search branding or repository..." 
                       className="w-full h-11 pl-11 pr-4 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-semibold focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-300"
                    />
                 </form>
                 <div className="text-[11px] font-bold text-zinc-300 italic tracking-[0.2em]">{filteredAssets.length} Documents matched</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredAssets.length === 0 ? (
                    <div className="col-span-full py-40 text-center bg-zinc-50/50 border border-dashed border-zinc-100 rounded-3xl">
                       <Database className="w-12 h-12 text-zinc-100 mx-auto mb-3" />
                       <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest italic">{query ? "No repository match found." : "Repository is empty."}</p>
                       {query && <Link href="/admin/dashboard?tab=assets" className="text-[11px] font-bold text-zinc-950 underline mt-4 inline-block hover:bg-zinc-100 px-3 py-1 rounded transition-colors">Clear Repository Filter</Link>}
                    </div>
                 ) : (
                    filteredAssets.map((asset, i) => (
                       <div 
                         key={i} 
                         onClick={() => setViewingAsset(asset)}
                         className="bg-white border border-zinc-200 rounded-2xl overflow-hidden group hover:border-zinc-900 cursor-pointer transition-all shadow-sm flex flex-col hover:shadow-xl hover:shadow-zinc-100/40"
                       >
                          <div className="aspect-square bg-zinc-50 border-b border-zinc-100 relative overflow-hidden group-hover:bg-zinc-100 transition-colors flex items-center justify-center">
                             {asset.type === 'image' && asset.url && asset.url.startsWith('data:') ? (
                                <img 
                                  src={asset.url} 
                                  alt={asset.name} 
                                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                                />
                             ) : (
                                <div className="flex flex-col items-center gap-4 group-hover:grayscale-0 grayscale transition-all">
                                   <div className="w-20 h-20 bg-white border border-zinc-100 shadow-sm rounded-3xl flex items-center justify-center group-hover:rotate-3 transition-transform">
                                      {asset.type === 'pdf' ? (
                                        <FileIcon className="w-10 h-10 text-red-300" />
                                      ) : (
                                        <FileText className="w-10 h-10 text-zinc-300" />
                                      )}
                                   </div>
                                   <span className="text-[9px] font-bold uppercase text-zinc-300 tracking-[0.3em]">{asset.type} Repo</span>
                                </div>
                             )}
                             <div className="absolute top-3 right-3 px-3 py-1.5 bg-zinc-950 text-white rounded-lg font-bold text-[9px] opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg shadow-zinc-900/40 flex items-center gap-1.5">
                                <Maximize2 className="w-3 h-3" /> Preview
                             </div>
                          </div>
                          
                          <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                             <div className="space-y-1">
                                <p className="text-xs font-bold text-zinc-900 truncate leading-none">{asset.name}</p>
                                <div className="flex items-center gap-1.5 text-zinc-400">
                                   <Building2 className="w-3.5 h-3.5 text-zinc-300" />
                                   <span className="text-[10px] font-bold uppercase tracking-widest truncate">{asset.company}</span>
                                </div>
                             </div>
                             
                             <div className="flex items-center justify-between pt-3 border-t border-zinc-50 mt-1">
                                <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1.5"> <Clock className="w-3 h-3" /> {new Date(asset.createdAt).toLocaleDateString()} </span>
                                <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1.5"> <CheckCircle className="w-3.5 h-3.5" /> Checked </span>
                             </div>
                          </div>
                       </div>
                    ))
                 )}
              </div>
           </div>
        )}

        {tab === "register" && (
          <div className="pt-2">
             <RegisterClientForm />
          </div>
        )}
      </main>

      {viewingAsset && (
         <AssetViewer asset={viewingAsset} onClose={() => setViewingAsset(null)} />
      )}
    </div>
  );
}
