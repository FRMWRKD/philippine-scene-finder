
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, Star, Clock, Mail, Phone, Edit, Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserDashboard = () => {
  const { toast } = useToast();
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [userBookings, setUserBookings] = useState([
    {
      id: 1,
      locationName: "Boracay Beach Resort",
      date: "2024-07-15",
      status: "confirmed",
      scout: "Maria Santos",
      price: "₱5,000"
    },
    {
      id: 2,
      locationName: "Baguio Mountain View",
      date: "2024-08-20",
      status: "pending",
      scout: "Juan Dela Cruz",
      price: "₱3,500"
    }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+63 912 345 6789",
    totalBookings: 12,
    favoriteLocations: 8
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updatedProfile = {
      ...userProfile,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };
    setUserProfile(updatedProfile);
    setIsProfileEditOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancelBooking = (bookingId: number) => {
    setUserBookings(bookings => bookings.filter(b => b.id !== bookingId));
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
      variant: "destructive"
    });
  };

  const handleChangeBookingStatus = (bookingId: number, newStatus: string) => {
    setUserBookings(bookings => 
      bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-coral-500 flex items-center justify-center text-white font-bold">
                {userProfile.name.charAt(0)}
              </div>
              Profile Overview
            </CardTitle>
            <Dialog open={isProfileEditOpen} onOpenChange={setIsProfileEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Update your personal information</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" defaultValue={userProfile.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={userProfile.email} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" defaultValue={userProfile.phone} />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{userProfile.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <p className="font-medium">{userProfile.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Phone
              </p>
              <p className="font-medium">{userProfile.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-coral-600">{userProfile.totalBookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorite Locations</p>
                <p className="text-2xl font-bold text-coral-600">{userProfile.favoriteLocations}</p>
              </div>
              <Star className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-coral-600">{userBookings.length}</p>
              </div>
              <Clock className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Management */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>Manage your location bookings and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.locationName}</h3>
                    <p className="text-sm text-gray-600">Scout: {booking.scout}</p>
                    <p className="text-sm text-gray-500">Date: {booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge 
                      variant={booking.status === "confirmed" ? "default" : "secondary"}
                      className="mb-2"
                    >
                      {booking.status}
                    </Badge>
                    <p className="text-lg font-bold text-coral-600">{booking.price}</p>
                  </div>
                  <div className="flex gap-2">
                    {booking.status === "pending" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleChangeBookingStatus(booking.id, "confirmed")}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Confirm
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {userBookings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No bookings found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
