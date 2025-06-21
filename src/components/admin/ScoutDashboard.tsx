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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus, Edit, Trash, Star, Calendar, DollarSign, User, Images, Link, Youtube, Film, Tag, X, MoveUp, MoveDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PropertyImage {
  id: number;
  url: string;
  description: string;
  alt: string;
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

const ScoutDashboard = () => {
  const { toast } = useToast();
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [managingImages, setManagingImages] = useState<any>(null);
  const [managingTags, setManagingTags] = useState<any>(null);
  const [managingMovies, setManagingMovies] = useState<any>(null);
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
        { id: 1, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", description: "Main beach view", alt: "Boracay beach main view" },
        { id: 2, url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5", description: "Sunset angle", alt: "Beautiful sunset at Boracay" },
        { id: 3, url: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4", description: "Resort facilities", alt: "Resort amenities and facilities" }
      ] as PropertyImage[],
      features: ["Beachfront Access", "Sunset Views", "Private Beach", "Water Sports", "Restaurant"],
      tags: ["Beach", "Sunset", "Water", "Tropical", "Resort"],
      amenities: ["Parking", "WiFi", "Restrooms", "Catering Available", "Equipment Rental"],
      attachedMovies: [
        { id: 1, title: "Island Paradise", year: "2023", role: "Main Location", description: "Primary filming location for beach scenes", genre: "Romance", director: "Juan Dela Cruz", imdbUrl: "https://imdb.com/title/123", trailerUrl: "https://youtube.com/watch?v=123" },
        { id: 2, title: "Tropical Dreams", year: "2022", role: "Supporting Location", description: "Used for sunset romantic scenes", genre: "Drama", director: "Maria Garcia" }
      ] as AttachedMovie[]
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
        { id: 4, url: "https://images.unsplash.com/photo-1464822759844-d150165c4795", description: "Mountain panorama", alt: "Baguio mountain view" },
        { id: 5, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", description: "Pine forest area", alt: "Pine trees in Baguio" }
      ] as PropertyImage[],
      features: ["Mountain Views", "Cool Climate", "Pine Trees", "Hiking Trails"],
      tags: ["Mountain", "Nature", "Cool", "Pine", "Hiking"],
      amenities: ["Parking", "Guide Available", "Camping Allowed"],
      attachedMovies: [
        { id: 3, title: "Mountain Dreams", year: "2022", role: "Main Location", description: "Featured throughout the film", genre: "Adventure", director: "Pedro Santos" }
      ] as AttachedMovie[]
    }
  ]);

  const [scoutStats, setScoutStats] = useState({
    totalProperties: 8,
    activeBookings: 15,
    monthlyEarnings: "₱45,000",
    averageRating: 4.7
  });

  // Image Management Functions
  const handleAddImage = (propertyId: number, imageData: { url: string; description: string; alt: string }) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, images: [...p.images, { id: Date.now(), ...imageData }] }
          : p
      )
    );
    toast({ title: "Image Added", description: "New image has been added to the property." });
  };

  const handleDeleteImage = (propertyId: number, imageId: number) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, images: p.images.filter(img => img.id !== imageId) }
          : p
      )
    );
    toast({ title: "Image Deleted", description: "Image has been removed from the property." });
  };

  const handleUpdateImage = (propertyId: number, imageId: number, updates: Partial<PropertyImage>) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, images: p.images.map(img => img.id === imageId ? { ...img, ...updates } : img) }
          : p
      )
    );
    toast({ title: "Image Updated", description: "Image details have been updated." });
  };

  const handleMoveImage = (propertyId: number, imageId: number, direction: 'up' | 'down') => {
    setScoutProperties(properties => 
      properties.map(p => {
        if (p.id === propertyId) {
          const images = [...p.images];
          const index = images.findIndex(img => img.id === imageId);
          if (index === -1) return p;
          
          const newIndex = direction === 'up' ? index - 1 : index + 1;
          if (newIndex < 0 || newIndex >= images.length) return p;
          
          [images[index], images[newIndex]] = [images[newIndex], images[index]];
          return { ...p, images };
        }
        return p;
      })
    );
    toast({ title: "Image Reordered", description: `Image moved ${direction}.` });
  };

  // Tag Management Functions
  const handleAddTag = (propertyId: number, tag: string) => {
    if (!tag.trim()) return;
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, tags: [...p.tags, tag.trim()] }
          : p
      )
    );
    toast({ title: "Tag Added", description: `Tag "${tag}" has been added.` });
  };

  const handleDeleteTag = (propertyId: number, tagIndex: number) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, tags: p.tags.filter((_, index) => index !== tagIndex) }
          : p
      )
    );
    toast({ title: "Tag Deleted", description: "Tag has been removed." });
  };

  const handleUpdateTag = (propertyId: number, tagIndex: number, newTag: string) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, tags: p.tags.map((tag, index) => index === tagIndex ? newTag : tag) }
          : p
      )
    );
    toast({ title: "Tag Updated", description: "Tag has been updated." });
  };

  // Movie Management Functions
  const handleAddMovie = (propertyId: number, movieData: Omit<AttachedMovie, 'id'>) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, attachedMovies: [...(p.attachedMovies || []), { id: Date.now(), ...movieData }] }
          : p
      )
    );
    toast({ title: "Movie Added", description: "Movie has been attached to the property." });
  };

  const handleDeleteMovie = (propertyId: number, movieId: number) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { ...p, attachedMovies: (p.attachedMovies || []).filter(movie => movie.id !== movieId) }
          : p
      )
    );
    toast({ title: "Movie Removed", description: "Movie has been removed from the property." });
  };

  const handleUpdateMovie = (propertyId: number, movieId: number, updates: Partial<AttachedMovie>) => {
    setScoutProperties(properties => 
      properties.map(p => 
        p.id === propertyId 
          ? { 
              ...p, 
              attachedMovies: (p.attachedMovies || []).map(movie => 
                movie.id === movieId ? { ...movie, ...updates } : movie
              ) 
            }
          : p
      )
    );
    toast({ title: "Movie Updated", description: "Movie details have been updated." });
  };

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

      {/* Enhanced Properties Management */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Advanced Property Management</CardTitle>
              <CardDescription>Complete control over every property detail</CardDescription>
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
          <div className="space-y-6">
            {scoutProperties.map((property) => (
              <Card key={property.id} className="border-2 border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={property.images[0]?.url} 
                        alt={property.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-lg font-semibold">{property.name}</h4>
                        <p className="text-gray-600">{property.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={property.status === "active" ? "default" : "secondary"}>
                            {property.status}
                          </Badge>
                          <span className="text-coral-600 font-semibold">{property.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingProperty(property)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleStatus(property.id)}
                      >
                        Toggle Status
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="images" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="images">Images ({property.images.length})</TabsTrigger>
                      <TabsTrigger value="tags">Tags ({property.tags.length})</TabsTrigger>
                      <TabsTrigger value="movies">Movies ({(property.attachedMovies || []).length})</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="images" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Property Images</h5>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Image
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Image</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target as HTMLFormElement);
                              handleAddImage(property.id, {
                                url: formData.get('url') as string,
                                description: formData.get('description') as string,
                                alt: formData.get('alt') as string,
                              });
                              (e.target as HTMLFormElement).reset();
                            }} className="space-y-4">
                              <div>
                                <Label htmlFor="url">Image URL</Label>
                                <Input name="url" placeholder="https://..." required />
                              </div>
                              <div>
                                <Label htmlFor="description">Description</Label>
                                <Input name="description" placeholder="Brief description" required />
                              </div>
                              <div>
                                <Label htmlFor="alt">Alt Text</Label>
                                <Input name="alt" placeholder="Alt text for accessibility" required />
                              </div>
                              <Button type="submit" className="w-full">Add Image</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {property.images.map((image, index) => (
                          <Card key={image.id} className="p-4">
                            <img src={image.url} alt={image.alt} className="w-full h-32 object-cover rounded mb-2" />
                            <div className="space-y-2">
                              <Input 
                                defaultValue={image.description}
                                onBlur={(e) => handleUpdateImage(property.id, image.id, { description: e.target.value })}
                                placeholder="Image description"
                              />
                              <Input 
                                defaultValue={image.alt}
                                onBlur={(e) => handleUpdateImage(property.id, image.id, { alt: e.target.value })}
                                placeholder="Alt text"
                              />
                              <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleMoveImage(property.id, image.id, 'up')}
                                    disabled={index === 0}
                                  >
                                    <MoveUp className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleMoveImage(property.id, image.id, 'down')}
                                    disabled={index === property.images.length - 1}
                                  >
                                    <MoveDown className="h-3 w-3" />
                                  </Button>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleDeleteImage(property.id, image.id)}
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="tags" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Property Tags</h5>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="New tag..." 
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddTag(property.id, e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                              handleAddTag(property.id, input.value);
                              input.value = '';
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {property.tags.map((tag, index) => (
                          <div key={index} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                            <Input 
                              defaultValue={tag}
                              className="border-none bg-transparent p-0 h-auto text-sm min-w-0 w-auto"
                              onBlur={(e) => handleUpdateTag(property.id, index, e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-red-100"
                              onClick={() => handleDeleteTag(property.id, index)}
                            >
                              <X className="h-3 w-3 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="movies" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Attached Movies/Films</h5>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Film className="h-4 w-4 mr-1" />
                              Attach Movie
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Attach Movie/Film</DialogTitle>
                              <DialogDescription>Add details about movies filmed at this location</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target as HTMLFormElement);
                              handleAddMovie(property.id, {
                                title: formData.get('title') as string,
                                year: formData.get('year') as string,
                                role: formData.get('role') as string,
                                description: formData.get('description') as string,
                                genre: formData.get('genre') as string,
                                director: formData.get('director') as string,
                                imdbUrl: formData.get('imdbUrl') as string,
                                trailerUrl: formData.get('trailerUrl') as string,
                              });
                              (e.target as HTMLFormElement).reset();
                            }} className="space-y-4 grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="title">Movie Title</Label>
                                <Input name="title" required />
                              </div>
                              <div>
                                <Label htmlFor="year">Release Year</Label>
                                <Input name="year" required />
                              </div>
                              <div>
                                <Label htmlFor="director">Director</Label>
                                <Input name="director" required />
                              </div>
                              <div>
                                <Label htmlFor="genre">Genre</Label>
                                <Input name="genre" required />
                              </div>
                              <div>
                                <Label htmlFor="role">Location Role</Label>
                                <Select name="role" required>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Main Location">Main Location</SelectItem>
                                    <SelectItem value="Supporting Location">Supporting Location</SelectItem>
                                    <SelectItem value="Background Location">Background Location</SelectItem>
                                    <SelectItem value="Cameo Appearance">Cameo Appearance</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="imdbUrl">IMDB URL (Optional)</Label>
                                <Input name="imdbUrl" placeholder="https://imdb.com/..." />
                              </div>
                              <div className="col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea name="description" placeholder="How was this location used in the film?" required />
                              </div>
                              <div className="col-span-2">
                                <Label htmlFor="trailerUrl">Trailer URL (Optional)</Label>
                                <Input name="trailerUrl" placeholder="https://youtube.com/..." />
                              </div>
                              <Button type="submit" className="col-span-2">Attach Movie</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="space-y-3">
                        {(property.attachedMovies || []).map((movie) => (
                          <Card key={movie.id} className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <h6 className="font-semibold text-lg">{movie.title} ({movie.year})</h6>
                                  <Badge variant="outline">{movie.role}</Badge>
                                </div>
                                <p className="text-sm text-gray-600"><strong>Director:</strong> {movie.director}</p>
                                <p className="text-sm text-gray-600"><strong>Genre:</strong> {movie.genre}</p>
                                <p className="text-sm">{movie.description}</p>
                                {movie.imdbUrl && (
                                  <a href={movie.imdbUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline">
                                    View on IMDB
                                  </a>
                                )}
                                {movie.trailerUrl && (
                                  <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" className="text-red-500 text-sm hover:underline ml-4">
                                    Watch Trailer
                                  </a>
                                )}
                              </div>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteMovie(property.id, movie.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="features" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>Features</Label>
                          <div className="space-y-2 mt-2">
                            {property.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input 
                                  defaultValue={feature}
                                  onBlur={(e) => {
                                    const newFeatures = [...property.features];
                                    newFeatures[index] = e.target.value;
                                    setScoutProperties(props => 
                                      props.map(p => p.id === property.id ? { ...p, features: newFeatures } : p)
                                    );
                                  }}
                                />
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => {
                                    const newFeatures = property.features.filter((_, i) => i !== index);
                                    setScoutProperties(props => 
                                      props.map(p => p.id === property.id ? { ...p, features: newFeatures } : p)
                                    );
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Amenities</Label>
                          <div className="space-y-2 mt-2">
                            {property.amenities.map((amenity, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input 
                                  defaultValue={amenity}
                                  onBlur={(e) => {
                                    const newAmenities = [...property.amenities];
                                    newAmenities[index] = e.target.value;
                                    setScoutProperties(props => 
                                      props.map(p => p.id === property.id ? { ...p, amenities: newAmenities } : p)
                                    );
                                  }}
                                />
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => {
                                    const newAmenities = property.amenities.filter((_, i) => i !== index);
                                    setScoutProperties(props => 
                                      props.map(p => p.id === property.id ? { ...p, amenities: newAmenities } : p)
                                    );
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoutDashboard;
