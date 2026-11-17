import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { 
  Search, Building, Home, Key, MapPin, ShieldCheck, 
  Award, ArrowRight, CheckCircle2, Star, Users, Calendar 
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { properties, setSearchFilters, setActiveView } = useApp();
  const [activeTab, setActiveTab] = useState<'sale' | 'rent' | 'shortlet' | 'commercial_lease' | 'land'>('sale');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchKey, setSearchKey] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters((prev: any) => ({
      ...prev,
      purpose: activeTab,
      state: selectedState,
      propertyType: selectedType,
      searchQuery: searchKey
    }));
    setActiveView('listings');
  };

  const featuredProperties = properties.filter(p => p.featured && p.status === 'active');
  const recentProperties = properties.filter(p => p.status === 'active').slice(0, 4);

  const locations = [
    { name: 'Lekki Phase 1', state: 'Lagos', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600', count: '142 properties' },
    { name: 'Victoria Island', state: 'Lagos', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', count: '98 properties' },
    { name: 'Ikoyi', state: 'Lagos', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600', count: '76 properties' },
    { name: 'Maitama', state: 'Abuja', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', count: '115 properties' },
    { name: 'Asokoro', state: 'Abuja', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=600', count: '64 properties' },
    { name: 'Ikeja GRA', state: 'Lagos', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600', count: '89 properties' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner with Search */}
      <section className="relative bg-slate-900 text-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" /> Nigeria's Verified Real Estate Ecosystem
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
            Find Your Dream Home, Investment or Commercial Space in <span className="text-emerald-400">Nigeria</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
            Explore thousands of verified properties in Lagos, Abuja, Port Harcourt and across Nigeria with secure inspection booking.
          </p>

          {/* Search Box Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-5 shadow-2xl text-slate-800 text-left">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-100 pb-3">
              {[
                { id: 'sale', label: 'Buy Property' },
                { id: 'rent', label: 'Rent Property' },
                { id: 'shortlet', label: 'Shortlet' },
                { id: 'commercial_lease', label: 'Commercial' },
                { id: 'land', label: 'Land & Plots' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Form Inputs */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">State / Region</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All States (Lagos, Abuja...)</option>
                  <option value="Lagos">Lagos State</option>
                  <option value="Abuja">Abuja (FCT)</option>
                  <option value="Rivers">Rivers State (Port Harcourt)</option>
                  <option value="Oyo">Oyo State (Ibadan)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Property Types</option>
                  <option value="Detached">Detached House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Terraced Houses">Terraced Duplex</option>
                  <option value="Office Spaces">Office Space</option>
                  <option value="Residential Plots">Land Plot</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Keyword / Area</label>
                <input 
                  type="text"
                  placeholder="e.g. Lekki, Maitama, Pool..."
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition hover:shadow-xl"
                >
                  <Search className="w-5 h-5" /> Search Properties
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Buy House', subtitle: 'Duplexes & Penthouses', icon: Home, purpose: 'sale', color: 'bg-emerald-600' },
            { title: 'Rent Home', subtitle: 'Apartments & Terraces', icon: Key, purpose: 'rent', color: 'bg-blue-600' },
            { title: 'Shortlets', subtitle: 'Serviced & Furnished', icon: Building, purpose: 'shortlet', color: 'bg-indigo-600' },
            { title: 'Land & Plots', subtitle: 'Dry Estate Lands', icon: MapPin, purpose: 'sale', category: 'Land', color: 'bg-amber-600' }
          ].map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setSearchFilters((prev: any) => ({ ...prev, purpose: cat.purpose, category: cat.category || 'all' }));
                setActiveView('listings');
              }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all cursor-pointer group flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-base">{cat.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{cat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Handpicked Luxury</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Featured Property Listings</h2>
          </div>
          <button 
            onClick={() => setActiveView('listings')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            Browse All Listings <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Popular Locations */}
      <section className="bg-slate-100 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Explore Neighbourhoods</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Popular Neighborhoods in Nigeria</h2>
            <p className="text-sm text-slate-600 mt-2">Discover high-demand residential and commercial districts with prime value appreciation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setSearchFilters((prev: any) => ({ ...prev, searchQuery: loc.name }));
                  setActiveView('listings');
                }}
                className="relative h-64 rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded-full font-semibold">{loc.state}</span>
                  <h3 className="text-xl font-bold mt-2">{loc.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{loc.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Fresh On Market</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Recently Added Properties</h2>
          </div>
          <button 
            onClick={() => setActiveView('listings')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            View More <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Why Choose NaijaEstate Pro */}
      <section className="bg-emerald-900 text-white py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Trust & Reliability</span>
            <h2 className="text-3xl font-black mt-1">Why Nigerians Choose NaijaEstate Pro</h2>
            <p className="text-sm text-emerald-100/80 mt-2">We eliminate property fraud through rigorous agent verification and secure inspection booking.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-800/50 backdrop-blur-md p-8 rounded-3xl border border-emerald-700/50">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Verified Agents & Properties</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Every property listing undergoes physical and legal document verification by our compliance team before going live.
              </p>
            </div>

            <div className="bg-emerald-800/50 backdrop-blur-md p-8 rounded-3xl border border-emerald-700/50">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Inspection Booking</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Schedule property viewing appointments directly with accredited agents and receive instant confirmation and calendar alerts.
              </p>
            </div>

            <div className="bg-emerald-800/50 backdrop-blur-md p-8 rounded-3xl border border-emerald-700/50">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparent Naira Pricing</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Clear pricing in Nigerian Naira (₦) with no hidden agency fees. Connect directly via WhatsApp, call or secure in-app messaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">What Our Clients Say</h2>
          <p className="text-sm text-slate-600 mt-2">Hear from homebuyers, tenants and investors who found their dream properties through NaijaEstate Pro.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'Finding a secure luxury duplex in Lekki Phase 1 used to be stressful until I used NaijaEstate Pro. The agent verification gave me complete peace of mind.',
              name: 'Dr. & Mrs. Adeleke',
              role: 'Homeowners in Lekki',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
            },
            {
              quote: 'As an active real estate agent in Abuja, my leads and property enquiries tripled within 2 weeks of listing on this platform. Absolutely top tier!',
              name: 'Barr. Folashade Adebayo',
              role: 'Lead Consultant, Prime Edge Realty',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
            },
            {
              quote: 'The inspection booking system is seamless. I booked a viewing for a serviced apartment in Eko Atlantic and toured it the very next day.',
              name: 'Ibrahim Danjuma',
              role: 'Corporate Tenant',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">"{item.quote}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-10 md:p-16 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Never Miss a Prime Nigerian Real Estate Deal</h2>
            <p className="text-sm md:text-base text-emerald-100 mb-8">
              Subscribe to our weekly market report for new luxury listings, price drops, and high-yield real estate investment insights in Lagos and Abuja.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to NaijaEstate Pro weekly newsletter!'); }} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input 
                type="email"
                placeholder="Enter your email address..."
                required
                className="bg-white/10 border border-white/30 px-5 py-3.5 rounded-xl text-white placeholder:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:w-80"
              />
              <button 
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
