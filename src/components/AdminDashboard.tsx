import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, Users, ShieldCheck, CheckCircle2, XCircle, 
  Star, AlertTriangle, FileText, Download, Trash2 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    properties, 
    allUsers, 
    enquiries, 
    inspections, 
    reports, 
    moderateProperty, 
    toggleFeatureProperty, 
    verifyAgent 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'properties' | 'agents' | 'reports' | 'analytics'>('properties');

  const pendingProperties = properties.filter(p => p.status === 'pending');
  const pendingAgents = allUsers.filter(u => u.verificationStatus === 'pending' || u.role === 'agent');

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Admin Control Center</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mt-2">Platform Administration</h1>
            <p className="text-xs text-slate-500 mt-1">Monitor property listings, verify agents, and moderate platform activity.</p>
          </div>
          <div>
            <button 
              onClick={() => {
                alert('Platform CSV Report downloaded successfully!');
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition"
            >
              <Download className="w-4 h-4" /> Export Analytics CSV
            </button>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Properties</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{properties.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Pending Moderation</span>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{pendingProperties.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Users & Agents</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{allUsers.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Fraud Reports</span>
            <h3 className="text-2xl font-black text-rose-600 mt-1">{reports.length}</h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'properties', label: 'Property Moderation', icon: Building2, count: properties.length },
            { id: 'agents', label: 'Agent Verification', icon: ShieldCheck, count: allUsers.length },
            { id: 'reports', label: 'Fraud & Reports', icon: AlertTriangle, count: reports.length },
            { id: 'analytics', label: 'Platform Analytics', icon: FileText }
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

        {/* Property Moderation Tab */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Property Moderation & Approval</h3>
            <div className="space-y-4">
              {properties.map(prop => (
                <div key={prop.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={prop.images[0]} alt={prop.title} className="w-24 h-20 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${prop.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {prop.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">By {prop.agentName}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{prop.title}</h4>
                      <p className="text-xs text-slate-500">₦ {prop.price.toLocaleString('en-NG')} • {prop.neighbourhood}, {prop.state}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {prop.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => moderateProperty(prop.id, 'active')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => moderateProperty(prop.id, 'rejected')}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => toggleFeatureProperty(prop.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1 ${prop.featured ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-700 border-slate-200'}`}
                    >
                      <Star className="w-4 h-4 fill-current" /> {prop.featured ? 'Featured' : 'Feature'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agent Verification Tab */}
        {activeTab === 'agents' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Real Estate Agent & Developer Verification</h3>
            <div className="space-y-4">
              {allUsers.map(u => (
                <div key={u.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <img src={u.avatar} alt={u.name} className="w-16 h-16 rounded-full object-cover border" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{u.name}</h4>
                      <p className="text-xs text-emerald-600 font-semibold">{u.agencyName || u.role}</p>
                      <p className="text-xs text-slate-500">{u.email} • {u.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${u.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {u.verified ? 'Verified Agent' : 'Unverified'}
                    </span>
                    {!u.verified ? (
                      <button 
                        onClick={() => verifyAgent(u.id, 'verified')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
                      >
                        Verify Agent
                      </button>
                    ) : (
                      <button 
                        onClick={() => verifyAgent(u.id, 'rejected')}
                        className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-bold px-4 py-2.5 rounded-xl"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Fraud Reports & Suspicious Listings</h3>
            {reports.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-sm">No fraud reports submitted. All listings are secure.</div>
            ) : (
              <div className="space-y-4">
                {reports.map(rep => (
                  <div key={rep.id} className="p-4 rounded-2xl border border-rose-200 bg-rose-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-rose-700 uppercase">Reason: {rep.reason}</span>
                      <span className="text-xs text-slate-500">{new Date(rep.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Property: {rep.propertyTitle}</h4>
                    <p className="text-xs text-slate-700">{rep.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Platform Performance & Growth Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm mb-2">Most Searched Locations</h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex justify-between"><span>1. Lekki Phase 1, Lagos</span> <strong className="text-emerald-600">42%</strong></li>
                  <li className="flex justify-between"><span>2. Maitama, Abuja</span> <strong className="text-emerald-600">28%</strong></li>
                  <li className="flex justify-between"><span>3. Victoria Island, Lagos</span> <strong className="text-emerald-600">18%</strong></li>
                </ul>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm mb-2">Top Property Categories</h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex justify-between"><span>1. Detached Duplexes</span> <strong className="text-emerald-600">45%</strong></li>
                  <li className="flex justify-between"><span>2. Serviced Apartments</span> <strong className="text-emerald-600">30%</strong></li>
                  <li className="flex justify-between"><span>3. Shortlets</span> <strong className="text-emerald-600">15%</strong></li>
                </ul>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm mb-2">Transaction Security</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  100% of escrow and verification checks are routed through verified Nigerian financial partners and administrator moderation.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
