import React from "react";
import { ShieldCheckIcon, ZapIcon, DownloadIcon, LockIcon } from "./Icons";

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 mb-6 shadow-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        
        <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center flex-shrink-0">
            <ShieldCheckIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">100% Genuine Keys</h4>
            <p className="text-[11px] text-gray-500">Authorized OEM/Retail licenses</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3">
          <div className="w-10 h-10 rounded-full bg-yellow-50 text-[#ff9f00] flex items-center justify-center flex-shrink-0">
            <ZapIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Instant Delivery</h4>
            <p className="text-[11px] text-gray-500">Key on screen & email in 5 sec</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3">
          <div className="w-10 h-10 rounded-full bg-green-50 text-[#388e3c] flex items-center justify-center flex-shrink-0">
            <DownloadIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Official Downloads</h4>
            <p className="text-[11px] text-gray-500">Direct from manufacturer servers</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <LockIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Activation Guarantee</h4>
            <p className="text-[11px] text-gray-500">Full replacement or refund policy</p>
          </div>
        </div>

      </div>
    </div>
  );
};
