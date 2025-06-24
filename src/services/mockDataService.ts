import mockProperties from '../data/mockProperties.json';
import mockUsers from '../data/mockUsers.json';
import mockBookings from '../data/mockBookings.json';
import mockMessages from '../data/mockMessages.json';

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
  lastUpdated: string;
  views: number;
  revenue: string;
  ownerId: number;
  images: Image[];
  features: string[];
  tags: string[];
  amenities: string[];
  attachedMovies: Movie[];
  metadata: Metadata;
}

export interface Image {
  id: number;
  url: string;
  title: string;
  description: string;
  alt: string;
  tags: string[];
  isPrimary: boolean;
}

export interface Movie {
  id: number;
  title: string;
  year: string;
  role: string;
  description: string;
  genre: string;
  director: string;
  imdbUrl: string;
  trailerUrl: string;
}

export interface Metadata {
  sizeM2: number;
  powerAmps: number;
  maxCrew: number;
  parking: boolean;
  coordinates: Coordinates;
  ceilingHeight: number;
  naturalLight: boolean;
  soundProofing: boolean;
  loadingAccess: boolean;
  greenScreen: boolean;
  cyc: boolean;
  grip: boolean;
  catering: boolean;
  makeupRoom: boolean;
  clientArea: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  isVerified: boolean;
  profile: Profile;
  stats: Stats;
  savedProperties: number[];
}

export interface Profile {
  bio: string;
  location: string;
  company: string;
}

export interface Stats {
  totalBookings: number;
  reviewsGiven: number;
  totalSpent: string;
}

export interface Booking {
  id: number;
  propertyId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  status: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  propertyId: number;
  timestamp: string;
  content: string;
}

class MockDataService {
  private properties: Property[] = [];
  private users: User[] = [];
  private bookings: Booking[] = [];
  private messages: Message[] = [];

  constructor() {
    this.loadMockData();
  }

  private loadMockData() {
    // Load properties from JSON
    this.properties = mockProperties;
    this.users = mockUsers;
    this.bookings = mockBookings;
    this.messages = mockMessages;
  }

  // Property methods
  getProperties(): Property[] {
    return this.properties;
  }

  getProperty(id: number): Property | undefined {
    return this.properties.find(p => p.id === id);
  }

  addProperty(property: Property): void {
    this.properties.push(property);
  }

  updateProperty(id: number, updatedProperty: Property): void {
    const index = this.properties.findIndex(p => p.id === id);
    if (index !== -1) {
      this.properties[index] = { ...this.properties[index], ...updatedProperty };
    }
  }

  deleteProperty(id: number): void {
    this.properties = this.properties.filter(p => p.id !== id);
  }

  // User methods
  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  updateUser(id: number, updatedUser: User): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
  }

  // Booking methods
  getBookings(): Booking[] {
    return this.bookings;
  }

  getBooking(id: number): Booking | undefined {
    return this.bookings.find(b => b.id === id);
  }

   getBookingsByUser(userId: number): Booking[] {
    return this.bookings.filter(booking => booking.userId === userId);
  }

  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  updateBooking(id: number, updatedBooking: Booking): void {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...updatedBooking };
    }
  }

  deleteBooking(id: number): void {
    this.bookings = this.bookings.filter(b => b.id !== id);
  }

  // Message methods
  getMessages(): Message[] {
    return this.messages;
  }

  getMessage(id: number): Message | undefined {
    return this.messages.find(m => m.id === id);
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  updateMessage(id: number, updatedMessage: Message): void {
    const index = this.messages.findIndex(m => m.id === id);
    if (index !== -1) {
      this.messages[index] = { ...this.messages[index], ...updatedMessage };
    }
  }

  deleteMessage(id: number): void {
    this.messages = this.messages.filter(m => m.id !== id);
  }

  // User saved properties
  getUserSavedProperties(userId: number): Property[] {
    const user = this.getUser(userId);
    if (!user) return [];

    return user.savedProperties.map(propertyId => {
      const property = this.getProperty(propertyId);
      return property!;
    });
  }

  savePropertyForUser(userId: number, propertyId: number): void {
    const user = this.getUser(userId);
    if (!user) return;

    if (!user.savedProperties.includes(propertyId)) {
      user.savedProperties.push(propertyId);
    }
  }

  unsavePropertyForUser(userId: number, propertyId: number): void {
    const user = this.getUser(userId);
    if (!user) return;

    user.savedProperties = user.savedProperties.filter(id => id !== propertyId);
  }

  isPropertySavedByUser(userId: number, propertyId: number): boolean {
    const user = this.getUser(userId);
    if (!user) return false;

    return user.savedProperties.includes(propertyId);
  }

  // Stats methods (example)
  getPropertyStats(propertyId: number): any {
    const property = this.getProperty(propertyId);
    if (!property) return null;

    return {
      views: property.views,
      bookings: property.bookings,
      revenue: property.revenue
    };
  }

  searchProperties(query: string): Property[] {
    if (!query.trim()) return this.properties;
    
    const lowerQuery = query.toLowerCase();
    return this.properties.filter(property => 
      property.name.toLowerCase().includes(lowerQuery) ||
      property.location.toLowerCase().includes(lowerQuery) ||
      property.description.toLowerCase().includes(lowerQuery) ||
      property.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  filterPropertiesByTags(tags: string[]): Property[] {
    if (tags.length === 0) return this.properties;
    
    return this.properties.filter(property =>
      tags.some(tag => 
        property.tags.some(propertyTag => 
          propertyTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  filterPropertiesByPriceRange(minPrice: number, maxPrice: number): Property[] {
    return this.properties.filter(property => {
      const price = parseInt(property.price.replace(/[^\d]/g, ''));
      return price >= minPrice && price <= maxPrice;
    });
  }

  filterPropertiesByLocation(location: string): Property[] {
    if (!location.trim()) return this.properties;
    
    const lowerLocation = location.toLowerCase();
    return this.properties.filter(property =>
      property.location.toLowerCase().includes(lowerLocation)
    );
  }

  filterProperties(filters: {
    query?: string;
    tags?: string[];
    priceRange?: [number, number];
    location?: string;
  }): Property[] {
    let result = this.properties;

    if (filters.query) {
      result = this.searchProperties(filters.query);
    }

    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(property =>
        filters.tags!.some(tag => 
          property.tags.some(propertyTag => 
            propertyTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      result = result.filter(property => {
        const price = parseInt(property.price.replace(/[^\d]/g, ''));
        return price >= minPrice && price <= maxPrice;
      });
    }

    if (filters.location) {
      const lowerLocation = filters.location.toLowerCase();
      result = result.filter(property =>
        property.location.toLowerCase().includes(lowerLocation)
      );
    }

    return result;
  }
}

const mockDataService = new MockDataService();
export default mockDataService;
