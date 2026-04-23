import React from 'react';

const EvidenceAttachments = ({ attachments = [] }) => {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Evidence Attachments</h3>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {attachments.length} {attachments.length === 1 ? 'FILE' : 'FILES'}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {attachments.map((file) => (
          <div key={file.id} className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200">
            <img 
              src={file.url} 
              alt={file.name} 
              className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
              <button className="rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        <button className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition hover:border-blue-400 hover:bg-blue-50">
          <div className="rounded-lg bg-white p-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">Add Photo</span>
        </button>
      </div>
    </div>
  );
};

export default EvidenceAttachments;
