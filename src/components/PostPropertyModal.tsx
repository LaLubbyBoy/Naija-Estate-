import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, PlusCircle, ArrowLeft, Check, Sparkles } from 'lucide-react';

export const PostPropertyModal: React.FC = () => {
  const { addProperty, setActiveView } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Residential' as any,
    type: 'Detached',
    purpose: 'sale' as any,
    price: 150000000,
    period: 'per year' as any,
    sizeSqm: 450,
    bedrooms: 4,
    bathrooms: 5,
    toilets: 5,
    furnishing: 'Semi-Furnished' as any,
    condition: 'Brand New' as any,
    state: 'Lagos',
    city: 'Lagos Island',
    neighbourhood: 'Lekki Phase 1',
    address: 'Admiralty Way, Lekki Phase 1, Lagos',
    lat: 6.4474,
    lng: 3.4723,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200'
    ],
    features: {
      pool: true,
      parking: true,
      security: true,
      electricity: true,
      water: true,
      internet: true,
      garden: false,
      balcony: true,
      ac: true,
      gym: false,
      elevator: false,
      cctv: true
    },
    featured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill in all required property details.');
      return;
    }
    addProperty(formData);
    alert('Property successfully submitted for review and listing!');
    setActiveView('listings');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => setActiveView('listings')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 mb-6 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel & Return
        </button>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">List a New Property</h1>
              <p className="text-xs text-slate-500">Publish your property for sale, rent, or shortlet across Nigeria.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">1. Property Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Property Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Luxury 5 Bedroom Fully Detached Duplex with Swimming Pool"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detailed Description *</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe architectural features, security, power supply, finishing..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Listing Purpose</label>
                  <select 
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="shortlet">Shortlet</option>
                    <option value="commercial_lease">Commercial Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land & Plots</option>
                    <option value="Shortlet">Shortlet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price (Naira - ₦) *</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Property Size (sqm)</label>
                  <input 
                    type="number" 
                    value={formData.sizeSqm}
                    onChange={(e) => setFormData({ ...formData, sizeSqm: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bedrooms</label>
                  <input 
                    type="number" 
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bathrooms</label>
                  <input 
                    type="number" 
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">2. Location Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State</label>
                  <select 
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Lagos">Lagos State</option>
                    <option value="Abuja">Abuja (FCT)</option>
                    <option value="Rivers">Rivers State</option>
                    <option value="Oyo">Oyo State</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Neighbourhood / Area</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Lekki Phase 1, Maitama"
                    value={formData.neighbourhood}
                    onChange={(e) => setFormData({ ...formData, neighbourhood: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Street Address</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Admiralty Way, Lekki Phase 1"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" /> Submit Listing for Publication
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
