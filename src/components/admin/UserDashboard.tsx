
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Star, Heart, Settings, User, CreditCard, Eye, MessageSquare, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mockDataService, { Property, User as UserType, Booking } from "@/services/mockDataService";

const UserDashboard = () => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [allProperties] = useState<Property[]>(mockDataService.getProperties());

  useEffect(() => {
    // Mock current user - in real app this would come from auth context
    const user = mockDataService.getUser(1);
    if (user) {
      setCurrentUser(user);
      setUserBookings(mockDataService.getBookingsByUser(1));
      
      // Mock saved properties - in real app this would be stored in user preferences
      const savedIds = [1, 2]; // Mock saved property IDs
      setSavedProperties(allProperties.filter(p => savedIds.includes(p.id)));
    }
  }, [allProperties]);

  const toggleSaveProperty = (propertyId: number) => {
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) return;

    const isSaved = savedProperties.some(p => p.id === propertyId);
    
    if (isSaved) {
      setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
      toast({ title: "Property Removed", description: `Removed ${property.name} from saved properties.` });
    } else {
      setSavedProperties(prev => [...prev, property]);
      toast({ title: "Property Saved", description: `Added ${property.name} to saved properties.` });
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                {currentUser.name}
                {currentUser.isVerified && <Badge variant="secondary">Verified</Badge>}
              </CardTitle>
              <CardDescription>{currentUser.profile.bio}</CardDescription>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentUser.profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(currentUser.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{currentUser.stats.totalBookings || 0}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{savedProperties.length}</p>
                <p className="text-sm text-muted-foreground">Saved Properties</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{currentUser.stats.reviewsGiven || 0}</p>
                <p className="text-sm text-muted-foreground">Reviews Given</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{currentUser.stats.totalSpent || "₱0"}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="saved">Saved Properties</TabsTrigger>
          <TabsTrigger value="browse">Browse Properties</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View and manage your property bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {userBookings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No bookings yet. Start exploring properties!</p>
              ) : (
                <div className="space-y-4">
                  {userBookings.map((booking) => {
                    const property = allProperties.find(p => p.id === booking.propertyId);
                    return (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{property?.name || "Unknown Property"}</h4>
                              <p className="text-sm text-muted-foreground">{property?.location}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                                <span>{booking.totalDays} days</span>
                                <span className="font-semibold">₱{booking.totalAmount.toLocaleString()}</span>
                              </div>
                            </div>
                            <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'completed' ? 'secondary' : 'outline'}>
                              {booking.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Properties</CardTitle>
              <CardDescription>Properties you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              {savedProperties.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No saved properties yet. Browse and save properties you're interested in!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProperties.map((property) => (
                    <Card key={property.id}>
                      <div className="relative">
                        <img 
                          src={property.images[0]?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"} 
                          alt={property.name} 
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-2 right-2"
                          onClick={() => toggleSaveProperty(property.id)}
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{property.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{property.rating}</span>
                          </div>
                          <span className="font-semibold text-coral-600">{property.price}/day</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {property.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Browse Properties</CardTitle>
              <CardDescription>Discover amazing filming and photography locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allProperties.map((property) => (
                  <Card key={property.id}>
                    <div className="relative">
                      <img 
                        src={property.images[0]?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"} 
                        alt={property.name} 
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2"
                        onClick={() => toggleSaveProperty(property.id)}
                      >
                        <Heart className={`h-4 w-4 ${savedProperties.some(p => p.id === property.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{property.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{property.rating}</span>
                        </div>
                        <span className="font-semibold text-coral-600">{property.price}/day</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {property.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue={currentUser.name} />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue={currentUser.email} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Input defaultValue={currentUser.profile.bio} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input defaultValue={currentUser.profile.location} />
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <Input defaultValue={currentUser.profile.company} />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
