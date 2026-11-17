import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, Bed, Bath, Maximize2, ShieldCheck, Heart, Share2, 
  Phone, Mail, MessageSquare, Calendar, Check, AlertTriangle, 
  Video, Eye, ArrowLeft, Send, Sparkles 
} from 'lucide-react';

export const PropertyDetailView: React.FC = () => {
  const { 
    properties, 
    selectedPropertyId, 
    setActiveView, 
    wishlist, 
    toggleWishlist, 
    sendEnquiry, 
    bookInspection, 
    submitReport,
    currentUser 
  } = useApp();

  const property = properties.find(p => p.id === selectedPropertyId) || properties[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [inspectionDate, setInspectionDate] = useState('');
  const [inspectionTime, setInspectionTime] = useState('10:00');
  const [inspectionBooked, setInspectionBooked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('fraud');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Property not found</h2>
        <button onClick={() => setActiveView('listings')} className="mt-4 bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold">
          Back to Listings
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(property.id);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryMessage.trim()) return;
    sendEnquiry(property.id, property.title, property.agentId, enquiryMessage);
    setEnquirySent(true);
    setEnquiryMessage('');
  };

  const handleInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectionDate) return;
    bookInspection(property.id, property.title, property.agentId, inspectionDate, inspectionTime);
    setInspectionBooked(true);
    setTimeout(() => {
      setShowInspectionModal(false);
      setInspectionBooked(false);
    }, 2500);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(property.id, property.title, reportReason, reportDesc);
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSubmitted(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => setActiveView('listings')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 mb-6 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </button>

        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                {property.purpose === 'sale' ? 'For Sale' : property.purpose === 'rent' ? 'For Rent' : 'Shortlet'}
              </span>
              <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                {property.category} - {property.type}
              </span>
              {property.verified && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Property
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{property.title}</h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{property.address}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => toggleWishlist(property.id)}
              className={`p-3 rounded-xl border transition flex items-center gap-2 text-xs font-bold ${isWishlisted ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              <span>{isWishlisted ? 'Saved' : 'Save'}</span>
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Property link copied to clipboard!');
              }}
              className="p-3 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition flex items-center gap-2 text-xs font-bold"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button 
              onClick={() => setShowReportModal(true)}
              className="p-3 bg-white text-rose-600 border border-slate-200 rounded-xl hover:bg-rose-50 transition flex items-center gap-1.5 text-xs font-bold"
              title="Report Listing"
            >
              <AlertTriangle className="w-4 h-4" /> Report
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          <div className="lg:col-span-2 h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-md bg-slate-100 relative">
            <img 
              src={property.images[activeImageIndex]} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl font-medium">
              Photo {activeImageIndex + 1} of {property.images.length}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-[400px] sm:h-[500px] overflow-y-auto pr-1">
            {property.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-36 rounded-2xl overflow-hidden cursor-pointer border-2 transition ${activeImageIndex === idx ? 'border-emerald-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Price & Specs Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Asking Price</span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-600 mt-1">
                    ₦ {property.price.toLocaleString('en-NG')}
                    {property.period && <span className="text-sm text-slate-500 font-normal ml-1">/{property.period}</span>}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowInspectionModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" /> Schedule Inspection
                  </button>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {property.bedrooms > 0 && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <Bed className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs text-slate-500">Bedrooms</span>
                    <h4 className="font-bold text-slate-900 text-lg">{property.bedrooms}</h4>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <Bath className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs text-slate-500">Bathrooms</span>
                    <h4 className="font-bold text-slate-900 text-lg">{property.bathrooms}</h4>
                  </div>
                )}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Maximize2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <span className="text-xs text-slate-500">Property Size</span>
                  <h4 className="font-bold text-slate-900 text-lg">{property.sizeSqm} sqm</h4>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <span className="text-xs text-slate-500">Condition</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{property.condition}</h4>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">About This Property</h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Property Facilities & Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(property.features).map(([key, available]) => (
                  <div key={key} className={`flex items-center gap-3 p-3.5 rounded-2xl border ${available ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400 line-through'}`}>
                    <Check className={`w-4 h-4 ${available ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span className="text-xs capitalize">{key.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Virtual Tour / Video preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-600" /> Virtual Tour & Walkthrough
              </h3>
              <div className="bg-slate-900 text-white rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <Sparkles className="w-10 h-10 text-emerald-400 mx-auto mb-3 animate-pulse" />
                  <h4 className="font-bold text-lg mb-1">360° Matterport Immersive Walkthrough</h4>
                  <p className="text-xs text-slate-400 mb-4">Take a virtual step inside this magnificent property from anywhere in the world.</p>
                  <button 
                    onClick={() => alert('Launching immersive 360 virtual tour viewer...')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition"
                  >
                    Start Virtual Tour
                  </button>
                </div>
              </div>
            </div>

            {/* Map Simulator */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" /> Location & Neighbourhood
              </h3>
              <div className="h-72 rounded-2xl bg-slate-200 relative overflow-hidden flex items-center justify-center border border-slate-300">
                <div className="absolute inset-0 bg-emerald-950/20"></div>
                <div className="absolute bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl text-center max-w-xs">
                  <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-2 animate-bounce" />
                  <h4 className="font-bold text-slate-900 text-sm">{property.neighbourhood}, {property.state}</h4>
                  <p className="text-xs text-slate-500 mt-1">{property.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Agent Card & Enquiry Form */}
          <div className="space-y-6">
            
            {/* Agent / Seller Profile Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Listed By</h4>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={property.agentImage} 
                  alt={property.agentName} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{property.agentName}</h3>
                  <p className="text-xs font-semibold text-emerald-600">{property.agencyName}</p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Real Estate Professional
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={`tel:${property.agentPhone}`}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                >
                  <Phone className="w-4 h-4" /> Call Agent ({property.agentPhone})
                </a>
                <a 
                  href={`https://wa.me/${property.agentPhone.replace(/[^0-9]/g, '')}?text=Hello%20${property.agentName},%20I%20am%20interested%20in%20your%20property:%20${encodeURIComponent(property.title)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Enquiry Form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-2">Send Property Enquiry</h3>
              <p className="text-xs text-slate-500 mb-4">Ask questions or request additional details from the agent.</p>

              {enquirySent ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center text-emerald-800 text-xs font-bold animate-in fade-in">
                  Enquiry sent successfully! The agent will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <div>
                    <textarea 
                      rows={4}
                      placeholder="Hello, is this property still available? I would like to know..."
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <Send className="w-4 h-4" /> Send Enquiry Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Inspection Modal */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Schedule Property Inspection</h3>
            <p className="text-xs text-slate-500 mb-6">{property.title}</p>

            {inspectionBooked ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center text-emerald-800 font-bold text-sm">
                Inspection booked successfully! The agent will confirm your appointment shortly.
              </div>
            ) : (
              <form onSubmit={handleInspectionSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Date</label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={inspectionDate}
                    onChange={(e) => setInspectionDate(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Time Slot</label>
                  <select 
                    value={inspectionTime}
                    onChange={(e) => setInspectionTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="10:00">10:00 AM - Morning</option>
                    <option value="12:00">12:00 PM - Midday</option>
                    <option value="14:00">02:00 PM - Afternoon</option>
                    <option value="16:00">04:00 PM - Evening</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowInspectionModal(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Report Listing Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Report Suspicious Listing</h3>
            <p className="text-xs text-slate-500 mb-6">Help keep NaijaEstate Pro safe by reporting fraudulent or incorrect listings.</p>

            {reportSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center text-emerald-800 font-bold text-sm">
                Report submitted successfully. Our admin team will investigate immediately.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason</label>
                  <select 
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="fraud">Suspected Fraud / Scam</option>
                    <option value="duplicate">Duplicate Listing</option>
                    <option value="misleading_price">Misleading Price</option>
                    <option value="wrong_info">Incorrect Property Information</option>
                    <option value="other">Other Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide details about why you are reporting this listing..."
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
