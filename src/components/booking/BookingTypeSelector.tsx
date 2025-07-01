
import { Video, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  title: string;
  price: number;
  location: string;
}

interface BookingTypeSelectorProps {
  bookingType: "virtual" | "onsite";
  onBookingTypeChange: (type: "virtual" | "onsite") => void;
  location: Location;
}

const BookingTypeSelector = ({ bookingType, onBookingTypeChange, location }: BookingTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Choose Your Experience</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            bookingType === "virtual" ? "ring-2 ring-coral-500 bg-coral-50" : "hover:border-coral-300"
          )}
          onClick={() => onBookingTypeChange("virtual")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center">
                <Video className="h-6 w-6 text-coral-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-lg">Virtual Tour</div>
                <div className="text-sm text-gray-500">Live video walkthrough</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              30-minute live video walkthrough with the scout
            </p>
            <div className="text-2xl font-bold text-coral-600">₱500</div>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            bookingType === "onsite" ? "ring-2 ring-coral-500 bg-coral-50" : "hover:border-coral-300"
          )}
          onClick={() => onBookingTypeChange("onsite")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-coral-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-lg">On-Site Visit</div>
                <div className="text-sm text-gray-500">Physical scouting</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Physical location scouting with professional guidance
            </p>
            <div className="text-2xl font-bold text-coral-600">
              ₱{(location.price / 8).toLocaleString()}/hr
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingTypeSelector;
