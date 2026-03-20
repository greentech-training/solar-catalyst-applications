import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Program from "./pages/Program";
import About from "./pages/About";
import Locations from "./pages/Locations";
import FAQ from "./pages/FAQ";
import Enroll from "./pages/Enroll";
import HiringPartners from "./pages/HiringPartners";
import NotFound from "./pages/NotFound";
import ImprintPrivacy from "./pages/ImprintPrivacy";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import CMSAdmin from "./pages/CMSAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/program" element={<Program />} />
              <Route path="/about" element={<About />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/hiring-partners" element={<HiringPartners />} />
              <Route path="/imprint-privacy" element={<ImprintPrivacy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              <Route path="/cms-admin" element={<CMSAdmin />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner /> 
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
