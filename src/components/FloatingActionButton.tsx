
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingActionButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/upload")}
      className="fixed bottom-8 right-8 bg-coral-500 text-white w-14 h-14 rounded-full shadow-2xl hover:bg-coral-600 hover:scale-110 transition-all duration-200 flex items-center justify-center z-40 group"
      title="Add your location"
    >
      <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
      <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        List your location
      </div>
    </button>
  );
};

export default FloatingActionButton;
