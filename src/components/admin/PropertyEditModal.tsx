
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: number;
  name: string;
  location: string;
  category: string;
  price: string;
  status: string;
  description: string;
  features: string[];
  tags: string[];
  amenities: string[];
}

interface PropertyEditModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (propertyId: number, updates: Partial<Property>) => void;
}

const PropertyEditModal = ({ property, isOpen, onClose, onSave }: PropertyEditModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Property>>({});
  const [newFeature, setNewFeature] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newAmenity, setNewAmenity] = useState("");

  const handleSave = () => {
    if (!property) return;
    
    onSave(property.id, formData);
    toast({ title: "Property Updated", description: "Changes have been saved successfully." });
    onClose();
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData(prev => ({
      ...prev,
      features: [...(prev.features || property?.features || []), newFeature.trim()]
    }));
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: (prev.features || property?.features || []).filter((_, i) => i !== index)
    }));
  };

  if (!property) return null;

  const currentFeatures = formData.features || property.features;
  const currentTags = formData.tags || property.tags;
  const currentAmenities = formData.amenities || property.amenities;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property: {property.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Property Name</label>
              <Input
                defaultValue={property.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                defaultValue={property.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                defaultValue={property.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beach">Beach</SelectItem>
                  <SelectItem value="Mountain">Mountain</SelectItem>
                  <SelectItem value="Urban">Urban</SelectItem>
                  <SelectItem value="Nature">Nature</SelectItem>
                  <SelectItem value="Historical">Historical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Price per Day</label>
              <Input
                defaultValue={property.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              defaultValue={property.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Features</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addFeature()}
              />
              <Button size="sm" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {currentFeatures.map((feature, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeFeature(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyEditModal;
