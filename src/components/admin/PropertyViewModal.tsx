
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, DollarSign, Eye, Users } from "lucide-react";

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
  features: string[];
  tags: string[];
  amenities: string[];
  views?: number;
  revenue?: string;
  lastUpdated?: string;
}

interface PropertyViewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const PropertyViewModal = ({ property, isOpen, onClose, onEdit }: PropertyViewModalProps) => {
  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{property.name}</span>
            <Badge variant={property.status === "active" ? "default" : "secondary"}>
              {property.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{property.price}/day</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.bookings} bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{property.rating} rating</span>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{property.revenue}</div>
              <div className="text-xs text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{property.views?.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{((property.bookings / (property.views || 1)) * 100).toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Conversion Rate</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{property.description}</p>
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <Badge variant="outline">{property.category}</Badge>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {property.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-medium mb-2">Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-medium mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-1">
              {property.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button onClick={onEdit}>Edit Property</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyViewModal;
