import mockProperties from '../data/mockProperties.json';
import mockUsers from '../data/mockUsers.json';
import mockBookings from '../data/mockBookings.json';
import mockMessages from '../data/mockMessages.json';
import mockStats from '../data/mockStats.json';

export interface PropertyImage {
  id: number;
  url: string;
  title: string;
  description: string;
  alt: string;
  tags: string[]; // Combined all lighting, season, weather, colors, metaTags into one tags array
  isPrimary: boolean;
}

export interface AttachedMovie {
  id: number;
  title: string;
  year: string;
  role: string;
  description: string;
  genre: string;
  director: string;
  imdbUrl?: string;
  trailerUrl?: string;
}

export interface Property {
  id: number;
  name: string;
  location: string;
  category: string;
  price: string;
  status: string;
  bookings: number;
  rating: number;
  description: string;
  lastUpdated?: string;
  views?: number;
  revenue?: string;
  ownerId: number;
  images: PropertyImage[];
  features: string[];
  tags: string[];
  amenities: string[];
  attachedMovies: AttachedMovie[];
  metadata: {
    sizeM2: number;
    powerAmps: number;
    maxCrew: number;
    parking: boolean;
    coordinates: { lat: number; lng: number };
    // Film/Photo specific metadata
    ceilingHeight?: number;
    naturalLight?: boolean;
    soundProofing?: boolean;
    loadingAccess?: boolean;
    greenScreen?: boolean;
    cyc?: boolean;
    grip?: boolean;
    catering?: boolean;
    makeupRoom?: boolean;
    clientArea?: boolean;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'scout';
  avatar: string;
  joinDate: string;
  isVerified: boolean;
  profile: {
    bio: string;
    location: string;
    company: string;
    website: string;
    socialMedia: Record<string, string>;
  };
  preferences?: {
    favoriteCategories: string[];
    budget: { min: number; max: number };
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  scoutProfile?: {
    experience: string;
    specialties: string[];
    certifications: string[];
    languages: string[];
    responseTime: string;
    successRate: string;
  };
  stats: {
    totalBookings?: number;
    totalSpent?: string;
    favoriteLocations?: number;
    reviewsGiven?: number;
    propertiesListed?: number;
    totalEarnings?: string;
    averageRating?: number;
    responseRate?: string;
  };
}

export interface Booking {
  id: number;
  propertyId: number;
  userId: number;
  scoutId: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  totalDays: number;
  pricePerDay: number;
  totalAmount: number;
  bookingDate: string;
  purpose: string;
  crewSize: number;
  specialRequests: string;
  equipment: string[];
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: string;
  contact: {
    phone: string;
    email: string;
  };
  cancellationPolicy: string;
  insurance: boolean;
  notes: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments: Array<{
    id: number;
    name: string;
    type: string;
    size: number;
    url: string;
  }>;
}

export interface Conversation {
  id: number;
  conversationId: string;
  participants: number[];
  propertyId?: number;
  bookingId?: number;
  subject: string;
  messages: Message[];
  status: 'active' | 'archived' | 'closed';
  priority: 'low' | 'normal' | 'high';
  lastActivity: string;
  tags: string[];
}

class MockDataService {
  private properties: Property[] = mockProperties as Property[];
  private users: User[] = mockUsers as User[];
  private bookings: Booking[] = mockBookings as Booking[];
  private conversations: Conversation[] = mockMessages as Conversation[];
  private stats = mockStats;
  private userSavedProperties: Record<number, number[]> = {
    1: [1, 2], // User 1 has saved properties 1 and 2
    2: [1, 3], // User 2 has saved properties 1 and 3
  };

  // Properties
  getProperties(): Property[] {
    return this.properties;
  }

  getProperty(id: number): Property | undefined {
    return this.properties.find(p => p.id === id);
  }

  updateProperty(id: number, updates: Partial<Property>): void {
    const index = this.properties.findIndex(p => p.id === id);
    if (index !== -1) {
      this.properties[index] = { ...this.properties[index], ...updates };
    }
  }

  addProperty(property: Omit<Property, 'id'>): Property {
    const newProperty: Property = {
      ...property,
      id: Math.max(...this.properties.map(p => p.id)) + 1
    };
    this.properties.push(newProperty);
    return newProperty;
  }

  deleteProperty(id: number): void {
    this.properties = this.properties.filter(p => p.id !== id);
  }

  // Users
  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  getScouts(): User[] {
    return this.users.filter(u => u.role === 'scout');
  }

  // User Preferences and Saved Properties
  getUserSavedProperties(userId: number): Property[] {
    const savedIds = this.userSavedProperties[userId] || [];
    return this.properties.filter(p => savedIds.includes(p.id));
  }

  savePropertyForUser(userId: number, propertyId: number): void {
    if (!this.userSavedProperties[userId]) {
      this.userSavedProperties[userId] = [];
    }
    if (!this.userSavedProperties[userId].includes(propertyId)) {
      this.userSavedProperties[userId].push(propertyId);
    }
  }

  unsavePropertyForUser(userId: number, propertyId: number): void {
    if (this.userSavedProperties[userId]) {
      this.userSavedProperties[userId] = this.userSavedProperties[userId].filter(id => id !== propertyId);
    }
  }

  isPropertySavedByUser(userId: number, propertyId: number): boolean {
    return this.userSavedProperties[userId]?.includes(propertyId) || false;
  }

  // Bookings
  getBookings(): Booking[] {
    return this.bookings;
  }

  getBooking(id: number): Booking | undefined {
    return this.bookings.find(b => b.id === id);
  }

  getBookingsByUser(userId: number): Booking[] {
    return this.bookings.filter(b => b.userId === userId);
  }

  getBookingsByScout(scoutId: number): Booking[] {
    return this.bookings.filter(b => b.scoutId === scoutId);
  }

  getBookingsByProperty(propertyId: number): Booking[] {
    return this.bookings.filter(b => b.propertyId === propertyId);
  }

  updateBooking(id: number, updates: Partial<Booking>): void {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...updates };
    }
  }

