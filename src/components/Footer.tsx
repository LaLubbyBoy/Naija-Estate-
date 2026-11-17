import React from 'react';
import { Building2, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                NaijaEstate <span className="text-emerald-500">Pro</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Nigeria’s most trusted real estate marketplace. Discover verified homes, apartments, shortlets, land, and commercial spaces in Lagos, Abuja, Port Harcourt and beyond. Built for secure property transactions.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full font-medium">
                <ShieldCheck className="w-4 h-4" /> Verified Listings Only
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Property Categories</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Buy Duplexes & Houses</button></li>
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Rent Apartments</button></li>
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Furnished Shortlets</button></li>
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Commercial Offices</button></li>
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Land & Plots</button></li>
            </ul>
          </div>

          {/* Top Locations */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Top Locations</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Lekki Phase 1, Lagos</button></li>
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Victoria Island, Lagos</button></li>
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Ikoyi, Lagos</button></li>
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Maitama, Abuja</button></li>
              <li><button onClick={() => setActiveView('listings')} className="hover:text-emerald-400 transition">Asokoro, Abuja</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <span>Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+234 800 NAIJA ESTATE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@naijaestate.pro</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NaijaEstate Pro Ltd. All rights reserved. Powered by secure Firebase Cloud & Paystack verification.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#fraud" className="hover:text-slate-400 transition">Fraud Prevention & Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
