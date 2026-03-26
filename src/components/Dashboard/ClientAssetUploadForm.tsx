"use client";

import { useState } from "react";
import { uploadAsset } from "@/app/actions/user";
import { Loader2, Upload, File as FileIcon, ImageIcon, FileText, CheckCircle2 } from "lucide-react";

export default function ClientAssetUploadForm({ uniqueId }: { uniqueId: string }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const MAX_SIZE_BYTES = 3 * 1024 * 1024; // 3MB

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE_BYTES) {
         setMessage({ type: "error", text: "File is too large! Maximum limit is 3MB." });
         setSelectedFile(null);
         event.target.value = ""; // Reset
         return;
      }
      setSelectedFile(file);
      setMessage(null);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) {
       setMessage({ type: "error", text: "Please select a file first." });
       return;
    }

    setLoading(true);
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const result = await uploadAsset(formData, uniqueId);

    if (result.success) {
      setMessage({ type: "success", text: "Asset uploaded successfully." });
      setSelectedFile(null);
      form.reset();
    } else {
      setMessage({ type: "error", text: result.error || "Upload failed." });
    }
    setLoading(false);
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-8">
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-zinc-900 tracking-tight">Enterprise Asset Submission</h3>
        <p className="text-zinc-400 text-[11px] font-medium tracking-tight">Submit brand collateral (logo, docs, pdf) - max 3MB.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Picker - NO UPPERCASE */}
        <div className="space-y-4">
            <label className="block text-xs font-bold text-zinc-300 tracking-widest px-1 border-b border-zinc-50 pb-2 mb-2 italic">Select Category</label>
            <div className="grid grid-cols-3 gap-2">
                <label className="flex flex-col items-center justify-center p-4 border border-zinc-100 rounded-xl bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer transition-all group flex-1 min-h-[100px] text-center">
                   <input type="radio" name="type" value="image" className="sr-only" defaultChecked />
                   <ImageIcon className="w-6 h-6 text-zinc-300 group-hover:text-zinc-900 transition-colors mb-2" />
                   <span className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-900 leading-tight">Image</span>
                </label>
                <label className="flex flex-col items-center justify-center p-4 border border-zinc-100 rounded-xl bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer transition-all group flex-1 min-h-[100px] text-center">
                   <input type="radio" name="type" value="pdf" className="sr-only" />
                   <FileIcon className="w-6 h-6 text-zinc-300 group-hover:text-zinc-900 transition-colors mb-2" />
                   <span className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-900 leading-tight">PDF Repo</span>
                </label>
                <label className="flex flex-col items-center justify-center p-4 border border-zinc-100 rounded-xl bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer transition-all group flex-1 min-h-[100px] text-center">
                   <input type="radio" name="type" value="doc" className="sr-only" />
                   <FileText className="w-6 h-6 text-zinc-300 group-hover:text-zinc-900 transition-colors mb-2" />
                   <span className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-900 leading-tight">Doc File</span>
                </label>
            </div>
        </div>

        {/* Drop Zone - NO UPPERCASE */}
        <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-300 tracking-widest px-1 italic">File Selection</label>
            <div className={`relative border-2 border-dashed rounded-2xl p-12 hover:border-zinc-400 transition-all text-center group flex flex-col items-center justify-center min-h-[180px] shadow-sm ${selectedFile ? 'border-emerald-200 bg-emerald-50/30' : 'border-zinc-100 bg-white'}`}>
               <input
                 name="file"
                 type="file"
                 onChange={handleFileChange}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                 required
               />
               
               {selectedFile ? (
                 <div className="space-y-4 flex flex-col items-center animate-in zoom-in-95 duration-400">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center border border-emerald-200 shadow-sm shadow-emerald-100">
                       <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-900 max-w-[200px] truncate leading-none">{selectedFile.name}</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} mb • ready</p>
                    </div>
                 </div>
               ) : (
                 <div className="space-y-4 flex flex-col items-center">
                    <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100 group-hover:bg-zinc-100 transition-colors shadow-sm">
                       <Upload className="w-6 h-6 text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <div>
                       <p className="text-[11px] font-bold text-zinc-400 group-hover:text-zinc-900 uppercase tracking-widest italic">Tap to drop asset</p>
                    </div>
                 </div>
               )}
            </div>
        </div>

        <button
          type="submit"
          disabled={loading || !selectedFile}
          className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-50 disabled:text-zinc-300 text-white text-[11px] font-bold rounded-2xl transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-zinc-200/50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Dispatch to Registry"}
        </button>
      </form>

      {message && (
        <div className={`p-4 rounded-xl text-[10px] text-center font-bold border uppercase tracking-[0.2em] shadow-sm animate-in fade-in slide-in-from-top-1 duration-300 ${
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
