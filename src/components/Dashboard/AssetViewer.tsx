"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Download, FileIcon, FileText, ImageIcon } from "lucide-react";

export default function AssetViewer({ asset, onClose }: { asset: any, onClose: () => void }) {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
         <button 
           onClick={onClose}
           className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 transition-all shadow-2xl"
         >
           <X className="w-5 h-5" />
         </button>
      </div>

      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
         <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-zinc-900 rounded-lg shadow-sm">
                  {asset.type === 'image' && <ImageIcon className="w-4 h-4 text-white" />}
                  {asset.type === 'pdf' && <FileIcon className="w-4 h-4 text-white" />}
                  {asset.type === 'doc' && <FileText className="w-4 h-4 text-white" />}
               </div>
               <div>
                  <h3 className="text-sm font-semibold text-zinc-900">{asset.name}</h3>
                  <p className="text-[10px] text-zinc-400 font-medium capitalize">{asset.type} Format • {new Date(asset.createdAt).toLocaleDateString()}</p>
               </div>
            </div>
            
            <a 
              href={asset.url} 
              download={asset.name}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-[11px] font-semibold rounded-lg hover:bg-zinc-800 transition-all shadow-sm"
            >
              <Download className="w-3 h-3" /> Save File
            </a>
         </div>

         <div className="flex-1 overflow-auto bg-zinc-100/30 flex items-center justify-center p-6 min-h-[400px]">
            {asset.url && asset.url.startsWith('data:image') ? (
               <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={asset.url} 
                    alt={asset.name} 
                    className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white"
                  />
               </div>
            ) : asset.url && asset.url.startsWith('data:application/pdf') ? (
               <iframe 
                 src={asset.url} 
                 className="w-full h-[70vh] rounded-xl border border-zinc-200 shadow-sm"
                 title={asset.name}
               />
            ) : (
               <div className="flex flex-col items-center justify-center space-y-6 py-20 grayscale">
                  <div className="w-24 h-24 bg-zinc-900 rounded-[2rem] flex items-center justify-center shadow-xl rotate-3">
                     <FileText className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-base font-bold text-zinc-900">Document ready for download</p>
                    <p className="text-[11px] text-zinc-400 font-medium">Full visual preview is only available for images and PDF files.</p>
                  </div>
               </div>
            )}
         </div>

         <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-center text-[10px] font-medium text-zinc-300 tracking-[0.2em] italic">
            Redlix Portal Hub // Secure Viewport Session
         </div>
      </div>
    </div>
  );
}
