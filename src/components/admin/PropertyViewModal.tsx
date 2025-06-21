import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Edit, Calendar, DollarSign, Eye } from "lucide-react";
import ImageGallery from "./ImageGallery";

interface PropertyImage {
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

interface AttachedMovie {
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

interface Property {
  id: number;
  name: string;
  location: string;
  category: string;
  price: string;
  status: string;
  bookings: number;
  rating: number;
  description: string;
  images: PropertyImage[];
  features: string[];
  tags: string[];
  amenities: string[];
  attachedMovies: AttachedMovie[];
  lastUpdated?: string;
  views?: number;
  revenue?: string;
}

interface PropertyViewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onAddImage: (propertyId: number, imageData: Omit<PropertyImage, "id">) => void;
  onUpdateImage: (propertyId: number, imageId: number, updates: Partial<PropertyImage>) => void;
  onDeleteImage: (propertyId: number, imageId: number) => void;
}

const PropertyViewModal = ({ property, isOpen, onClose, onEdit, onAddImage, onUpdateImage, onDeleteImage }: PropertyViewModalProps) => {
  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-coral-500" />
              {property.name}
            </DialogTitle>
            <Button onClick={onEdit} className="bg-coral-500 hover:bg-coral-600">
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-lg">{property.location}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Price</span>
                </div>
                <p className="text-lg font-bold text-coral-600">{property.price}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <p className="text-lg">{property.rating}/5</p>
              </CardContent>
            </Card>
          </div>

          {/* Status and Metrics */}
          <div className="flex flex-wrap gap-4">
            <Badge variant={property.status === "active" ? "default" : "secondary"}>
              {property.status}
            </Badge>
            <Badge variant="outline">{property.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              {property.views?.toLocaleString() || 0} views
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {property.bookings} bookings
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <Badge key={index} variant="outline">{feature}</Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery
            propertyId={property.id}
            images={property.images}
            onAddImage={onAddImage}
            onUpdateImage={onUpdateImage}
            onDeleteImage={onDeleteImage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyViewModal;
