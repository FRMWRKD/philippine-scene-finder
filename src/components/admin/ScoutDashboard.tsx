import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus, Edit, Trash, Star, Calendar, DollarSign, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageGallery from "./ImageGallery";
import PropertyTagManager from "./PropertyTagManager";
import BookingManager from "./BookingManager";
import MessageCenter from "./MessageCenter";

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
}

const ScoutDashboard = () => {
  const { toast } = useToast();
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

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
  });

  const [scoutProperties, setScoutProperties] = useState<Property[]>([
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
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          title: "Main Beach View",
          description: "Stunning wide-angle view of the pristine white sand beach",
          alt: "Boracay beach main view",
          category: "exterior",
          lighting: "golden-hour",
          season: "summer",
          weather: "sunny",
          colors: ["blue", "white", "golden"],
          metaTags: ["beach", "sunset", "tropical", "paradise", "wide-shot"],
          isPrimary: true,
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
          title: "Romantic Sunset",
          description: "Perfect romantic sunset angle for wedding scenes",
          alt: "Beautiful sunset at Boracay",
          category: "exterior",
          lighting: "golden-hour",
          season: "summer",
          weather: "sunny",
          colors: ["orange", "pink", "purple"],
          metaTags: ["sunset", "romantic", "silhouette", "dramatic"],
          isPrimary: false,
        },
      ],
      features: ["Beachfront Access", "Sunset Views", "Private Beach", "Water Sports", "Restaurant"],
      tags: ["Beach", "Sunset", "Water", "Tropical", "Resort"],
      amenities: ["Parking", "WiFi", "Restrooms", "Catering Available", "Equipment Rental"],
      attachedMovies: [],
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
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1464822759844-d150165c4795",
          title: "Mountain Panorama",
          description: "Breathtaking panoramic view of the mountain range",
          alt: "Baguio mountain view",
          category: "exterior",
          lighting: "daylight",
          season: "autumn",
          weather: "cloudy",
          colors: ["green", "brown", "gray"],
          metaTags: ["mountain", "panoramic", "nature", "scenic"],
          isPrimary: true,
        },
      ],
      features: ["Mountain Views", "Cool Climate", "Pine Trees", "Hiking Trails"],
      tags: ["Mountain", "Nature", "Cool", "Pine", "Hiking"],
      amenities: ["Parking", "Guide Available", "Camping Allowed"],
      attachedMovies: [],
    },
  ]);

  const [scoutStats, setScoutStats] = useState({
    totalProperties: 8,
    activeBookings: 15,
    monthlyEarnings: "₱45,000",
    averageRating: 4.7,
  });

  // Enhanced Image Management Functions
  const handleAddDetailedImage = (propertyId: number, imageData: Omit<PropertyImage, "id">) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              images: [
                ...p.images,
                {
                  id: Date.now(),
                  ...imageData,
                },
              ],
            }
          : p
      )
    );
    toast({ title: "Image Added", description: "Detailed image has been added to the property." });
  };

  const handleDeleteImage = (propertyId: number, imageId: number) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, images: p.images.filter((img) => img.id !== imageId) } : p
      )
    );
    toast({ title: "Image Deleted", description: "Image has been removed from the property." });
  };

  const handleUpdateImage = (propertyId: number, imageId: number, updates: Partial<PropertyImage>) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId
          ? { ...p, images: p.images.map((img) => (img.id === imageId ? { ...img, ...updates } : img)) }
          : p
      )
    );
    toast({ title: "Image Updated", description: "Image details have been updated." });
  };

  const handleAddTag = (propertyId: number, tag: string) => {
    if (!tag.trim()) return;
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, tags: [...p.tags, tag.trim()] } : p
      )
    );
    toast({ title: "Tag Added", description: `Tag "${tag}" has been added.` });
  };

  const handleDeleteTag = (propertyId: number, tagIndex: number) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, tags: p.tags.filter((_, index) => index !== tagIndex) } : p
      )
    );
    toast({ title: "Tag Deleted", description: "Tag has been removed." });
  };

  const handleUpdateTag = (propertyId: number, tagIndex: number, newTag: string) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, tags: p.tags.map((tag, index) => (index === tagIndex ? newTag : tag)) } : p
      )
    );
    toast({ title: "Tag Updated", description: "Tag has been updated." });
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newProperty: Property = {
      id: Date.now(),
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      description: formData.get("description") as string,
      status: "pending",
      bookings: 0,
      rating: 0,
      images: [],
      features: [],
      tags: [],
      amenities: [],
      attachedMovies: [],
    };

    setScoutProperties([...scoutProperties, newProperty]);
    setIsAddLocationOpen(false);
    toast({
      title: "Property Added",
      description: "Your new property has been added successfully.",
    });
  };

  const handleDeleteProperty = (propertyId: number) => {
    setScoutProperties((properties) => properties.filter((p) => p.id !== propertyId));
    toast({
      title: "Property Deleted",
      description: "Property has been removed from your listings.",
      variant: "destructive",
    });
  };

  const handleToggleStatus = (propertyId: number) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p
      )
    );
    toast({
      title: "Status Updated",
      description: "Property status has been changed.",
    });
  };

  const handleAddImage = (propertyId: number, imageData: Omit<PropertyImage, "id">) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              images: [...p.images, { id: Date.now(), ...imageData }],
            }
          : p
      )
    );
    toast({ title: "Image Added", description: "Image has been added to the property." });
  };

  const handleUpdateImage = (propertyId: number, imageId: number, updates: Partial<PropertyImage>) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId
          ? { ...p, images: p.images.map((img) => (img.id === imageId ? { ...img, ...updates } : img)) }
          : p
      )
    );
    toast({ title: "Image Updated", description: "Image details have been updated." });
  };

  const handleDeleteImage = (propertyId: number, imageId: number) => {
    setScoutProperties((properties) =>
      properties.map((p) =>
        p.id === propertyId ? { ...p, images: p.images.filter((img) => img.id !== imageId) } : p
      )
    );
    toast({ title: "Image Deleted", description: "Image has been removed from the property." });
  };

  return (
    <div className="space-y-6">
      {/* Scout Profile Management */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-coral-500" />
              Scout Profile
            </CardTitle>
            <Button className="bg-coral-500 hover:bg-coral-600">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
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
              <div className="text-sm">
                <strong>Website:</strong> {scoutProfile.website}
              </div>
              <div className="text-sm">
                <strong>Instagram:</strong> {scoutProfile.instagram}
              </div>
              <div className="text-sm">
                <strong>YouTube:</strong> {scoutProfile.youtube}
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

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          {/* Properties Management */}
          <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Property Management</CardTitle>
                  <CardDescription>Manage your location properties and their details</CardDescription>
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
                      <CardDescription>Add a new location to your portfolio</CardDescription>
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
                            src={property.images[0]?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
                            alt={property.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="text-lg font-semibold">{property.name}</h4>
                            <p className="text-gray-600">{property.location}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={property.status === "active" ? "default" : "secondary"}>{property.status}</Badge>
                              <span className="text-coral-600 font-semibold">{property.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleToggleStatus(property.id)}>
                            Toggle Status
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteProperty(property.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="images" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="images">Images ({property.images.length})</TabsTrigger>
                          <TabsTrigger value="tags">Tags ({property.tags.length})</TabsTrigger>
                          <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="images">
                          <ImageGallery
                            propertyId={property.id}
                            images={property.images}
                            onAddImage={handleAddImage}
                            onUpdateImage={handleUpdateImage}
                            onDeleteImage={handleDeleteImage}
                          />
                        </TabsContent>

                        <TabsContent value="tags">
                          <PropertyTagManager
                            propertyId={property.id}
                            tags={property.tags}
                            onAddTag={handleAddTag}
                            onDeleteTag={handleDeleteTag}
                            onUpdateTag={handleUpdateTag}
                          />
                        </TabsContent>

                        <TabsContent value="details" className="space-y-4">
                          <div>
                            <Label>Description</Label>
                            <Textarea 
                              defaultValue={property.description}
                              className="mt-2"
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Features</Label>
                              <div className="space-y-2 mt-2">
                                {property.features.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Input defaultValue={feature} />
                                    <Button size="sm" variant="destructive">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button size="sm" variant="outline">
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Feature
                                </Button>
                              </div>
                            </div>
                            <div>
                              <Label>Amenities</Label>
                              <div className="space-y-2 mt-2">
                                {property.amenities.map((amenity, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Input defaultValue={amenity} />
                                    <Button size="sm" variant="destructive">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button size="sm" variant="outline">
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Amenity
                                </Button>
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
        </TabsContent>

        <TabsContent value="bookings">
          <BookingManager />
        </TabsContent>

        <TabsContent value="messages">
          <MessageCenter />
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Professional Profile</CardTitle>
              <CardDescription>Manage your scout profile and social media presence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500">Profile editing form will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScoutDashboard;
