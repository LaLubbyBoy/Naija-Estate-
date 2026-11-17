export type PropertyCategory = 'Residential' | 'Commercial' | 'Land' | 'Shortlet';

export type PropertyPurpose = 'sale' | 'rent' | 'shortlet' | 'commercial_lease';

export type UserRole = 'buyer' | 'tenant' | 'landlord' | 'seller' | 'agent' | 'developer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  agencyName?: string;
  verified: boolean;
  verificationStatus: 'unsubmitted' | 'pending' | 'verified' | 'rejected';
  bio?: string;
  officeAddress?: string;
  yearsOfExperience?: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  category: PropertyCategory;
  type: string;
  purpose: PropertyPurpose;
  price: number;
  period?: 'per year' | 'per month' | 'per night';
  sizeSqm: number;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  condition: 'Brand New' | 'Newly Renovated' | 'Fairly Used' | 'Off-Plan';
  state: string;
  city: string;
  neighbourhood: string;
  address: string;
  lat: number;
  lng: number;
  images: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  features: {
    pool: boolean;
    parking: boolean;
    security: boolean;
    electricity: boolean;
    water: boolean;
    internet: boolean;
    garden: boolean;
    balcony: boolean;
    ac: boolean;
    gym: boolean;
    elevator: boolean;
    cctv: boolean;
  };
  verified: boolean;
  verifiedAgent: boolean;
  agentId: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: string;
  agencyName: string;
  createdAt: string;
  featured: boolean;
  views: number;
  status: 'active' | 'pending' | 'rejected' | 'sold' | 'rented';
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  agentId: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  response?: string;
}

export interface InspectionBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  agentId: string;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userId: string;
  userName: string;
  reason: 'fraud' | 'duplicate' | 'misleading_price' | 'wrong_info' | 'other';
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: 'enquiry' | 'inspection' | 'listing' | 'system' | 'verification';
}

export interface ReviewItem {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}
