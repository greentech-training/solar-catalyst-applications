// src/components/CookieBanner.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        // Apply saved preferences
        applyPreferences(saved);
      } catch (e) {
        console.error("Error loading cookie preferences:", e);
      }
    }
  }, []);

  const applyPreferences = (prefs: CookiePreferences) => {
    // Apply analytics cookies
    if (prefs.analytics) {
      // Enable Google Analytics or similar
      // window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
    
    // Apply marketing cookies
    if (prefs.marketing) {
      // Enable marketing pixels
      // window.gtag('consent', 'update', { 'ad_storage': 'granted' });
    }
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    applyPreferences(prefs);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    savePreferences(onlyNecessary);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-border shadow-lg animate-slide-in-up">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Left: Text */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                We use cookies
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to improve your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or reject non-essential cookies.{" "}
                <a 
                  href="/imprint#privacy" 
                  className="text-primary hover:underline font-medium"
                >
                  Read our Cookie Policy
                </a>
              </p>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowSettings(true)}
                className="border-2 border-border text-foreground hover:bg-muted rounded-sm font-semibold w-full sm:w-auto"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Preferences
              </Button>
              <Button
                variant="outline"
                onClick={handleRejectAll}
                className="border-2 border-border text-foreground hover:bg-muted rounded-sm font-semibold w-full sm:w-auto"
              >
                Reject All
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-sm font-semibold w-full sm:w-auto"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl">Cookie Preferences</DialogTitle>
            <DialogDescription className="text-base">
              Choose which cookies you want to allow. You can change these settings at any time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-3 pb-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      id="necessary"
                      checked={true}
                      disabled={true}
                      className="cursor-not-allowed"
                    />
                    <Label htmlFor="necessary" className="text-base font-semibold cursor-not-allowed">
                      Necessary Cookies
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-9">
                    These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.
                  </p>
                </div>
                <span className="text-xs font-medium text-muted-foreground ml-4">Always Active</span>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3 pb-4 border-b border-border">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      id="analytics"
                      checked={preferences.analytics}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, analytics: checked as boolean })
                      }
                    />
                    <Label htmlFor="analytics" className="text-base font-semibold cursor-pointer">
                      Analytics Cookies
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-9">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                  </p>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      id="marketing"
                      checked={preferences.marketing}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, marketing: checked as boolean })
                      }
                    />
                    <Label htmlFor="marketing" className="text-base font-semibold cursor-pointer">
                      Marketing Cookies
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-9">
                    These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleRejectAll}
              className="flex-1 border-2 border-border rounded-sm font-semibold"
            >
              Reject All
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm font-semibold"
            >
              Save Preferences
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-sm font-semibold"
            >
              Accept All
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes slide-in-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CookieBanner;