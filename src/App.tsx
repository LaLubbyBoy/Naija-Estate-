/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ListingsView } from './components/ListingsView';
import { PropertyDetailView } from './components/PropertyDetailView';
import { MapView } from './components/MapView';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AgentDashboard } from './components/AgentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PostPropertyModal } from './components/PostPropertyModal';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'listings' && <ListingsView />}
        {activeView === 'property-detail' && <PropertyDetailView />}
        {activeView === 'map' && <MapView />}
        {activeView === 'customer-dashboard' && <CustomerDashboard />}
        {activeView === 'agent-dashboard' && <AgentDashboard />}
        {activeView === 'admin-dashboard' && <AdminDashboard />}
        {activeView === 'post-property' && <PostPropertyModal />}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
