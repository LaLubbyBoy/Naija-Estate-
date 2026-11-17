import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { Search, Filter, SlidersHorizontal, Grid, List, CheckCircle2, RotateCcw } from 'lucide-react';

export const ListingsView: React.FC = () => {
  const { properties, searchFilters, setSearchFilters } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter properties based on searchFilters
  const filteredProperties = properties.filter(property => {
    if (property.status !== 'active') return false;

    if (searchFilters.purpose !== 'all' && property.purpose !== searchFilters.purpose) {
      return false;
    }
    if (searchFilters.category !== 'all' && property.category !== searchFilters.category) {
      return false;
    }
    if (searchFilters.state !== 'all' && property.state !== searchFilters.state) {
      return false;
    }
    if (searchFilters.propertyType !== 'all' && property.type !== searchFilters.propertyType) {
      return false;
    }
    if (searchFilters.minPrice && property.price < Number(searchFilters.minPrice)) {
      return false;
    }
    if (searchFilters.maxPrice && property.price > Number(searchFilters.maxPrice)) {
      return false;
    }
    if (searchFilters.verifiedOnly && !property.verified) {
      return false;
    }
    if (searchFilters.searchQuery.trim() !== '') {
      const q = searchFilters.searchQuery.toLowerCase();
      const matchTitle = property.title.toLowerCase().includes(q);
      const matchNeighbourhood = property.neighbourhood.toLowerCase().includes(q);
      const matchCity = property.city.toLowerCase().includes(q);
      const matchState = property.state.toLowerCase().includes(q);
      if (!matchTitle && !matchNeighbourhood && !matchCity && !matchState) {
        return false;
      }
    }
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'popular') return b.views - a.views;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // newest
  });

  const resetFilters = () => {
    setSearchFilters({
      purpose: 'all',
      category: 'all',
      state: 'all',
      city: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 2000000000,
      bedrooms: 'all',
      propertyType: 'all',
      verifiedOnly: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Result Count */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Explore Property Listings</h1>
            <p className="text-sm text-slate-600 mt-1">
              Showing <span className="font-bold text-emerald-600">{sortedProperties.length}</span> verified properties matching your criteria
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
              >
                <option value="newest">Newest Listings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Grid / List Layout toggle */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden bg-emerald-600 text-white p-2.5 rounded-xl flex items-center gap-1.5 text-xs font-bold"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit space-y-6`}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" /> Advanced Filters
              </h3>
              <button 
                onClick={resetFilters}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Search Keyword</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Lekki, Maitama, Duplex..."
                  value={searchFilters.searchQuery}
                  onChange={(e) => setSearchFilters((prev: any) => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Listing Purpose</label>
              <select
                value={searchFilters.purpose}
                onChange={(e) => setSearchFilters((prev: any) => ({ ...prev, purpose: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Purposes</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="shortlet">Shortlet</option>
                <option value="commercial_lease">Commercial Lease</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Property Category</label>
              <select
                value={searchFilters.category}
                onChange={(e) => setSearchFilters((prev: any) => ({ ...prev, category: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Categories</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land & Plots</option>
                <option value="Shortlet">Shortlet Apartments</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">State</label>
              <select
                value={searchFilters.state}
                onChange={(e) => setSearchFilters((prev: any) => ({ ...prev, state: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All States</option>
                <option value="Lagos">Lagos State</option>
                <option value="Abuja">Abuja (FCT)</option>
                <option value="Rivers">Rivers State</option>
                <option value="Oyo">Oyo State</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Property Type</label>
              <select
                value={searchFilters.propertyType}
                onChange={(e) => setSearchFilters((prev: any) => ({ ...prev, propertyType: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Types</option>
                <option value="Detached">Detached House</option>
                <option value="Apartment">Apartment</option>
                <option value="Terraced Houses">Terraced Duplex</option>
                <option value="Semi-detached houses">Semi-Detached</option>
                <option value="Office Spaces">Office Space</option>
                <option value="Residential Plots">Land Plot</option>
                <option value="Furnished Apartments">Furnished Shortlet</option>
              </select>
            </div>

            {/* Max Price Slider / Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Max Price: ₦ {(searchFilters.maxPrice / 1000000).toFixed(0)}M
              </label>
              <input 
                type="range"
                min="5000000"
                max="2000000000"
                step="10000000"
                value={searchFilters.maxPrice}
                onChange={(e) => setSearchFilters((prev: any) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₦ 5M</span>
                <span>₦ 2 Billion</span>
              </div>
            </div>

            {/* Verified Only Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={searchFilters.verifiedOnly}
                  onChange={(e) => setSearchFilters((prev: any) => ({ ...prev, verifiedOnly: e.target.checked }))}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-800">Verified Listings Only</span>
              </label>
            </div>
          </aside>

          {/* Property Results Grid / List */}
          <main className="lg:col-span-3">
            {sortedProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Properties Found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  We couldn't find any properties matching your current filters. Try resetting or adjusting your search criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProperties.map(property => (
                  <div key={property.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-6">
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full sm:w-64 h-48 object-cover rounded-xl"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                            {property.purpose}
                          </span>
                          <span className="text-lg font-black text-slate-900">
                            ₦ {property.price.toLocaleString('en-NG')}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base mb-2">{property.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2">{property.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                        <span>{property.neighbourhood}, {property.state}</span>
                        <button 
                          onClick={() => {
                            // view detail
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
