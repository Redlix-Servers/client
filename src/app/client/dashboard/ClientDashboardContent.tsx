"use client";

import { useState } from "react";
import Image from "next/image";
import ClientSettingsForm from "@/components/Dashboard/ClientSettingsForm";
import ClientAssetUploadForm from "@/components/Dashboard/ClientAssetUploadForm";
import AssetViewer from "@/components/Dashboard/AssetViewer";
import { 
  LogOut, 
  LayoutDashboard,
  Settings as SettingsIcon,
  ShieldCheck,
  Building2,
  Mail,
  MapPin,
  Smartphone,
  Briefcase,
  Calendar,
  CloudUpload,
  File as FileIcon,
  ImageIcon,
  FileText,
  Eye,
  Search,
  ExternalLink,
  Maximize2
} from "lucide-react";

interface PageProps {
  client: any;
  tab: string;
}

export default function ClientDashboardContent({ client, tab }: PageProps) {
  const [viewingAsset, setViewingAsset] = useState<any | null>(null);

  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  if (hour >= 17) greeting = "Good evening";

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "assets", label: "Assets Hub", icon: CloudUpload },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const members = (client.members as any[]) || [];

  return (
    <div className="min-h-screen bg-white font-sans flex text-zinc-900 selection:bg-zinc-100 selection:text-zinc-900 overflow-x-hidden">
      {/* Side Profile - BLACK SIDEBAR */}
      <aside className="w-64 bg-zinc-950 text-white h-screen fixed left-0 top-0 flex flex-col z-50 p-6 space-y-6">
        <div className="space-y-6">
          <div className="flex justify-start px-2">
             <Image
                src="https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772213109/Screenshot_2026-02-27_at_22.49.23-removebg-preview_nn1jee.png"
                alt="Redlix Systems"
                width={120}
                height={30}
                className="h-8 w-auto brightness-0 invert"
                priority
             />
          </div>
          <div className="px-2">
            <p className="text-zinc-600 text-[11px] font-medium">{greeting},</p>
            <h2 className="text-base font-semibold text-white tracking-tight leading-tight">{client.company || "Client"}</h2>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
           {navItems.map((item) => (
             <a
               key={item.id}
               href={`?tab=${item.id}`}
               className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                 tab === item.id 
                   ? "bg-zinc-900 text-white border border-zinc-900 shadow-sm" 
                   : "text-zinc-500 hover:text-zinc-200"
               }`}
             >
               <item.icon className="w-4 h-4" />
               <span className="capitalize">{item.label}</span>
             </a>
           ))}
        </nav>

        <footer className="pt-6 border-t border-zinc-900 px-4">
           <form action="/api/auth/logout" method="POST">
             <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-red-950/20 hover:bg-red-600 text-red-600 hover:text-white text-xs font-semibold transition-all rounded-xl border border-red-900/30">
               <LogOut className="w-3.5 h-3.5" /> Log out
             </button>
           </form>
        </footer>
      </aside>

      <main className="flex-1 ml-64 p-8 space-y-8">
        <header className="flex flex-col gap-1 pb-4 border-b border-zinc-100 mt-2">
           <h1 className="text-base font-light text-zinc-900 tracking-tight leading-none">
             {tab === "overview" && "System Overview"}
             {tab === "assets" && "Assets Hub - File Registry"}
             {tab === "settings" && "Account Settings"}
           </h1>
           <p className="text-zinc-400 text-[9px] font-normal italic">
             ID: <span className="text-zinc-950 font-mono tracking-tighter bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100">{client.uniqueId}</span>
           </p>
        </header>

        {tab === "overview" && (
          <div className="animate-in fade-in duration-300">
             <div className="bg-white border border-zinc-200 rounded-2xl p-8 space-y-8 shadow-sm max-w-5xl">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-normal text-zinc-300">Organization</p>
                      <p className="text-sm font-normal text-zinc-900 tracking-tight">{client.company || "-"}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-normal text-zinc-300">Lead Contact</p>
                      <p className="text-sm font-normal text-zinc-900 tracking-tight">{client.name || "-"}</p>
                   </div>
                   <div className="space-y-1 text-zinc-900 overflow-hidden">
                      <p className="text-[10px] font-normal text-zinc-300">Email Contact</p>
                      <p className="text-sm font-normal text-zinc-900 truncate tracking-tight">{client.email || "-"}</p>
                   </div>
                   <div className="space-y-1 md:col-span-2">
                      <p className="text-[10px] font-normal text-zinc-300">HQ Address</p>
                      <p className="text-sm font-normal text-zinc-900 tracking-tight">{client.address || "-"}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-normal text-zinc-300">Phone</p>
                      <p className="text-sm font-normal text-zinc-900 tracking-tight">{client.mobile || "-"}</p>
                   </div>
                </section>

                <div className="h-px bg-zinc-50" />

                <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
                   <div className="space-y-1.5 md:col-span-2">
                      <p className="text-[11px] font-semibold text-zinc-300">Registered Engine</p>
                      <p className="text-base font-bold text-zinc-900 italic tracking-tighter">{client.productName || "Standard"}</p>
                   </div>
                   <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold text-zinc-300">Contract Period</p>
                      <p className="text-xs font-semibold text-zinc-900">{client.startDate || "-"} to {client.endDate || "-"}</p>
                   </div>
                   <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold text-zinc-300 underline underline-offset-4 decoration-emerald-100">Drop Deadline</p>
                      <p className="text-xs font-bold text-emerald-600 tracking-tight">{client.deliveryDate || "-"}</p>
                   </div>
                </section>

                <div className="h-px bg-zinc-50" />

                <section className="space-y-6">
                   <div className="flex items-center justify-between">
                     <p className="text-[11px] font-semibold text-zinc-300">Portal Access ({(client.members as any[])?.length || 0})</p>
                     <div className="h-px flex-1 mx-4 bg-zinc-50" />
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {members.length === 0 ? (
                        <p className="text-[11px] text-zinc-200 italic">No members listed.</p>
                      ) : (
                        members.map((m: any, i: number) => (
                           <div key={i} className="flex flex-col p-4 bg-zinc-50/50 border border-zinc-100 rounded-xl group hover:bg-white hover:border-zinc-300 transition-all shadow-sm">
                              <span className="text-xs font-bold text-zinc-900">{m.name}</span>
                              <span className="text-[11px] text-zinc-400 font-medium truncate">{m.email}</span>
                           </div>
                        ))
                      )}
                   </div>
                </section>

                <div className="pt-6 border-t border-zinc-50 flex items-center justify-between text-xs font-bold text-zinc-200 tracking-widest italic">
                   <div className="flex items-center gap-2 text-zinc-300">
                     <ShieldCheck className="w-4 h-4 text-emerald-400" />
                     ID: {client.uniqueId}
                   </div>
                   <span className="text-secondary opacity-50 font-normal">REDLIX PORTAL - SECURE SESSION</span>
                </div>
             </div>
          </div>
        )}

        {tab === "assets" && (
           <div className="animate-in fade-in slide-in-from-bottom-2 duration-400 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-8">
                 <h3 className="text-xs font-bold text-zinc-300 px-2 underline underline-offset-4 decoration-zinc-100">New Submission</h3>
                 <ClientAssetUploadForm uniqueId={client.uniqueId} />
              </div>

              <div className="lg:col-span-8 space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-bold text-zinc-300 underline underline-offset-4 decoration-zinc-100">Asset Registry</h3>
                    <p className="text-xs font-semibold text-zinc-300">{client.assets.length} file(s)</p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 pb-20">
                    {client.assets.length === 0 ? (
                      <div className="col-span-full py-40 border-2 border-dashed border-zinc-50 bg-zinc-50/20 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-zinc-100 shadow-sm text-zinc-200">
                            <CloudUpload className="w-6 h-6" />
                         </div>
                         <p className="text-xs font-bold text-zinc-300 italic tracking-widest uppercase">Registry Empty</p>
                      </div>
                    ) : (
                       client.assets.map((asset: any) => (
                          <div 
                            key={asset.id} 
                            onClick={() => setViewingAsset(asset)}
                            className="bg-white border border-zinc-200 rounded-2xl overflow-hidden group hover:border-zinc-900 cursor-pointer transition-all flex flex-col shadow-sm hover:shadow-xl hover:shadow-zinc-100/30"
                          >
                             {/* VISUAL PREVIEW BOX */}
                             <div className="aspect-square bg-zinc-50 w-full flex items-center justify-center border-b border-zinc-100 relative overflow-hidden group-hover:bg-zinc-100 transition-colors">
                                {asset.type === 'image' && asset.url && asset.url.startsWith('data:') ? (
                                   <div className="w-full h-full relative p-6">
                                      <img 
                                         src={asset.url} 
                                         alt={asset.name} 
                                         className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                      />
                                   </div>
                                ) : (
                                   <div className="w-full h-full flex flex-col items-center justify-center space-y-4 group-hover:grayscale-0 grayscale transition-all">
                                      <div className="w-16 h-16 bg-white border border-zinc-100 shadow-sm rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                                          {asset.type === 'pdf' ? (
                                            <FileIcon className="w-7 h-7 text-red-400" />
                                          ) : (
                                            <FileText className="w-7 h-7 text-zinc-400" />
                                          )}
                                      </div>
                                      <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">{asset.type} Repo</span>
                                   </div>
                                )}
                                
                                <div className="absolute top-3 right-3 px-3 py-1.5 bg-zinc-950 text-white rounded-lg font-bold text-[9px] opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg shadow-zinc-900/40 flex items-center gap-1.5">
                                   <Maximize2 className="w-3 h-3" /> View original
                                </div>
                             </div>
                             
                             {/* META DATA */}
                             <div className="p-4 bg-white flex flex-col space-y-2">
                                <p className="text-xs font-bold text-zinc-900 tracking-tight truncate leading-none">{asset.name}</p>
                                <div className="flex items-center justify-between pt-1.5 border-t border-zinc-50 mt-1">
                                  <span className="text-[10px] text-zinc-400 font-medium">{new Date(asset.createdAt).toLocaleDateString()}</span>
                                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 transition-colors">
                                     <Eye className="w-3.5 h-3.5" /> Checked
                                  </div>
                                </div>
                             </div>
                          </div>
                       ))
                    )}
                 </div>
              </div>
           </div>
        )}

        {tab === "settings" && (
          <div className="animate-in fade-in duration-300 pt-4 max-w-2xl">
             <ClientSettingsForm client={client} />
          </div>
        )}
      </main>

      {viewingAsset && (
         <AssetViewer asset={viewingAsset} onClose={() => setViewingAsset(null)} />
      )}
    </div>
  );
}
