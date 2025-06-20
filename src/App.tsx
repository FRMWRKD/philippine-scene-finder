
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import UploadLocation from "./pages/UploadLocation";
import LocationDetail from "./pages/LocationDetail";
import LocationScouts from "./pages/LocationScouts";
import ScoutProfile from "./pages/ScoutProfile";
import ImageDetail from "./pages/ImageDetail";
import HowItWorks from "./pages/HowItWorks";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<UploadLocation />} />
          <Route path="/location/:id" element={<LocationDetail />} />
          <Route path="/location/:locationId/image/:imageIndex" element={<ImageDetail />} />
          <Route path="/scouts" element={<LocationScouts />} />
          <Route path="/scout/:id" element={<ScoutProfile />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
