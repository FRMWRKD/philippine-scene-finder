
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LocationDetail from "./pages/LocationDetail";
import LocationScouts from "./pages/LocationScouts";
import ScoutProfile from "./pages/ScoutProfile";
import UploadLocation from "./pages/UploadLocation";
import HowItWorks from "./pages/HowItWorks";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/location/:id" element={<LocationDetail />} />
          <Route path="/scouts" element={<LocationScouts />} />
          <Route path="/scout/:id" element={<ScoutProfile />} />
          <Route path="/upload" element={<UploadLocation />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
