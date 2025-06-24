
import mockDataService from '../services/mockDataService';

// Export the original mockLocations for backward compatibility
export const mockLocations = mockDataService.getProperties().map(property => ({
  id: property.id.toString(),
  title: property.name,
  heroImage: property.images[0]?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  gallery: property.images.slice(1).map(img => img.url),
  tags: property.tags,
  price: parseInt(property.price.replace(/[^\d]/g, '')),
  location: property.location,
  rating: property.rating,
  reviews: property.bookings,
  metadata: {
    sizeM2: property.metadata.sizeM2,
    powerAmps: property.metadata.powerAmps,
    maxCrew: property.metadata.maxCrew,
    parking: property.metadata.parking
  }
}));

// Debug log to check data
console.log('Mock locations loaded:', mockLocations.length, 'locations');
console.log('Sample location:', mockLocations[0]);

// Export the service for direct access
export { default as mockDataService } from '../services/mockDataService';
