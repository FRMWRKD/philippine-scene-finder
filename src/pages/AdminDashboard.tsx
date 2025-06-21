
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserDashboard from "@/components/admin/UserDashboard";
import ScoutDashboard from "@/components/admin/ScoutDashboard";

const AdminDashboard = () => {
  const [userType, setUserType] = useState<"user" | "scout">("user");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your account and activities</p>
        </div>

        {/* User Type Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Dashboard Type</CardTitle>
            <CardDescription>Choose your role to access the appropriate dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button 
                variant={userType === "user" ? "default" : "outline"}
                onClick={() => setUserType("user")}
                className="flex-1"
              >
                User Dashboard
              </Button>
              <Button 
                variant={userType === "scout" ? "default" : "outline"}
                onClick={() => setUserType("scout")}
                className="flex-1"
              >
                Location Scout Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        {userType === "user" ? <UserDashboard /> : <ScoutDashboard />}
      </div>
    </div>
  );
};

export default AdminDashboard;
