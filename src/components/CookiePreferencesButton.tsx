// src/components/CookiePreferencesButton.tsx
// This button allows users to reopen cookie settings at any time

import { useState } from "react";
import { Cookie } from "lucide-react";

const CookiePreferencesButton = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    // Remove consent to show banner again
    localStorage.removeItem("cookie-consent");
    // Reload page to trigger banner
    window.location.reload();
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
      aria-label="Manage cookie preferences"
    >
      <Cookie className="w-4 h-4" />
      Cookie Preferences
    </button>
  );
};

export default CookiePreferencesButton;