  addBooking(booking: Omit<Booking, 'id'>): Booking {
    const newBooking: Booking = {
      ...booking,
      id: Math.max(...this.bookings.map(b => b.id)) + 1
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  // Messages
  getConversations(): Conversation[] {
    return this.conversations;
  }

  getConversation(id: number): Conversation | undefined {
    return this.conversations.find(c => c.id === id);
  }

  getConversationsByUser(userId: number): Conversation[] {
    return this.conversations.filter(c => c.participants.includes(userId));
  }

  addMessage(conversationId: number, message: Omit<Message, 'id'>): void {
    const conversation = this.conversations.find(c => c.id === conversationId);
    if (conversation) {
      const newMessage: Message = {
        ...message,
        id: Math.max(...conversation.messages.map(m => m.id)) + 1
      };
      conversation.messages.push(newMessage);
      conversation.lastActivity = new Date().toISOString();
    }
  }

  markMessageAsRead(conversationId: number, messageId: number): void {
    const conversation = this.conversations.find(c => c.id === conversationId);
    if (conversation) {
      const message = conversation.messages.find(m => m.id === messageId);
      if (message) {
        message.isRead = true;
      }
    }
  }

  // Stats
  getStats() {
    return this.stats;
  }

  // Search and Filter Properties
  searchProperties(query: string, filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    tags?: string[];
    features?: string[];
  }): Property[] {
    let results = this.properties;

    // Text search
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.location.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    // Category filter
    if (filters?.category) {
      results = results.filter(p => p.category === filters.category);
    }

    // Price range filter
    if (filters?.minPrice !== undefined) {
      results = results.filter(p => {
        const price = parseInt(p.price.replace(/[^\d]/g, ''));
        return price >= filters.minPrice!;
      });
    }

    if (filters?.maxPrice !== undefined) {
      results = results.filter(p => {
        const price = parseInt(p.price.replace(/[^\d]/g, ''));
        return price <= filters.maxPrice!;
      });
    }

    // Location filter
    if (filters?.location) {
      results = results.filter(p => 
        p.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Tags filter
    if (filters?.tags && filters.tags.length > 0) {
      results = results.filter(p => 
        filters.tags!.some(tag => p.tags.includes(tag))
      );
    }

    // Features filter
    if (filters?.features && filters.features.length > 0) {
      results = results.filter(p => 
        filters.features!.some(feature => p.features.includes(feature))
      );
    }

    return results;
  }

  // Get properties by metadata criteria
  getPropertiesByMetadata(criteria: Partial<Property['metadata']>): Property[] {
    return this.properties.filter(property => {
      return Object.entries(criteria).every(([key, value]) => {
        const metadataValue = property.metadata[key as keyof typeof property.metadata];
        
        if (typeof value === 'boolean') {
          return metadataValue === value;
        }
        
        if (typeof value === 'number' && typeof metadataValue === 'number') {
          return metadataValue >= value;
        }
        
        return true;
      });
    });
  }

  // Analytics and Insights
  getPropertyAnalytics(propertyId: number) {
    const property = this.getProperty(propertyId);
    if (!property) return null;

    const bookings = this.getBookingsByProperty(propertyId);
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const averageBookingValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;
    
    return {
      totalBookings: bookings.length,
      totalRevenue,
      averageBookingValue,
      viewCount: property.views || 0,
      rating: property.rating,
      occupancyRate: bookings.length > 0 ? (bookings.filter(b => b.status === 'completed').length / bookings.length) * 100 : 0
    };
  }

  // Image Management
  addImageToProperty(propertyId: number, imageData: Omit<PropertyImage, 'id'>): void {
    const property = this.getProperty(propertyId);
    if (property) {
      const newImage: PropertyImage = {
        ...imageData,
        id: Math.max(...property.images.map(img => img.id), 0) + 1
      };
      property.images.push(newImage);
    }
  }

  updatePropertyImage(propertyId: number, imageId: number, updates: Partial<PropertyImage>): void {
    const property = this.getProperty(propertyId);
    if (property) {
      const imageIndex = property.images.findIndex(img => img.id === imageId);
      if (imageIndex !== -1) {
        property.images[imageIndex] = { ...property.images[imageIndex], ...updates };
      }
    }
  }

  deletePropertyImage(propertyId: number, imageId: number): void {
    const property = this.getProperty(propertyId);
    if (property) {
      property.images = property.images.filter(img => img.id !== imageId);
    }
  }
}

export const mockDataService = new MockDataService();
export default mockDataService;
