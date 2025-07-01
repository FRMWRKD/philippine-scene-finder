
import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users, Video, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { validateBookingForm, sanitizeInput } from "@/utils/validation";
import { useLoading } from "@/hooks/useLoading";

interface Location {
  id: string;
  title: string;
  price: number;
  location: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location;
}

const BookingModal = ({ isOpen, onClose, location }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [bookingType, setBookingType] = useState<"virtual" | "onsite">("virtual");
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState("4");
  const [crewSize, setCrewSize] = useState("3-5");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"booking" | "confirmation">("booking");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const { isLoading, error, withLoading, clearError } = useLoading();

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleDateSelect = (date: Date | undefined) => {
    console.log('Date selected:', date);
    setSelectedDate(date);
    clearError();
    setValidationErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors([]);

    const validation = validateBookingForm({
      selectedDate,
      timeSlot,
      message: sanitizeInput(message)
    });

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    const result = await withLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
    });

    if (result) {
      setStep("confirmation");
    }
  };

  const totalCost = bookingType === "virtual" 
    ? 500 
    : location.price * parseInt(duration) / 8;

  if (step === "confirmation") {
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
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Book Location - {location.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Complete your booking for {location.title}. Choose between virtual tour or on-site visit, select your preferred date and time, and provide project details.
        </DialogDescription>
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Book Location</h2>
            <p className="text-gray-600">{location.title}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Error Display */}
          {(error || validationErrors.length > 0) && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Please fix the following errors:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {error && <li>{error}</li>}
                      {validationErrors.map((err, index) => (
                        <li key={index}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booking Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Choose Your Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  bookingType === "virtual" ? "ring-2 ring-coral-500 bg-coral-50" : "hover:border-coral-300"
                )}
                onClick={() => setBookingType("virtual")}
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
                onClick={() => setBookingType("onsite")}
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

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Date Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Date
              </h3>
              <Card>
                <CardContent className="p-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </div>

            {/* Time and Options */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Preferred Time
                </h3>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {bookingType === "onsite" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Duration
                    </label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="8">Full day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Crew Size
                    </label>
                    <Select value={crewSize} onValueChange={setCrewSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 people</SelectItem>
                        <SelectItem value="3-5">3-5 people</SelectItem>
                        <SelectItem value="6-10">6-10 people</SelectItem>
                        <SelectItem value="10+">10+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Tell us about your project</h3>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Describe your project, specific requirements, or any questions for the scout..."
              className="resize-none"
              maxLength={1000}
            />
            <div className="text-sm text-gray-500 text-right">
              {message.length}/1000 characters
            </div>
          </div>

          {/* Cost Summary */}
          <Card className="border-coral-200 bg-gradient-to-br from-coral-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-bold text-gray-900">Total Cost</div>
                  <div className="text-gray-600">
                    {bookingType === "virtual" ? "30-min virtual consultation" : `${duration} hours on-site visit`}
                  </div>
                </div>
                <div className="text-3xl font-bold text-coral-600">
                  ₱{totalCost.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-coral-500 hover:bg-coral-600 text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              bookingType === "virtual" ? "Book Virtual Tour" : "Request On-Site Visit"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
