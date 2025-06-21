import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { MapPin, Search, Filter, Grid, List, Plus, Calendar, DollarSign, User, MessageSquare, Star, Edit, Trash, Eye } from "lucide-react";
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
  
  // View and pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Message pagination
  const [messageCurrentPage, setMessageCurrentPage] = useState(1);
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [messageStatusFilter, setMessageStatusFilter] = useState("all");

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

  // Image Management Functions
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

  // Tag Management Functions
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

  // Property Management Functions
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

  // Property filtering and pagination
  const filteredProperties = scoutProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || property.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    let aValue = a[sortBy as keyof Property];
    let bValue = b[sortBy as keyof Property];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const PropertyListView = () => (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProperties.map((property, index) => (
            <TableRow key={property.id} className="hover:bg-muted/50">
              <TableCell className="font-mono text-sm">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={property.images[0]?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
                    alt={property.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-medium">{property.name}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {property.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{property.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={property.status === "active" ? "default" : "secondary"}>
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-coral-600">
                {property.price}
              </TableCell>
              <TableCell>
                <span className="text-sm bg-muted px-2 py-1 rounded">
                  {property.images.length}
                </span>
              </TableCell>
              <TableCell>{property.bookings}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{property.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteProperty(property.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedProperties.length)} of {sortedProperties.length} properties
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                return (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );

  const PropertyGridView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-md transition-shadow">
            <div className="aspect-video relative">
              <img
                src={property.images[0]?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
                alt={property.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <Badge 
                className={`absolute top-2 right-2 ${property.status === "active" ? "bg-green-500" : "bg-gray-500"}`}
              >
                {property.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold truncate">{property.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {property.location}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-semibold text-coral-600">{property.price}</span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{property.images.length} images</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {property.rating}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                return (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Compact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Properties</p>
              <p className="text-2xl font-bold text-coral-600">{scoutStats.totalProperties}</p>
            </div>
            <MapPin className="h-6 w-6 text-coral-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bookings</p>
              <p className="text-2xl font-bold text-coral-600">{scoutStats.activeBookings}</p>
            </div>
            <Calendar className="h-6 w-6 text-coral-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Earnings</p>
              <p className="text-2xl font-bold text-coral-600">{scoutStats.monthlyEarnings}</p>
            </div>
            <DollarSign className="h-6 w-6 text-coral-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="text-2xl font-bold text-coral-600">{scoutStats.averageRating}</p>
            </div>
            <Star className="h-6 w-6 text-coral-500" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList>
          <TabsTrigger value="properties">Properties ({filteredProperties.length})</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          {/* Advanced Filters and Controls */}
          <Card className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Property Management</h3>
                <Button className="bg-coral-500 hover:bg-coral-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Beach">Beach</SelectItem>
                      <SelectItem value="Mountain">Mountain</SelectItem>
                      <SelectItem value="Urban">Urban</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="bookings">Bookings</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {viewMode === "list" ? <PropertyListView /> : <PropertyGridView />}
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
