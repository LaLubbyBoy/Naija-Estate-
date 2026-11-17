import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, PlusCircle, Eye, MessageSquare, Calendar, 
  ShieldCheck, Trash2, Edit, CheckCircle2, XCircle, Clock 
} from 'lucide-react';

export const AgentDashboard: React.FC = () => {
  const { 
    currentUser, 
    properties, 
    enquiries, 
    inspections, 
    deleteProperty, 
    respondToEnquiry, 
    updateInspectionStatus,
    setActiveView 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'enquiries' | 'inspections' | 'profile'>('listings');
  const [responseModalEnquiryId, setResponseModalEnquiryId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');

  const myProperties = properties.filter(p => p.agentId === currentUser.id);
  const myPropertyIds = myProperties.map(p => p.id);
  const myEnquiries = enquiries.filter(e => myPropertyIds.includes(e.propertyId) || e.agentId === currentUser.id);
  const myInspections = inspections.filter(i => myPropertyIds.includes(i.propertyId) || i.agentId === currentUser.id);

  const handleRespond = (enqId: string) => {
    if (!responseText.trim()) return;
    respondToEnquiry(enqId, responseText);
    setResponseModalEnquiryId(null);
    setResponseText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Agent Header Banner */}
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
              <p className="text-xs text-emerald-600 font-bold">{currentUser.agencyName || 'Independent Real Estate Partner'}</p>
              <p className="text-xs text-slate-500 mt-1">{currentUser.email} • {currentUser.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveView('post-property')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Add New Listing
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Listings</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{myProperties.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Enquiries</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{myEnquiries.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Inspection Bookings</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{myInspections.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Verification Status</span>
            <h3 className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> {currentUser.verificationStatus}
            </h3>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'listings', label: 'My Property Listings', icon: Building2, count: myProperties.length },
            { id: 'enquiries', label: 'Customer Enquiries', icon: MessageSquare, count: myEnquiries.length },
            { id: 'inspections', label: 'Inspection Appointments', icon: Calendar, count: myInspections.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Manage Property Listings</h3>
              <button 
                onClick={() => setActiveView('post-property')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
              >
                + Add Property
              </button>
            </div>

            {myProperties.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-sm">
                You have not posted any properties yet. Click '+ Add Property' to start publishing.
              </div>
            ) : (
              <div className="space-y-4">
                {myProperties.map(prop => (
                  <div key={prop.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img src={prop.images[0]} alt={prop.title} className="w-24 h-20 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${prop.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {prop.status}
                          </span>
                          <span className="text-xs font-bold text-slate-500">₦ {prop.price.toLocaleString('en-NG')}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{prop.title}</h4>
                        <p className="text-xs text-slate-500">{prop.neighbourhood}, {prop.state}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button 
                        onClick={() => deleteProperty(prop.id)}
                        className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Customer Enquiries</h3>
            {myEnquiries.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-sm">No enquiries received yet.</div>
            ) : (
              <div className="space-y-4">
                {myEnquiries.map(enq => (
                  <div key={enq.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{enq.propertyTitle}</span>
                      <span className="text-xs text-emerald-600 font-semibold">{enq.userName} ({enq.userPhone})</span>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100">
                      <strong>Customer Message:</strong> {enq.message}
                    </p>
                    {enq.response ? (
                      <p className="text-xs text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                        <strong>Your Response:</strong> {enq.response}
                      </p>
                    ) : (
                      <div className="pt-2">
                        {responseModalEnquiryId === enq.id ? (
                          <div className="space-y-2">
                            <textarea 
                              rows={3}
                              placeholder="Type your response to the customer..."
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                            ></textarea>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleRespond(enq.id)}
                                className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                              >
                                Send Reply
                              </button>
                              <button 
                                onClick={() => setResponseModalEnquiryId(null)}
                                className="bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setResponseModalEnquiryId(enq.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition"
                          >
                            Reply to Enquiry
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inspections Tab */}
        {activeTab === 'inspections' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Inspection Appointments</h3>
            {myInspections.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-sm">No inspection appointments scheduled yet.</div>
            ) : (
              <div className="space-y-4">
                {myInspections.map(insp => (
                  <div key={insp.id} className="p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
                    <div>
                      <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full uppercase mb-2 ${insp.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : insp.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                        {insp.status}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">{insp.propertyTitle}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Client: <strong>{insp.userName}</strong> ({insp.userPhone}) • Date: <strong>{insp.date}</strong> at <strong>{insp.time}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {insp.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateInspectionStatus(insp.id, 'accepted')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => updateInspectionStatus(insp.id, 'rejected')}
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {insp.status === 'accepted' && (
                        <button 
                          onClick={() => updateInspectionStatus(insp.id, 'completed')}
                          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
