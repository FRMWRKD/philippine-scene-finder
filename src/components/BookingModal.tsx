
import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users } from "lucide-react";
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
  const [crewSize, setCrewSize] = useState("5");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking request:", {
      locationId: location.id,
      date: selectedDate,
      type: bookingType,
      timeSlot,
      duration,
      crewSize,
      message
    });
    onClose();
  };

  const totalCost = bookingType === "virtual" 
    ? 500 // Virtual consultation fee
    : location.price * parseInt(duration) / 8; // Pro-rated daily rate

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Book Location</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Location Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{location.title}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{location.location}</span>
            </div>
          </div>

          {/* Booking Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Booking Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBookingType("virtual")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  bookingType === "virtual"
                    ? 'border-coral-500 bg-coral-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium text-gray-900">Virtual Tour</div>
                  <div className="text-sm text-gray-600 mt-1">
                    30-min video consultation
                  </div>
                  <div className="text-sm font-semibold text-coral-600 mt-2">
                    ₱500
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBookingType("onsite")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  bookingType === "onsite"
                    ? 'border-coral-500 bg-coral-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium text-gray-900">On-Site Visit</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Physical location scout
                  </div>
                  <div className="text-sm font-semibold text-coral-600 mt-2">
                    Pro-rated daily rate
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Date
            </label>
            <div className="border border-gray-200 rounded-xl p-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="w-full"
              />
            </div>
          </div>

          {/* Time Slot */}
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
              <option value="">Select time slot</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {bookingType === "onsite" && (
            <>
              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Duration (hours)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                >
                  <option value="2">2 hours</option>
                  <option value="4">4 hours</option>
                  <option value="8">Full day (8 hours)</option>
                </select>
              </div>

              {/* Crew Size */}
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

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Message to Scout (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
              placeholder="Tell the scout about your project, specific requirements, or any questions..."
            />
          </div>

          {/* Cost Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">
                {bookingType === "virtual" ? "Virtual consultation" : `${duration} hours`}
              </span>
              <span className="font-medium">₱{totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>₱{totalCost.toLocaleString()}</span>
            </div>
            {bookingType === "onsite" && (
              <p className="text-sm text-gray-600 mt-2">
                * On-site bookings require scout confirmation
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!selectedDate || !timeSlot}
            className="w-full bg-coral-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {bookingType === "virtual" ? "Book Virtual Tour" : "Request On-Site Visit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
