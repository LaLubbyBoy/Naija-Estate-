import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, Search, Heart, Bell, User, PlusCircle, 
  ShieldCheck, MapPin, Menu, X, ChevronDown, LogOut, LayoutDashboard 
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    activeView, 
    setActiveView, 
    wishlist, 
    notifications, 
    markNotificationAsRead 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && n.userId === currentUser.id).length;
  const userNotifications = notifications.filter(n => n.userId === currentUser.id);

  const roles: { role: UserRole; label: string }[] = [
    { role: 'buyer', label: 'Property Buyer' },
    { role: 'tenant', label: 'Tenant' },
    { role: 'landlord', label: 'Landlord' },
    { role: 'seller', label: 'Property Seller' },
    { role: 'agent', label: 'Real Estate Agent' },
    { role: 'developer', label: 'Property Developer' },
    { role: 'admin', label: 'Administrator' }
  ];

  const getDashboardView = (role: UserRole) => {
    if (role === 'admin') return 'admin-dashboard';
    if (['agent', 'landlord', 'seller', 'developer'].includes(role)) return 'agent-dashboard';
    return 'customer-dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveView('home'); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              NaijaEstate <span className="text-emerald-600">Pro</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">NG</span>
            </span>
            <span className="text-xs text-slate-500 font-medium tracking-wide">Nigeria's Premier Real Estate Hub</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setActiveView('home')} 
            className={`font-medium transition-colors ${activeView === 'home' ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveView('listings')} 
            className={`font-medium transition-colors ${activeView === 'listings' ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'}`}
          >
            Properties
          </button>
          <button 
            onClick={() => setActiveView('map')} 
            className={`font-medium transition-colors flex items-center gap-1.5 ${activeView === 'map' ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'}`}
          >
            <MapPin className="w-4 h-4" /> Map Explorer
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Wishlist Button */}
          <button 
            onClick={() => setActiveView('customer-dashboard')}
            className="relative p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">Notifications</h4>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {userNotifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-sm">No notifications yet</div>
                  ) : (
                    userNotifications.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-3.5 hover:bg-slate-50 cursor-pointer transition ${!n.read ? 'bg-emerald-50/50' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher / Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-xl transition"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-8 h-8 rounded-full object-cover border border-emerald-500"
              />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  {currentUser.name}
                  {currentUser.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium capitalize">
                  {currentUser.role} account
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">Switch Account Role (Demo):</p>
                </div>
                <div className="py-1">
                  {roles.map(r => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 hover:text-emerald-700 transition ${currentUser.role === r.role ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700'}`}
                    >
                      <span>{r.label}</span>
                      {currentUser.role === r.role && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-2 mt-1 px-2">
                  <button
                    onClick={() => {
                      setActiveView(getDashboardView(currentUser.role));
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 rounded-xl flex items-center gap-2 transition"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-600" /> Open My Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Post Property Button (For agents, landlords, sellers, developers, admins) */}
          {['agent', 'landlord', 'seller', 'developer', 'admin'].includes(currentUser.role) && (
            <button 
              onClick={() => setActiveView('post-property')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-emerald-600/20 transition hover:shadow-lg"
            >
              <PlusCircle className="w-4 h-4" /> Post Property
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <button 
            onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            Home
          </button>
          <button 
            onClick={() => { setActiveView('listings'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            Properties
          </button>
          <button 
            onClick={() => { setActiveView('map'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" /> Map Explorer
          </button>
          <button 
            onClick={() => { setActiveView(getDashboardView(currentUser.role)); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-emerald-600 flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard ({currentUser.role})
          </button>
          {['agent', 'landlord', 'seller', 'developer', 'admin'].includes(currentUser.role) && (
            <button 
              onClick={() => { setActiveView('post-property'); setMobileMenuOpen(false); }}
              className="w-full bg-emerald-600 text-white font-medium text-sm py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Post Property
            </button>
          )}
        </div>
      )}
    </header>
  );
};
