import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, User, Enquiry, InspectionBooking, NotificationItem, ReportItem, UserRole } from '../types';
import { INITIAL_USERS, INITIAL_PROPERTIES, INITIAL_ENQUIRIES, INITIAL_INSPECTIONS, INITIAL_NOTIFICATIONS, INITIAL_REPORTS } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  allUsers: User[];
  properties: Property[];
  enquiries: Enquiry[];
  inspections: InspectionBooking[];
  notifications: NotificationItem[];
  reports: ReportItem[];
  wishlist: string[];
  activeView: string;
  setActiveView: (view: string) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  searchFilters: {
    purpose: string;
    category: string;
    state: string;
    city: string;
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    propertyType: string;
    verifiedOnly: boolean;
  };
  setSearchFilters: React.Dispatch<React.SetStateAction<any>>;
  toggleWishlist: (propertyId: string) => void;
  addProperty: (propertyData: Omit<Property, 'id' | 'createdAt' | 'views' | 'verified' | 'verifiedAgent' | 'agentId' | 'agentName' | 'agentPhone' | 'agentEmail' | 'agentImage' | 'agencyName' | 'status'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  sendEnquiry: (propertyId: string, propertyTitle: string, agentId: string, message: string) => void;
  respondToEnquiry: (enquiryId: string, response: string) => void;
  bookInspection: (propertyId: string, propertyTitle: string, agentId: string, date: string, time: string) => void;
  updateInspectionStatus: (inspectionId: string, status: 'accepted' | 'rejected' | 'completed') => void;
  moderateProperty: (propertyId: string, status: 'active' | 'rejected') => void;
  toggleFeatureProperty: (propertyId: string) => void;
  verifyAgent: (userId: string, status: 'verified' | 'rejected') => void;
  submitReport: (propertyId: string, propertyTitle: string, reason: any, description: string) => void;
  switchRole: (role: UserRole) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('naija_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('naija_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default Chinedu (Buyer)
  });

  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('naija_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('naija_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [inspections, setInspections] = useState<InspectionBooking[]>(() => {
    const saved = localStorage.getItem('naija_inspections');
    return saved ? JSON.parse(saved) : INITIAL_INSPECTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('naija_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('naija_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('naija_wishlist');
    return saved ? JSON.parse(saved) : ['prop-1', 'prop-5'];
  });

  const [activeView, setActiveView] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const [searchFilters, setSearchFilters] = useState({
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

  useEffect(() => {
    localStorage.setItem('naija_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('naija_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('naija_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('naija_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('naija_inspections', JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem('naija_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('naija_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('naija_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const switchRole = (role: UserRole) => {
    const match = allUsers.find(u => u.role === role) || {
      id: `user-${role}-${Date.now()}`,
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      email: `${role}@naijaestate.pro`,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
      phone: '+234 803 555 0199',
      agencyName: role === 'agent' || role === 'developer' ? 'Premier Realty Group' : undefined,
      verified: true,
      verificationStatus: 'verified'
    };
    setCurrentUser(match);
  };

  const toggleWishlist = (propertyId: string) => {
    setWishlist(prev => 
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };

  const addProperty = (propertyData: any) => {
    const newProp: Property = {
      ...propertyData,
      id: `prop-${Date.now()}`,
      agentId: currentUser.id,
      agentName: currentUser.name,
      agentPhone: currentUser.phone,
      agentEmail: currentUser.email,
      agentImage: currentUser.avatar,
      agencyName: currentUser.agencyName || 'Independent Agent',
      verified: currentUser.verified,
      verifiedAgent: currentUser.verified,
      createdAt: new Date().toISOString().split('T')[0],
      featured: false,
      views: 1,
      status: currentUser.role === 'admin' ? 'active' : 'pending' // Moderation for non-admins
    };

    setProperties(prev => [newProp, ...prev]);
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Property Submitted',
      message: `Your property "${newProp.title}" was successfully submitted and is pending admin moderation.`,
      read: false,
      createdAt: new Date().toISOString(),
      type: 'listing'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const sendEnquiry = (propertyId: string, propertyTitle: string, agentId: string, message: string) => {
    const newEnq: Enquiry = {
      id: `enq-${Date.now()}`,
      propertyId,
      propertyTitle,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: currentUser.phone,
      message,
      agentId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [newEnq, ...prev]);

    // Notify agent or admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: agentId,
      title: 'New Property Enquiry',
      message: `${currentUser.name} sent an enquiry regarding "${propertyTitle}".`,
      read: false,
      createdAt: new Date().toISOString(),
      type: 'enquiry'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const respondToEnquiry = (enquiryId: string, response: string) => {
    setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: 'responded', response } : e));
  };

  const bookInspection = (propertyId: string, propertyTitle: string, agentId: string, date: string, time: string) => {
    const newInsp: InspectionBooking = {
      id: `insp-${Date.now()}`,
      propertyId,
      propertyTitle,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: currentUser.phone,
      date,
      time,
      status: 'pending',
      agentId,
      createdAt: new Date().toISOString()
    };
    setInspections(prev => [newInsp, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: agentId,
      title: 'Inspection Request',
      message: `${currentUser.name} booked a viewing inspection for "${propertyTitle}" on ${date} at ${time}.`,
      read: false,
      createdAt: new Date().toISOString(),
      type: 'inspection'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateInspectionStatus = (inspectionId: string, status: 'accepted' | 'rejected' | 'completed') => {
    setInspections(prev => prev.map(i => i.id === inspectionId ? { ...i, status } : i));
  };

  const moderateProperty = (propertyId: string, status: 'active' | 'rejected') => {
    setProperties(prev => prev.map(p => p.id === propertyId ? { ...p, status, verified: status === 'active' } : p));
  };

  const toggleFeatureProperty = (propertyId: string) => {
    setProperties(prev => prev.map(p => p.id === propertyId ? { ...p, featured: !p.featured } : p));
  };

  const verifyAgent = (userId: string, status: 'verified' | 'rejected') => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: status === 'verified', verificationStatus: status } : u));
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, verified: status === 'verified', verificationStatus: status }));
    }
  };

  const submitReport = (propertyId: string, propertyTitle: string, reason: any, description: string) => {
    const newRep: ReportItem = {
      id: `rep-${Date.now()}`,
      propertyId,
      propertyTitle,
      userId: currentUser.id,
      userName: currentUser.name,
      reason,
      description,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setReports(prev => [newRep, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        properties,
        enquiries,
        inspections,
        notifications,
        reports,
        wishlist,
        activeView,
        setActiveView,
        selectedPropertyId,
        setSelectedPropertyId,
        searchFilters,
        setSearchFilters,
        toggleWishlist,
        addProperty,
        updateProperty,
        deleteProperty,
        sendEnquiry,
        respondToEnquiry,
        bookInspection,
        updateInspectionStatus,
        moderateProperty,
        toggleFeatureProperty,
        verifyAgent,
        submitReport,
        switchRole,
        markNotificationAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
