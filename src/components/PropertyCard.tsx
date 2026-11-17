import React from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, Bed, Bath, Maximize2, ShieldCheck, Heart, Eye } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { wishlist, toggleWishlist, setSelectedPropertyId, setActiveView } = useApp();
  const isWishlisted = wishlist.includes(property.id);

  const formatNaira = (amount: number) => {
    return '₦ ' + amount.toLocaleString('en-NG');
  };

  const handleCardClick = () => {
    setSelectedPropertyId(property.id);
    setActiveView('property-detail');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden bg-slate-100 cursor-pointer" onClick={handleCardClick}>
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg uppercase tracking-wider">
            {property.purpose === 'sale' ? 'For Sale' : property.purpose === 'rent' ? 'For Rent' : 'Shortlet'}
          </span>
          {property.featured && (
            <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(property.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition shadow-md ${isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'}`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-emerald-600 text-white font-bold text-base px-3.5 py-1.5 rounded-xl shadow-md">
          {formatNaira(property.price)}
          {property.period && <span className="text-[10px] font-normal ml-1">/{property.period}</span>}
        </div>

        {/* Views count */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Eye className="w-3 h-3" /> {property.views} views
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="cursor-pointer" onClick={handleCardClick}>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{property.neighbourhood}, {property.state}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-600 transition-colors mb-2">
            {property.title}
          </h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-slate-100 text-xs text-slate-600">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5 font-medium">
              <Bed className="w-4 h-4 text-emerald-600" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5 font-medium">
              <Bath className="w-4 h-4 text-emerald-600" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 font-medium">
            <Maximize2 className="w-4 h-4 text-emerald-600" />
            <span>{property.sizeSqm} sqm</span>
          </div>
        </div>

        {/* Footer / Agent */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <img 
              src={property.agentImage} 
              alt={property.agentName} 
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div className="text-xs">
              <div className="font-semibold text-slate-800 line-clamp-1">{property.agencyName}</div>
            </div>
          </div>

          {property.verified && (
            <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
