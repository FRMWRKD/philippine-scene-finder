
import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users, Video, CheckCircle } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

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

  if (!isOpen) return null;

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
  };

  const totalCost = bookingType === "virtual" 
    ? 500 
    : location.price * parseInt(duration) / 8;

  if (step === "confirmation") {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h2>
          <p className="text-gray-600 mb-6">
            Your {bookingType === "virtual" ? "virtual tour" : "on-site visit"} request has been sent to the location scout. 
            You'll receive a confirmation within 24 hours.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Location:</strong> {location.title}</div>
              <div><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</div>
              <div><strong>Time:</strong> {timeSlot}</div>
              <div><strong>Type:</strong> {bookingType === "virtual" ? "Virtual Tour" : "On-Site Visit"}</div>
              <div><strong>Total:</strong> ₱{totalCost.toLocaleString()}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-coral-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-coral-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Book Location</h2>
            <p className="text-sm text-gray-600">{location.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Booking Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Choose Your Experience
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setBookingType("virtual")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  bookingType === "virtual"
                    ? 'border-coral-500 bg-coral-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Video className="h-5 w-5 text-coral-600" />
                  <div className="font-medium text-gray-900">Virtual Tour</div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  30-minute live video walkthrough with the scout
                </div>
                <div className="text-lg font-bold text-coral-600">₱500</div>
              </button>

              <button
                type="button"
                onClick={() => setBookingType("onsite")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  bookingType === "onsite"
                    ? 'border-coral-500 bg-coral-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-coral-600" />
                  <div className="font-medium text-gray-900">On-Site Visit</div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Physical location scouting with professional guidance
                </div>
                <div className="text-lg font-bold text-coral-600">
                  ₱{(location.price / 8).toLocaleString()}/hr
                </div>
              </button>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Date
              </label>
              <div className="border border-gray-200 rounded-xl p-3">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Preferred Time
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {bookingType === "onsite" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    >
                      <option value="2">2 hours</option>
                      <option value="4">4 hours</option>
                      <option value="8">Full day</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Crew Size
                    </label>
                    <select
                      value={crewSize}
                      onChange={(e) => setCrewSize(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    >
                      <option value="1-2">1-2 people</option>
                      <option value="3-5">3-5 people</option>
                      <option value="6-10">6-10 people</option>
                      <option value="10+">10+ people</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Tell us about your project
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
              placeholder="Describe your project, specific requirements, or any questions for the scout..."
            />
          </div>

          {/* Cost Summary */}
          <div className="bg-gradient-to-r from-coral-50 to-orange-50 rounded-xl p-4 border border-coral-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-900">Total Cost</div>
                <div className="text-sm text-gray-600">
                  {bookingType === "virtual" ? "30-min virtual consultation" : `${duration} hours on-site`}
                </div>
              </div>
              <div className="text-2xl font-bold text-coral-600">
                ₱{totalCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!selectedDate || !timeSlot}
            className="w-full bg-coral-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg"
          >
            {bookingType === "virtual" ? "Book Virtual Tour" : "Request On-Site Visit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
