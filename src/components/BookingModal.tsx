
import { useState } from "react";
import { X, Calendar, MapPin, Users, Clock, CreditCard, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
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

type BookingStep = "type" | "details" | "confirmation";

const BookingModal = ({ isOpen, onClose, location }: BookingModalProps) => {
  const [step, setStep] = useState<BookingStep>("type");
  const [bookingType, setBookingType] = useState<"virtual" | "onsite" | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState("4");
  const [crewSize, setCrewSize] = useState("3-5");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const validateStep = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === "type" && !bookingType) {
      newErrors.bookingType = "Please select a booking type";
    }
    
    if (step === "details") {
      if (!selectedDate) newErrors.date = "Please select a date";
      if (!timeSlot) newErrors.time = "Please select a time slot";
      if (bookingType === "onsite" && !duration) newErrors.duration = "Please select duration";
      if (bookingType === "onsite" && !crewSize) newErrors.crewSize = "Please select crew size";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    
    if (step === "type") setStep("details");
    else if (step === "details") handleSubmit();
  };

  const handleBack = () => {
    setErrors({});
    if (step === "details") setStep("type");
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep("confirmation");
    setIsSubmitting(false);
  };

  const totalCost = bookingType === "virtual" 
    ? 500 
    : location.price * parseInt(duration) / 8;

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {["type", "details", "confirmation"].map((stepName, index) => (
        <div key={stepName} className="flex items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
            step === stepName ? "bg-coral-500 text-white shadow-lg scale-110" :
            ["type", "details"].indexOf(step) > index ? "bg-green-500 text-white" :
            "bg-gray-200 text-gray-500"
          )}>
            {["type", "details"].indexOf(step) > index ? (
              <Check className="h-5 w-5" />
            ) : (
              index + 1
            )}
          </div>
          {index < 2 && (
            <div className={cn(
              "w-16 h-1 mx-3 rounded-full transition-all duration-300",
              ["type", "details"].indexOf(step) > index ? "bg-green-500" : "bg-gray-200"
            )} />
          )}
        </div>
      ))}
    </div>
  );

  const renderTypeSelection = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Experience</h2>
        <p className="text-gray-600 text-lg">Select how you'd like to explore this location</p>
      </div>
      
      {errors.bookingType && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {errors.bookingType}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={cn(
            "cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 group",
            bookingType === "virtual" ? "border-coral-500 bg-coral-50 shadow-lg" : "border-gray-200 hover:border-coral-300"
          )}
          onClick={() => setBookingType("virtual")}
        >
          <CardContent className="p-8 text-center">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300",
              bookingType === "virtual" ? "bg-coral-500 text-white" : "bg-coral-100 text-coral-600 group-hover:bg-coral-200"
            )}>
              <Calendar className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Virtual Tour</h3>
            <p className="text-gray-600 mb-6 text-lg">Live 30-minute video walkthrough with professional scout</p>
            <div className="text-4xl font-bold text-coral-600">₱500</div>
            <p className="text-sm text-gray-500 mt-2">Fixed price</p>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 group",
            bookingType === "onsite" ? "border-coral-500 bg-coral-50 shadow-lg" : "border-gray-200 hover:border-coral-300"
          )}
          onClick={() => setBookingType("onsite")}
        >
          <CardContent className="p-8 text-center">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300",
              bookingType === "onsite" ? "bg-coral-500 text-white" : "bg-coral-100 text-coral-600 group-hover:bg-coral-200"
            )}>
              <MapPin className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">On-Site Visit</h3>
            <p className="text-gray-600 mb-6 text-lg">Physical location scouting with professional guidance</p>
            <div className="text-4xl font-bold text-coral-600">
              ₱{(location.price / 8).toLocaleString()}/hr
            </div>
            <p className="text-sm text-gray-500 mt-2">Starting from 2 hours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDetailsForm = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Details</h2>
        <p className="text-gray-600 text-lg">Let's schedule your {bookingType === "virtual" ? "virtual tour" : "on-site visit"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold text-gray-900 mb-3 block">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left h-14 text-lg border-2 transition-all duration-200",
                    !selectedDate && "text-muted-foreground",
                    errors.date ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-coral-300"
                  )}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  {selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : "Pick a date"}
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
            {errors.date && <p className="text-red-600 text-sm mt-2">{errors.date}</p>}
          </div>

          <div>
            <Label className="text-lg font-semibold text-gray-900 mb-3 block">Select Time</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger className={cn(
                "h-14 text-lg border-2 transition-all duration-200",
                errors.time ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-coral-300"
              )}>
                <Clock className="mr-2 h-5 w-5" />
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(time => (
                  <SelectItem key={time} value={time} className="text-lg py-3">{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.time && <p className="text-red-600 text-sm mt-2">{errors.time}</p>}
          </div>
        </div>

        <div className="space-y-6">
          {bookingType === "onsite" && (
            <>
              <div>
                <Label className="text-lg font-semibold text-gray-900 mb-3 block">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className={cn(
                    "h-14 text-lg border-2 transition-all duration-200",
                    errors.duration ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-coral-300"
                  )}>
                    <Clock className="mr-2 h-5 w-5" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2" className="text-lg py-3">2 hours</SelectItem>
                    <SelectItem value="4" className="text-lg py-3">4 hours</SelectItem>
                    <SelectItem value="8" className="text-lg py-3">Full day (8 hours)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.duration && <p className="text-red-600 text-sm mt-2">{errors.duration}</p>}
              </div>

              <div>
                <Label className="text-lg font-semibold text-gray-900 mb-3 block">Crew Size</Label>
                <Select value={crewSize} onValueChange={setCrewSize}>
                  <SelectTrigger className={cn(
                    "h-14 text-lg border-2 transition-all duration-200",
                    errors.crewSize ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-coral-300"
                  )}>
                    <Users className="mr-2 h-5 w-5" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2" className="text-lg py-3">1-2 people</SelectItem>
                    <SelectItem value="3-5" className="text-lg py-3">3-5 people</SelectItem>
                    <SelectItem value="6-10" className="text-lg py-3">6-10 people</SelectItem>
                    <SelectItem value="10+" className="text-lg py-3">10+ people</SelectItem>
                  </SelectContent>
                </Select>
                {errors.crewSize && <p className="text-red-600 text-sm mt-2">{errors.crewSize}</p>}
              </div>
            </>
          )}

          <div>
            <Label className="text-lg font-semibold text-gray-900 mb-3 block">Project Details</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Tell us about your project, specific requirements, or any questions you have..."
              className="resize-none text-lg border-2 border-gray-200 hover:border-coral-300 focus:border-coral-500 transition-all duration-200"
              maxLength={1000}
            />
            <div className="text-sm text-gray-500 text-right mt-2">
              {message.length}/1000 characters
            </div>
          </div>
        </div>
      </div>

      <Card className="border-2 border-coral-200 bg-gradient-to-br from-coral-50 to-orange-50 shadow-lg">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Booking Summary</h3>
            <CreditCard className="h-8 w-8 text-coral-600" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-semibold text-right">{location.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{timeSlot}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold">
                  {bookingType === "virtual" ? "Virtual Tour" : `On-Site Visit`}
                </span>
              </div>
              {bookingType === "onsite" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{duration} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crew Size:</span>
                    <span className="font-semibold">{crewSize} people</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="border-t border-coral-200 mt-6 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">Total Cost:</span>
              <span className="text-3xl font-bold text-coral-600">
                ₱{totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-scale-in">
        <Check className="h-12 w-12 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Request Sent Successfully!</h2>
        <p className="text-gray-600 text-xl leading-relaxed">
          Your {bookingType === "virtual" ? "virtual tour" : "on-site visit"} request has been sent. 
          <br />You'll receive a confirmation within 24 hours.
        </p>
      </div>

      <Card className="border-2 border-green-200 bg-green-50 shadow-lg">
        <CardContent className="p-8">
          <div className="text-left space-y-4 text-lg">
            <div className="flex justify-between">
              <strong>Booking ID:</strong> 
              <span className="font-mono">#BK{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <strong>Location:</strong> 
              <span>{location.title}</span>
            </div>
            <div className="flex justify-between">
              <strong>Date:</strong> 
              <span>{selectedDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <strong>Time:</strong> 
              <span>{timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <strong>Type:</strong> 
              <span>{bookingType === "virtual" ? "Virtual Tour" : "On-Site Visit"}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <strong className="text-xl">Total:</strong> 
              <span className="text-xl font-bold text-coral-600">₱{totalCost.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogTitle className="sr-only">Book {location.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Complete your booking for {location.title}
        </DialogDescription>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClose}
            className="absolute right-0 top-0 z-10 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="pt-8 px-2">
            {step !== "confirmation" && renderStepIndicator()}
            
            <div className="min-h-[500px] pb-8">
              {step === "type" && renderTypeSelection()}
              {step === "details" && renderDetailsForm()}
              {step === "confirmation" && renderConfirmation()}
            </div>

            {step !== "confirmation" && (
              <div className="flex justify-between items-center mt-8 pt-8 border-t-2 border-gray-100">
                <Button
                  variant="outline"
                  onClick={step === "type" ? handleClose : handleBack}
                  className="px-8 py-3 text-lg border-2 hover:bg-gray-50 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  {step === "type" ? "Cancel" : "Back"}
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-8 py-3 text-lg bg-coral-500 hover:bg-coral-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : step === "details" ? (
                    <>
                      Send Request
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {step === "confirmation" && (
              <div className="mt-8 pt-8 border-t-2 border-gray-100">
                <Button
                  onClick={handleClose}
                  className="w-full py-4 text-lg bg-coral-500 hover:bg-coral-600 transition-all duration-200 shadow-lg hover:shadow-xl"
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
