import React from "react";
import Link from "next/link";
import { ShieldCheckIcon } from "./Icons";
import { RapidDefendLogo } from "./RapidDefendLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#172337] text-white text-xs mt-12 border-t border-gray-800">
      
      {/* Top Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Col 1 */}
          <div>
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3 text-[11px]">
              ABOUT
            </h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:underline">About RapidDefend</Link></li>
              <li><Link href="/products" className="hover:underline">Antivirus Catalog</Link></li>
              <li><Link href="/account/orders" className="hover:underline">Digital Key Vault</Link></li>
              <li><span className="text-gray-400">Authorized OEM Reseller</span></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3 text-[11px]">
              POPULAR BRANDS
            </h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/products?brand=Quick+Heal" className="hover:underline">Quick Heal</Link></li>
              <li><Link href="/products?brand=Kaspersky" className="hover:underline">Kaspersky</Link></li>
              <li><Link href="/products?brand=Norton" className="hover:underline">Norton 360</Link></li>
              <li><Link href="/products?brand=McAfee" className="hover:underline">McAfee Total Protection</Link></li>
              <li><Link href="/products?brand=Bitdefender" className="hover:underline">Bitdefender</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3 text-[11px]">
              HELP & SUPPORT
            </h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/account/orders" className="hover:underline">Track Digital Key</Link></li>
              <li><Link href="/products" className="hover:underline">Activation Instructions</Link></li>
              <li><span className="hover:underline cursor-pointer">Official Installer Downloads</span></li>
              <li><span className="hover:underline cursor-pointer">Refund & Replacement Guarantee</span></li>
              <li><span className="hover:underline cursor-pointer">FAQ & Help Center</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3 text-[11px]">
              CONSUMER POLICY
            </h5>
            <ul className="space-y-2 text-gray-300">
              <li><span className="hover:underline cursor-pointer">Cancellation & Returns</span></li>
              <li><span className="hover:underline cursor-pointer">Terms of Use</span></li>
              <li><span className="hover:underline cursor-pointer">Security & Privacy</span></li>
              <li><span className="hover:underline cursor-pointer">EULA Compliance</span></li>
            </ul>
          </div>

          {/* Col 5 - Mail Us */}
          <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-gray-700 md:pl-6 pt-4 md:pt-0">
            <h5 className="text-gray-400 font-bold uppercase tracking-wider mb-3 text-[11px]">
              OFFICIAL SUPPORT:
            </h5>
            <p className="text-gray-300 leading-relaxed text-[11px]">
              RapidDefend Digital Technologies Pvt Ltd,<br />
              Cyber Defense Park, Tech Zone,<br />
              Email: support@rapiddefend.com<br />
              Helpline: 1800-200-SAFE (24x7)
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/80 bg-[#121c2c] py-5 px-4 text-center text-gray-400 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RapidDefendLogo variant="light" size="sm" showPlus={false} />
            <span className="text-gray-400 text-[11px]">© 2026 RapidDefend.com — All Antivirus Brand Logos & Trademarks are property of their respective owners.</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="bg-white/10 px-2 py-1 rounded-xs text-gray-200">UPI Accepted</span>
            <span className="bg-white/10 px-2 py-1 rounded-xs text-gray-200">Instant Key Dispatch</span>
            <span className="bg-white/10 px-2 py-1 rounded-xs text-gray-200">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
