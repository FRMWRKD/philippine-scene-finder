
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
  category: string;
  lighting: string;
  season: string;
  weather: string;
  colors: string[];
  metaTags: string[];
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
