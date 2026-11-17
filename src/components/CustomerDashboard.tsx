import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { 
  Heart, Calendar, MessageSquare, Bell, User, Settings, 
  ShieldCheck, ArrowRight, CheckCircle2, Clock 
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    properties, 
    wishlist, 
    enquiries, 
    inspections, 
    notifications, 
    setActiveView,
    setSelectedPropertyId 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wishlist' | 'enquiries' | 'inspections' | 'notifications' | 'profile'>('wishlist');

  const wishlistedProperties = properties.filter(p => wishlist.includes(p.id));
  const userEnquiries = enquiries.filter(e => e.userId === currentUser.id);
  const userInspections = inspections.filter(i => i.userId === currentUser.id);
  const userNotifications = notifications.filter(n => n.userId === currentUser.id);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Header Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-20 h-20 rounded-full object-cover border-4 border-emerald-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{currentUser.name}</h1>
                {currentUser.verified && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
              <div className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full mt-2 border border-emerald-200">
                Account Role: <span className="capitalize font-bold">{currentUser.role}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs text-slate-400 font-semibold block">Wishlist</span>
              <span className="font-black text-slate-900 text-lg">{wishlist.length}</span>
            </div>
            <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs text-slate-400 font-semibold block">Inspections</span>
              <span className="font-black text-slate-900 text-lg">{userInspections.length}</span>
            </div>
            <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs text-slate-400 font-semibold block">Enquiries</span>
              <span className="font-black text-slate-900 text-lg">{userEnquiries.length}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlist.length },
            { id: 'inspections', label: 'Inspection Bookings', icon: Calendar, count: userInspections.length },
            { id: 'enquiries', label: 'My Enquiries', icon: MessageSquare, count: userEnquiries.length },
            { id: 'notifications', label: 'Notifications', icon: Bell, count: userNotifications.length },
            { id: 'profile', label: 'Profile Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'wishlist' && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Saved Property Wishlist</h3>
            {wishlistedProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 text-base mb-1">Your wishlist is empty</h4>
                <p className="text-xs text-slate-500 mb-6">Browse properties and click the heart icon to save listings here.</p>
                <button 
                  onClick={() => setActiveView('listings')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition"
                >
                  Explore Properties
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProperties.map(prop => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'inspections' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Property Inspection Appointments</h3>
            {userInspections.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No inspection appointments booked yet.</div>
            ) : (
              <div className="space-y-4">
                {userInspections.map(insp => (
                  <div key={insp.id} className="p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
                    <div>
                      <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full uppercase mb-2 ${insp.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : insp.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                        Status: {insp.status}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">{insp.propertyTitle}</h4>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Date: <strong>{insp.date}</strong> at <strong>{insp.time}</strong>
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedPropertyId(insp.propertyId);
                        setActiveView('property-detail');
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
                    >
                      View Property
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Property Enquiries Sent</h3>
            {userEnquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No enquiries sent yet.</div>
            ) : (
              <div className="space-y-4">
                {userEnquiries.map(enq => (
                  <div key={enq.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{enq.propertyTitle}</h4>
                      <span className="text-[10px] text-slate-400">{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100">
                      <strong>You:</strong> {enq.message}
                    </p>
                    {enq.response && (
                      <p className="text-xs text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                        <strong>Agent Response:</strong> {enq.response}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Notifications</h3>
            {userNotifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No notifications.</div>
            ) : (
              <div className="space-y-3">
                {userNotifications.map(n => (
                  <div key={n.id} className={`p-4 rounded-2xl border ${!n.read ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-600">{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Profile Settings</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Profile updated successfully!'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={currentUser.name} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={currentUser.email} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                <input 
                  type="text" 
                  defaultValue={currentUser.phone} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800" 
                />
              </div>
              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
