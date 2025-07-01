
import { useState } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { validateBookingForm, sanitizeInput } from "@/utils/validation";
import { useLoading } from "@/hooks/useLoading";
import BookingTypeSelector from "./booking/BookingTypeSelector";
import DateTimeSelector from "./booking/DateTimeSelector";
import OnSiteOptions from "./booking/OnSiteOptions";
import BookingConfirmation from "./booking/BookingConfirmation";

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
      <BookingConfirmation
        isOpen={isOpen}
        onClose={onClose}
        location={location}
        selectedDate={selectedDate}
        timeSlot={timeSlot}
        bookingType={bookingType}
        totalCost={totalCost}
      />
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

          <BookingTypeSelector
            bookingType={bookingType}
            onBookingTypeChange={setBookingType}
            location={location}
          />

          <DateTimeSelector
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            timeSlot={timeSlot}
            onTimeSlotChange={setTimeSlot}
          />

          {bookingType === "onsite" && (
            <OnSiteOptions
              duration={duration}
              onDurationChange={setDuration}
              crewSize={crewSize}
              onCrewSizeChange={setCrewSize}
            />
          )}

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
