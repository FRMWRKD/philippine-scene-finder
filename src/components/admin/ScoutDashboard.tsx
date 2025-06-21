
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Edit, Trash, Eye, Star, Calendar, DollarSign, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScoutDashboard = () => {
  const { toast } = useToast();
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const [scoutProperties, setScoutProperties] = useState([
    {
      id: 1,
      name: "Boracay Beach Resort",
      location: "Boracay, Aklan",
      category: "Beach",
      price: "₱5,000",
      status: "active",
      bookings: 24,
      rating: 4.8,
      description: "Beautiful beachfront location perfect for photoshoots",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    },
    {
      id: 2,
      name: "Baguio Mountain View",
      location: "Baguio City",
      category: "Mountain",
      price: "₱3,500",
      status: "active",
      bookings: 18,
      rating: 4.6,
      description: "Scenic mountain views with cool climate",
      image: "https://images.unsplash.com/photo-1464822759844-d150165c4795"
    },
    {
      id: 3,
      name: "Palawan Underground River",
      location: "Puerto Princesa, Palawan",
      category: "Nature",
      price: "₱4,500",
      status: "pending",
      bookings: 12,
      rating: 4.9,
      description: "Underground river with unique limestone formations",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7"
    }
  ]);

  const [scoutStats, setScoutStats] = useState({
    totalProperties: 8,
    activeBookings: 15,
    monthlyEarnings: "₱45,000",
    averageRating: 4.7
  });

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newProperty = {
      id: Date.now(),
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      description: formData.get('description') as string,
      status: "pending",
      bookings: 0,
      rating: 0,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    };
    
    setScoutProperties([...scoutProperties, newProperty]);
    setScoutStats(prev => ({ ...prev, totalProperties: prev.totalProperties + 1 }));
    setIsAddLocationOpen(false);
    toast({
      title: "Property Added",
      description: "Your new property has been added successfully.",
    });
  };

  const handleEditProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updatedProperty = {
      ...editingProperty,
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      description: formData.get('description') as string,
    };
    
    setScoutProperties(properties => 
      properties.map(p => p.id === editingProperty.id ? updatedProperty : p)
    );
    setEditingProperty(null);
    toast({
      title: "Property Updated",
      description: "Property details have been updated successfully.",
    });
  };

  const handleDeleteProperty = (propertyId: number) => {
    setScoutProperties(properties => properties.filter(p => p.id !== propertyId));
    setScoutStats(prev => ({ ...prev, totalProperties: prev.totalProperties - 1 }));
    toast({
      title: "Property Deleted",
      description: "Property has been removed from your listings.",
      variant: "destructive"
    });
  };

  const handleToggleStatus = (propertyId: number) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );
    toast({
      title: "Status Updated",
      description: "Property status has been changed.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Scout Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-coral-600">{scoutStats.totalProperties}</p>
              </div>
              <MapPin className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-coral-600">{scoutStats.activeBookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Earnings</p>
                <p className="text-2xl font-bold text-coral-600">{scoutStats.monthlyEarnings}</p>
              </div>
              <DollarSign className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-coral-600">{scoutStats.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Management */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Properties Management</CardTitle>
              <CardDescription>Add, edit, and manage your location listings</CardDescription>
            </div>
            <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
              <DialogTrigger asChild>
                <Button className="bg-coral-500 hover:bg-coral-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Property</DialogTitle>
                  <DialogDescription>Add a new location to your portfolio</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddProperty} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Property Name</Label>
                    <Input id="name" name="name" placeholder="Enter property name" required />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="City, Province" required />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beach">Beach</SelectItem>
                        <SelectItem value="Mountain">Mountain</SelectItem>
                        <SelectItem value="Nature">Nature</SelectItem>
                        <SelectItem value="Urban">Urban</SelectItem>
                        <SelectItem value="Historic">Historic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Day</Label>
                    <Input id="price" name="price" placeholder="₱0,000" required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Describe your property..." required />
                  </div>
                  <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                    Add Property
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoutProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={property.image} 
                          alt={property.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{property.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{property.category}</TableCell>
                    <TableCell className="font-medium text-coral-600">{property.price}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={property.status === "active" ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(property.id)}
                      >
                        {property.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{property.bookings}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {property.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingProperty(property)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit Property</DialogTitle>
                            </DialogHeader>
                            {editingProperty && (
                              <form onSubmit={handleEditProperty} className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-name">Property Name</Label>
                                  <Input 
                                    id="edit-name" 
                                    name="name" 
                                    defaultValue={editingProperty.name} 
                                    required 
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-location">Location</Label>
                                  <Input 
                                    id="edit-location" 
                                    name="location" 
                                    defaultValue={editingProperty.location} 
                                    required 
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-price">Price per Day</Label>
                                  <Input 
                                    id="edit-price" 
                                    name="price" 
                                    defaultValue={editingProperty.price} 
                                    required 
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-description">Description</Label>
                                  <Textarea 
                                    id="edit-description" 
                                    name="description" 
                                    defaultValue={editingProperty.description} 
                                    required 
                                  />
                                </div>
                                <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                                  Update Property
                                </Button>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoutDashboard;
