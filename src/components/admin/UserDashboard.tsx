
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star, Clock, Mail, Phone } from "lucide-react";

const UserDashboard = () => {
  // Mock data - replace with real data from your backend
  const userBookings = [
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
  ];

  const userProfile = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+63 912 345 6789",
    totalBookings: 12,
    favoriteLocations: 8
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-coral-500 flex items-center justify-center text-white font-bold">
              {userProfile.name.charAt(0)}
            </div>
            Profile Overview
          </CardTitle>
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
                <p className="text-2xl font-bold text-coral-600">2</p>
              </div>
              <Clock className="h-8 w-8 text-coral-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="glass bg-white/70 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Your latest location bookings and their status</CardDescription>
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
                <div className="text-right">
                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                    {booking.status}
                  </Badge>
                  <p className="text-lg font-bold text-coral-600 mt-1">{booking.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
