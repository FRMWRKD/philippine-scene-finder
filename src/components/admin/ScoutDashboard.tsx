
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Plus, Edit, Trash, Eye, Star, Calendar, DollarSign } from "lucide-react";

const ScoutDashboard = () => {
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);

  // Mock data - replace with real data from your backend
  const scoutProperties = [
    {
      id: 1,
      name: "Boracay Beach Resort",
      location: "Boracay, Aklan",
      category: "Beach",
      price: "₱5,000",
      status: "active",
      bookings: 24,
      rating: 4.8,
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
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7"
    }
  ];

  const scoutStats = {
    totalProperties: 8,
    activeBookings: 15,
    monthlyEarnings: "₱45,000",
    averageRating: 4.7
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
              <CardTitle>My Properties</CardTitle>
              <CardDescription>Manage your location listings and bookings</CardDescription>
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
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Property Name</Label>
                    <Input id="name" placeholder="Enter property name" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, Province" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Day</Label>
                    <Input id="price" placeholder="₱0,000" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your property..." />
                  </div>
                  <Button className="w-full bg-coral-500 hover:bg-coral-600">
                    Add Property
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
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
                    <Badge variant={property.status === "active" ? "default" : "secondary"}>
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
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoutDashboard;
