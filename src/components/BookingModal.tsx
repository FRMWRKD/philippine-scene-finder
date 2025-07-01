
import { useState } from "react";
import { X, Calendar, MapPin, Users, Clock, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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

type BookingStep = "type" | "datetime" | "details" | "confirmation";

const BookingModal = ({ isOpen, onClose, location }: BookingModalProps) => {
  const [step, setStep] = useState<BookingStep>("type");
  const [bookingType, setBookingType] = useState<"virtual" | "onsite" | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState("4");
  const [crewSize, setCrewSize] = useState("3-5");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleReset = () => {
    setStep("type");
    setBookingType(null);
    setSelectedDate(undefined);
    setTimeSlot("");
    setDuration("4");
    setCrewSize("3-5");
    setMessage("");
    setIsSubmitting(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleNext = () => {
    if (step === "type" && bookingType) setStep("datetime");
    else if (step === "datetime" && selectedDate && timeSlot) setStep("details");
    else if (step === "details") handleSubmit();
  };

  const handleBack = () => {
    if (step === "datetime") setStep("type");
    else if (step === "details") setStep("datetime");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep("confirmation");
    setIsSubmitting(false);
  };

  const canProceed = () => {
    if (step === "type") return bookingType !== null;
    if (step === "datetime") return selectedDate && timeSlot;
    if (step === "details") return true;
    return false;
  };

  const totalCost = bookingType === "virtual" 
    ? 500 
    : location.price * parseInt(duration) / 8;

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {["type", "datetime", "details", "confirmation"].map((stepName, index) => (
        <div key={stepName} className="flex items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            step === stepName ? "bg-coral-500 text-white" :
            ["type", "datetime", "details"].indexOf(step) > index ? "bg-green-500 text-white" :
            "bg-gray-200 text-gray-500"
          )}>
            {["type", "datetime", "details"].indexOf(step) > index ? (
              <Check className="h-4 w-4" />
            ) : (
              index + 1
            )}
          </div>
          {index < 3 && (
            <div className={cn(
              "w-12 h-1 mx-2",
              ["type", "datetime", "details"].indexOf(step) > index ? "bg-green-500" : "bg-gray-200"
            )} />
          )}
        </div>
      ))}
    </div>
  );

  const renderTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Experience</h2>
        <p className="text-gray-600">Select how you'd like to explore this location</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            bookingType === "virtual" ? "border-coral-500 bg-coral-50" : "border-gray-200 hover:border-coral-300"
          )}
          onClick={() => setBookingType("virtual")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-coral-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Virtual Tour</h3>
            <p className="text-gray-600 mb-4">30-minute live video walkthrough with the scout</p>
            <div className="text-3xl font-bold text-coral-600">₱500</div>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            bookingType === "onsite" ? "border-coral-500 bg-coral-50" : "border-gray-200 hover:border-coral-300"
          )}
          onClick={() => setBookingType("onsite")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-coral-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">On-Site Visit</h3>
            <p className="text-gray-600 mb-4">Physical location scouting with professional guidance</p>
            <div className="text-3xl font-bold text-coral-600">
              ₱{(location.price / 8).toLocaleString()}/hr
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDateTimeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
        <p className="text-gray-600">Choose your preferred date and time slot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Date</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
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
                onSelect={setSelectedDate}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Time</h3>
          <Select value={timeSlot} onValueChange={setTimeSlot}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {bookingType === "onsite" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-6 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
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
            <label className="block text-sm font-semibold text-gray-900 mb-2">Crew Size</label>
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
  );

  const renderDetailsForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Details</h2>
        <p className="text-gray-600">Tell us about your project requirements</p>
      </div>

      <div className="space-y-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          placeholder="Describe your project, specific requirements, or any questions..."
          className="resize-none"
          maxLength={1000}
        />
        <div className="text-sm text-gray-500 text-right">
          {message.length}/1000 characters
        </div>
      </div>

      <Card className="border-coral-200 bg-gradient-to-br from-coral-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xl font-bold text-gray-900">Booking Summary</div>
            </div>
            <CreditCard className="h-6 w-6 text-coral-600" />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-medium">{location.title}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium">{timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium">
                {bookingType === "virtual" ? "Virtual Tour" : `On-Site Visit (${duration}h)`}
              </span>
            </div>
            {bookingType === "onsite" && (
              <div className="flex justify-between">
                <span>Crew Size:</span>
                <span className="font-medium">{crewSize} people</span>
              </div>
            )}
          </div>
          
          <div className="border-t border-coral-200 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total Cost:</span>
              <span className="text-2xl font-bold text-coral-600">
                ₱{totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Request Sent!</h2>
        <p className="text-gray-600 text-lg">
          Your {bookingType === "virtual" ? "virtual tour" : "on-site visit"} request has been sent. 
          You'll receive a confirmation within 24 hours.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-left space-y-3">
            <div><strong>Booking ID:</strong> #BK{Date.now().toString().slice(-6)}</div>
            <div><strong>Location:</strong> {location.title}</div>
            <div><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</div>
            <div><strong>Time:</strong> {timeSlot}</div>
            <div><strong>Type:</strong> {bookingType === "virtual" ? "Virtual Tour" : "On-Site Visit"}</div>
            <div><strong>Total:</strong> ₱{totalCost.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Book {location.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Complete your booking for {location.title}
        </DialogDescription>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClose}
            className="absolute right-0 top-0 z-10"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="pt-8">
            {step !== "confirmation" && renderStepIndicator()}
            
            <div className="min-h-[400px]">
              {step === "type" && renderTypeSelection()}
              {step === "datetime" && renderDateTimeSelection()}
              {step === "details" && renderDetailsForm()}
              {step === "confirmation" && renderConfirmation()}
            </div>

            {step !== "confirmation" && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={step === "type" ? handleClose : handleBack}
                  className="px-8"
                >
                  {step === "type" ? "Cancel" : "Back"}
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!canProceed() || isSubmitting}
                  className="px-8 bg-coral-500 hover:bg-coral-600"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : step === "details" ? (
                    "Send Request"
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            )}

            {step === "confirmation" && (
              <div className="mt-8 pt-6 border-t">
                <Button
                  onClick={handleClose}
                  className="w-full bg-coral-500 hover:bg-coral-600"
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
