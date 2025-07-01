
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Location {
  id: string;
  title: string;
  price: number;
  location: string;
}

interface BookingConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location;
  selectedDate: Date | undefined;
  timeSlot: string;
  bookingType: "virtual" | "onsite";
  totalCost: number;
}

const BookingConfirmation = ({ 
  isOpen, 
  onClose, 
  location, 
  selectedDate, 
  timeSlot, 
  bookingType, 
  totalCost 
}: BookingConfirmationProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Booking Confirmation</DialogTitle>
        <DialogDescription className="sr-only">
          Your booking request has been successfully sent and is being processed.
        </DialogDescription>
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h2>
            <p className="text-gray-600">
              Your {bookingType === "virtual" ? "virtual tour" : "on-site visit"} request has been sent to the location scout. 
              You'll receive a confirmation within 24 hours.
            </p>
          </div>
          <Card>
            <CardContent className="p-4 text-left space-y-2 text-sm">
              <div><strong>Location:</strong> {location.title}</div>
              <div><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</div>
              <div><strong>Time:</strong> {timeSlot}</div>
              <div><strong>Type:</strong> {bookingType === "virtual" ? "Virtual Tour" : "On-Site Visit"}</div>
              <div><strong>Total:</strong> ₱{totalCost.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Button onClick={onClose} className="w-full bg-coral-500 hover:bg-coral-600">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmation;
