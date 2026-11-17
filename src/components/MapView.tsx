import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Building2, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export const MapView: React.FC = () => {
  const { properties, setSelectedPropertyId, setActiveView } = useApp();
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');
  const activeProperties = properties.filter(p => p.status === 'active' && (selectedStateFilter === 'all' || p.state === selectedStateFilter));
  const [selectedPinProperty, setSelectedPinProperty] = useState(activeProperties[0] || properties[0]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Interactive Map Explorer</h1>
            <p className="text-sm text-slate-600 mt-1">Explore verified properties across Nigeria geographically</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">Filter State:</span>
            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All States</option>
              <option value="Lagos">Lagos State</option>
              <option value="Abuja">Abuja (FCT)</option>
              <option value="Rivers">Rivers State</option>
            </select>
          </div>
        </div>

        {/* Map Simulator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Map canvas */}
          <div className="lg:col-span-2 h-[600px] rounded-3xl bg-slate-900 relative overflow-hidden shadow-xl border border-slate-800 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-950/35 opacity-90"></div>
            
            {/* Grid overlay styling */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-2"></div>

            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg text-xs font-bold text-slate-900 z-10 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 animate-bounce" /> Click any property marker to inspect
            </div>

            {/* Simulated interactive pins */}
            {activeProperties.map((prop, idx) => {
              const topPos = 20 + (idx * 15) % 60;
              const leftPos = 15 + (idx * 22) % 70;
              const isSelected = selectedPinProperty?.id === prop.id;

              return (
                <div 
                  key={prop.id}
                  onClick={() => setSelectedPinProperty(prop)}
                  style={{ top: `${topPos}%`, left: `${leftPos}%` }}
                  className={`absolute cursor-pointer transition-all transform hover:scale-125 z-20 ${isSelected ? 'scale-125' : ''}`}
                >
                  <div className={`px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 text-xs font-bold border backdrop-blur-md transition ${isSelected ? 'bg-emerald-600 text-white border-white scale-110 shadow-emerald-600/50' : 'bg-white text-slate-900 border-slate-200'}`}>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                    <span>₦ {(prop.price / 1000000).toFixed(0)}M</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Property Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            {selectedPinProperty ? (
              <div>
                <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img src={selectedPinProperty.images[0]} alt={selectedPinProperty.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {selectedPinProperty.purpose}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedPinProperty.neighbourhood}, {selectedPinProperty.state}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2">{selectedPinProperty.title}</h3>
                
                <div className="text-xl font-black text-emerald-600 mb-4">
                  ₦ {selectedPinProperty.price.toLocaleString('en-NG')}
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-6">
                  <div><strong>{selectedPinProperty.bedrooms}</strong> Beds</div>
                  <div><strong>{selectedPinProperty.bathrooms}</strong> Baths</div>
                  <div><strong>{selectedPinProperty.sizeSqm}</strong> sqm</div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedPropertyId(selectedPinProperty.id);
                    setActiveView('property-detail');
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition text-xs"
                >
                  View Full Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 text-sm">
                Select a property marker on the map to view summary
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
