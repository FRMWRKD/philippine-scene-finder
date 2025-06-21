
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
import { MapPin, Plus, Edit, Trash, Star, Calendar, DollarSign, User, Images, Link, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScoutDashboard = () => {
  const { toast } = useToast();
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [editingImages, setEditingImages] = useState<any>(null);
  const [editingFeatures, setEditingFeatures] = useState<any>(null);

  const [scoutProfile, setScoutProfile] = useState({
    name: "Maria Santos",
    bio: "Professional location scout with 10+ years experience in the Philippines film industry",
    email: "maria@example.com",
    phone: "+63 917 123 4567",
    website: "www.mariascout.com",
    instagram: "@mariascout",
    facebook: "Maria Santos Location Scout",
    linkedin: "maria-santos-scout",
    youtube: "Maria Santos Films",
    experience: "10 years",
    specialty: "Beach & Mountain Locations",
    filmography: [
      { title: "Island Paradise", year: "2023", role: "Location Scout" },
      { title: "Mountain Dreams", year: "2022", role: "Assistant Location Manager" },
      { title: "Coastal Journey", year: "2021", role: "Location Scout" }
    ],
    awards: ["Best Location Scout 2023", "Outstanding Service Award 2022"]
  });

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
      description: "Beautiful beachfront location perfect for photoshoots and film productions",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
        "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4"
      ],
      features: ["Beachfront Access", "Sunset Views", "Private Beach", "Water Sports", "Restaurant"],
      tags: ["Beach", "Sunset", "Water", "Tropical", "Resort"],
      amenities: ["Parking", "WiFi", "Restrooms", "Catering Available", "Equipment Rental"],
      filmAppearances: ["Island Paradise (2023)", "Tropical Dreams (2022)"]
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
      description: "Scenic mountain views with cool climate and pine forests",
      images: [
        "https://images.unsplash.com/photo-1464822759844-d150165c4795",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
      ],
      features: ["Mountain Views", "Cool Climate", "Pine Trees", "Hiking Trails"],
      tags: ["Mountain", "Nature", "Cool", "Pine", "Hiking"],
      amenities: ["Parking", "Guide Available", "Camping Allowed"],
      filmAppearances: ["Mountain Dreams (2022)"]
    }
  ]);

  const [scoutStats, setScoutStats] = useState({
    totalProperties: 8,
    activeBookings: 15,
    monthlyEarnings: "₱45,000",
    averageRating: 4.7
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updatedProfile = {
      ...scoutProfile,
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      website: formData.get('website') as string,
      instagram: formData.get('instagram') as string,
      facebook: formData.get('facebook') as string,
      linkedin: formData.get('linkedin') as string,
      youtube: formData.get('youtube') as string,
      experience: formData.get('experience') as string,
      specialty: formData.get('specialty') as string,
    };
    setScoutProfile(updatedProfile);
    setIsProfileEditOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your scout profile has been updated successfully.",
    });
  };

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
      images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4"],
      features: [],
      tags: [],
      amenities: [],
      filmAppearances: []
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

  const handleUpdateImages = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const imageUrls = (formData.get('images') as string).split('\n').filter(url => url.trim());
    
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === editingImages.id ? { ...p, images: imageUrls } : p
      )
    );
    setEditingImages(null);
    toast({
      title: "Images Updated",
      description: "Property images have been updated successfully.",
    });
  };

  const handleUpdateFeatures = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const features = (formData.get('features') as string).split(',').map(f => f.trim()).filter(f => f);
    const tags = (formData.get('tags') as string).split(',').map(t => t.trim()).filter(t => t);
    const amenities = (formData.get('amenities') as string).split(',').map(a => a.trim()).filter(a => a);
    const filmAppearances = (formData.get('filmAppearances') as string).split(',').map(f => f.trim()).filter(f => f);
    
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === editingFeatures.id ? { 
          ...p, 
          features, 
          tags, 
          amenities, 
          filmAppearances 
        } : p
      )
    );
    setEditingFeatures(null);
    toast({
      title: "Features Updated",
      description: "Property features and details have been updated successfully.",
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
      {/* Scout Profile Management */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-coral-500" />
              Scout Profile Management
            </CardTitle>
            <Dialog open={isProfileEditOpen} onOpenChange={setIsProfileEditOpen}>
              <DialogTrigger asChild>
                <Button className="bg-coral-500 hover:bg-coral-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Scout Profile</DialogTitle>
                  <DialogDescription>Update your professional profile and social media</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" defaultValue={scoutProfile.name} />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input id="experience" name="experience" defaultValue={scoutProfile.experience} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea id="bio" name="bio" defaultValue={scoutProfile.bio} rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Specialty/Focus</Label>
                    <Input id="specialty" name="specialty" defaultValue={scoutProfile.specialty} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" defaultValue={scoutProfile.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" defaultValue={scoutProfile.phone} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" defaultValue={scoutProfile.website} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" name="instagram" defaultValue={scoutProfile.instagram} />
                    </div>
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" name="facebook" defaultValue={scoutProfile.facebook} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input id="linkedin" name="linkedin" defaultValue={scoutProfile.linkedin} />
                    </div>
                    <div>
                      <Label htmlFor="youtube">YouTube Channel</Label>
                      <Input id="youtube" name="youtube" defaultValue={scoutProfile.youtube} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                    Update Profile
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">{scoutProfile.name}</h4>
                <p className="text-sm text-gray-600">{scoutProfile.specialty}</p>
                <p className="text-sm text-gray-500">{scoutProfile.experience} experience</p>
              </div>
              <p className="text-sm text-gray-700">{scoutProfile.bio}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{scoutProfile.website}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Instagram:</span>
                <span className="text-sm text-gray-600">{scoutProfile.instagram}</span>
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="h-4 w-4 text-red-500" />
                <span className="text-sm">{scoutProfile.youtube}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <CardDescription>Complete control over your property listings</CardDescription>
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
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoutProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={property.images[0]} 
                          alt={property.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{property.name}</p>
                          <p className="text-sm text-gray-500">{property.location}</p>
                          <p className="text-sm font-medium text-coral-600">{property.price}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm"><span className="font-medium">Category:</span> {property.category}</p>
                        <p className="text-sm"><span className="font-medium">Features:</span> {property.features.length}</p>
                        <p className="text-sm"><span className="font-medium">Images:</span> {property.images.length}</p>
                        <p className="text-sm"><span className="font-medium">Tags:</span> {property.tags.length}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={property.status === "active" ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(property.id)}
                      >
                        {property.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">Bookings: {property.bookings}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{property.rating}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
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
                              <DialogTitle>Edit Property Details</DialogTitle>
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
                                  <Label htmlFor="edit-category">Category</Label>
                                  <Select name="category" defaultValue={editingProperty.category}>
                                    <SelectTrigger>
                                      <SelectValue />
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

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingImages(property)}
                            >
                              <Images className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Manage Property Images</DialogTitle>
                              <DialogDescription>Add or update property images (one URL per line)</DialogDescription>
                            </DialogHeader>
                            {editingImages && (
                              <form onSubmit={handleUpdateImages} className="space-y-4">
                                <div>
                                  <Label htmlFor="images">Image URLs</Label>
                                  <Textarea 
                                    id="images" 
                                    name="images" 
                                    defaultValue={editingImages.images.join('\n')}
                                    rows={6}
                                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                                  />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  {editingImages.images.map((img: string, idx: number) => (
                                    <img 
                                      key={idx}
                                      src={img} 
                                      alt={`Preview ${idx + 1}`}
                                      className="w-full h-20 object-cover rounded"
                                    />
                                  ))}
                                </div>
                                <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                                  Update Images
                                </Button>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingFeatures(property)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Manage Features & Details</DialogTitle>
                              <DialogDescription>Update features, tags, amenities, and film appearances</DialogDescription>
                            </DialogHeader>
                            {editingFeatures && (
                              <form onSubmit={handleUpdateFeatures} className="space-y-4">
                                <div>
                                  <Label htmlFor="features">Features (comma-separated)</Label>
                                  <Textarea 
                                    id="features" 
                                    name="features" 
                                    defaultValue={editingFeatures.features.join(', ')}
                                    placeholder="Beachfront Access, Sunset Views, Private Beach"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                                  <Textarea 
                                    id="tags" 
                                    name="tags" 
                                    defaultValue={editingFeatures.tags.join(', ')}
                                    placeholder="Beach, Sunset, Water, Tropical"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                                  <Textarea 
                                    id="amenities" 
                                    name="amenities" 
                                    defaultValue={editingFeatures.amenities.join(', ')}
                                    placeholder="Parking, WiFi, Restrooms, Catering Available"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="filmAppearances">Film Appearances (comma-separated)</Label>
                                  <Textarea 
                                    id="filmAppearances" 
                                    name="filmAppearances" 
                                    defaultValue={editingFeatures.filmAppearances.join(', ')}
                                    placeholder="Movie Title (2023), TV Show (2022)"
                                  />
                                </div>
                                <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600">
                                  Update Features
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
