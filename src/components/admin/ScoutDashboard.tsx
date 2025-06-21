import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MapPin, Search, Filter, Grid, List, Plus, Calendar, DollarSign, User, MessageSquare, Star, Edit, Trash, Eye, Download, Upload, MoreHorizontal, Copy, Archive, Zap, TrendingUp, Clock, CheckSquare } from "lucide-react";
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
  lastUpdated?: string;
  views?: number;
  revenue?: string;
}

const ScoutDashboard = () => {
  const { toast } = useToast();
  
  // Enhanced state management
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [quickFilters, setQuickFilters] = useState({
    highPerforming: false,
    needsAttention: false,
    recentlyAdded: false,
  });

  // Advanced filtering states
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [ratingFilter, setRatingFilter] = useState("all");
  const [bookingsFilter, setBookingsFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // Message pagination
  const [messageCurrentPage, setMessageCurrentPage] = useState(1);
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [messageStatusFilter, setMessageStatusFilter] = useState("all");

  // Enhanced mock data with performance metrics
  const [scoutProperties, setScoutProperties] = useState<Property[]>([
    {
      id: 1,
      name: "Boracay Beach Resort",
      location: "Boracay, Aklan",
      category: "Beach",
      price: "₱5,000",
      status: "active",
      bookings: 156,
      rating: 4.8,
      description: "Beautiful beachfront location perfect for photoshoots and film productions",
      lastUpdated: "2024-01-15",
      views: 2847,
      revenue: "₱780,000",
      images: [],
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
      bookings: 89,
      rating: 4.6,
      description: "Scenic mountain views with cool climate and pine forests",
      lastUpdated: "2024-01-10",
      views: 1453,
      revenue: "₱311,500",
      images: [],
      features: ["Mountain Views", "Cool Climate", "Pine Trees", "Hiking Trails"],
      tags: ["Mountain", "Nature", "Cool", "Pine", "Hiking"],
      amenities: ["Parking", "Guide Available", "Camping Allowed"],
      attachedMovies: [],
    },
    // Add more mock data to simulate thousands of properties
  ]);

  const [scoutStats, setScoutStats] = useState({
    totalProperties: 2847,
    activeBookings: 423,
    monthlyEarnings: "₱2,450,000",
    averageRating: 4.7,
    totalViews: 156789,
    conversionRate: "12.3%",
    responseTime: "2.1 hrs",
    topCategory: "Beach",
  });

  // Enhanced filtering with performance optimization
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = scoutProperties.filter(property => {
      const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || property.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || property.category === categoryFilter;
      
      const matchesPrice = (!priceRange.min || parseFloat(property.price.replace(/[^\d]/g, '')) >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || parseFloat(property.price.replace(/[^\d]/g, '')) <= parseFloat(priceRange.max));
      
      const matchesRating = ratingFilter === "all" || 
                           (ratingFilter === "high" && property.rating >= 4.5) ||
                           (ratingFilter === "medium" && property.rating >= 3.5 && property.rating < 4.5) ||
                           (ratingFilter === "low" && property.rating < 3.5);
      
      const matchesBookings = bookingsFilter === "all" ||
                             (bookingsFilter === "high" && property.bookings >= 100) ||
                             (bookingsFilter === "medium" && property.bookings >= 50 && property.bookings < 100) ||
                             (bookingsFilter === "low" && property.bookings < 50);

      // Quick filters
      if (quickFilters.highPerforming && (property.rating < 4.5 || property.bookings < 100)) return false;
      if (quickFilters.needsAttention && (property.rating >= 4.0 && property.bookings >= 50)) return false;
      if (quickFilters.recentlyAdded && property.lastUpdated && 
          new Date(property.lastUpdated) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) return false;

      return matchesSearch && matchesStatus && matchesCategory && matchesPrice && matchesRating && matchesBookings;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Property];
      let bValue: any = b[sortBy as keyof Property];
      
      if (sortBy === "price") {
        aValue = parseFloat(String(aValue).replace(/[^\d]/g, ''));
        bValue = parseFloat(String(bValue).replace(/[^\d]/g, ''));
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [scoutProperties, searchTerm, statusFilter, categoryFilter, priceRange, ratingFilter, bookingsFilter, quickFilters, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedProperties.length / itemsPerPage);
  const paginatedProperties = filteredAndSortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Enhanced handlers with bulk operations
  const handleBulkAction = useCallback((action: string) => {
    if (selectedProperties.length === 0) {
      toast({ title: "No Selection", description: "Please select properties first." });
      return;
    }

    switch (action) {
      case "activate":
        setScoutProperties(props => props.map(p => 
          selectedProperties.includes(p.id) ? { ...p, status: "active" } : p
        ));
        toast({ title: "Bulk Update", description: `${selectedProperties.length} properties activated.` });
        break;
      case "deactivate":
        setScoutProperties(props => props.map(p => 
          selectedProperties.includes(p.id) ? { ...p, status: "inactive" } : p
        ));
        toast({ title: "Bulk Update", description: `${selectedProperties.length} properties deactivated.` });
        break;
      case "delete":
        setScoutProperties(props => props.filter(p => !selectedProperties.includes(p.id)));
        toast({ title: "Bulk Delete", description: `${selectedProperties.length} properties deleted.`, variant: "destructive" });
        break;
      case "export":
        handleExport();
        break;
    }
    setSelectedProperties([]);
  }, [selectedProperties, toast]);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({ title: "Export Complete", description: "Properties exported successfully." });
    setIsExporting(false);
  }, [toast]);

  const handleSelectAll = useCallback(() => {
    if (selectedProperties.length === paginatedProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(paginatedProperties.map(p => p.id));
    }
  }, [selectedProperties, paginatedProperties]);

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
  const PropertyListView = () => (
    <div className="space-y-3">
      {/* Bulk Actions Bar */}
      {selectedProperties.length > 0 && (
        <Card className="p-3 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">
              {selectedProperties.length} selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleBulkAction("activate")}>
                <CheckSquare className="h-4 w-4 mr-1" />
                Activate
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction("deactivate")}>
                <Archive className="h-4 w-4 mr-1" />
                Deactivate
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction("export")}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete")}>
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={selectedProperties.length === paginatedProperties.length && paginatedProperties.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-16">#</TableHead>
            <TableHead className="cursor-pointer" onClick={() => setSortBy("name")}>
              Property {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="cursor-pointer" onClick={() => setSortBy("price")}>
              Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => setSortBy("bookings")}>
              Bookings {sortBy === "bookings" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => setSortBy("rating")}>
              Rating {sortBy === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead>Performance</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProperties.map((property, index) => (
            <TableRow 
              key={property.id} 
              className={`hover:bg-muted/50 ${selectedProperties.includes(property.id) ? "bg-blue-50" : ""}`}
            >
              <TableCell>
                <Checkbox
                  checked={selectedProperties.includes(property.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedProperties([...selectedProperties, property.id]);
                    } else {
                      setSelectedProperties(selectedProperties.filter(id => id !== property.id));
                    }
                  }}
                />
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={property.images[0]?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
                    alt={property.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{property.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {property.views?.toLocaleString() || 0}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{property.location}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">{property.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={property.status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-coral-600 text-sm">
                {property.price}
              </TableCell>
              <TableCell className="text-sm">{property.bookings}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{property.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs">
                  <div className="text-green-600 font-medium">{property.revenue}</div>
                  <div className="text-muted-foreground">{property.images.length} imgs</div>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Enhanced Pagination with Jump */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedProperties.length)} of {filteredAndSortedProperties.length} properties
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Go to page:</span>
              <Input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => setCurrentPage(Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)))}
                className="w-16 h-8 text-center"
              />
              <span className="text-sm">of {totalPages}</span>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
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
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Enhanced Compact Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Properties</div>
          <div className="text-lg font-bold text-coral-600">{scoutStats.totalProperties.toLocaleString()}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Active Bookings</div>
          <div className="text-lg font-bold text-green-600">{scoutStats.activeBookings}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Monthly Revenue</div>
          <div className="text-lg font-bold text-blue-600">{scoutStats.monthlyEarnings}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Avg Rating</div>
          <div className="text-lg font-bold text-yellow-600">{scoutStats.averageRating}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Total Views</div>
          <div className="text-lg font-bold text-purple-600">{scoutStats.totalViews.toLocaleString()}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Conversion</div>
          <div className="text-lg font-bold text-orange-600">{scoutStats.conversionRate}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Response Time</div>
          <div className="text-lg font-bold text-teal-600">{scoutStats.responseTime}</div>
        </Card>
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Top Category</div>
          <div className="text-lg font-bold text-indigo-600">{scoutStats.topCategory}</div>
        </Card>
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="properties">Properties ({filteredAndSortedProperties.length})</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          {/* Enhanced Filters */}
          <Card className="p-4">
            <div className="space-y-4">
              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={quickFilters.highPerforming ? "default" : "outline"}
                  onClick={() => setQuickFilters(prev => ({ ...prev, highPerforming: !prev.highPerforming }))}
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  High Performing
                </Button>
                <Button
                  size="sm"
                  variant={quickFilters.needsAttention ? "default" : "outline"}
                  onClick={() => setQuickFilters(prev => ({ ...prev, needsAttention: !prev.needsAttention }))}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Needs Attention
                </Button>
                <Button
                  size="sm"
                  variant={quickFilters.recentlyAdded ? "default" : "outline"}
                  onClick={() => setQuickFilters(prev => ({ ...prev, recentlyAdded: !prev.recentlyAdded }))}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Recently Added
                </Button>
              </div>

              {/* Main Filters */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search properties, locations, tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Beach">Beach</SelectItem>
                      <SelectItem value="Mountain">Mountain</SelectItem>
                      <SelectItem value="Urban">Urban</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="high">4.5+ Stars</SelectItem>
                      <SelectItem value="medium">3.5-4.5</SelectItem>
                      <SelectItem value="low">Below 3.5</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                    </SelectContent>
                  </Select>

                  <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-coral-500 hover:bg-coral-600">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Property</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Property Name" />
                        <Input placeholder="Location" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beach">Beach</SelectItem>
                            <SelectItem value="Mountain">Mountain</SelectItem>
                            <SelectItem value="Urban">Urban</SelectItem>
                            <SelectItem value="Nature">Nature</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Price per day" />
                        <Button className="w-full">Add Property</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    onClick={handleExport}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-1 border-2 border-current border-t-transparent rounded-full" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <PropertyListView />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingManager />
        </TabsContent>

        <TabsContent value="messages">
          <MessageCenter />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500">Analytics dashboard will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScoutDashboard;
