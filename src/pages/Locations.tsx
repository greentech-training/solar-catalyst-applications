import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Globe } from "lucide-react";
import { useEffect } from "react";
import { useContent } from "@/hooks/useContent";
import eitLogo from "@/assets/logos/eit-innoenergy.png";
import werkLogo from "@/assets/logos/werk.png";
import iomLogo from "@/assets/logos/iom.png";
import werkFacility from "@/assets/werk-facility.png";
import scLogo from "@/assets/logos/sc-logomark.png";
import ehbElektro from "@/assets/logos/ehbElektroGmbH.png";
import greenTech from "@/assets/logos/greentech.training.png";
import Projektmarkthalle from "@/assets/logos/ProjektmarkthalleStadtteilzentrumPrenzlauerbergOst.png";

const Locations = () => {
  // CMS Integration - optional, falls back to hardcoded
  const { content } = useContent('locations');

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const partners = [
    {
      name: "InnoEnergy",
      logo: eitLogo,
      description: "Co-developing the curriculum and EU-wide accreditation.",
      delay: "0ms",
    },
    {
      name: "WERK",
      logo: werkLogo,
      description: "WERK Bremerhaven - Coming 2027",
      delay: "100ms",
    },
    // {
    //   name: "IOM",
    //   logo: iomLogo,
    //   description: "Our international partner from the successful Lebanon pilot.",
    //   delay: "200ms",
    // },
        {
      name: "greentech.training",
      logo: greenTech,
      description: "Preparing international talent for Germany's renewable energy sector.",
      delay: "0ms",
    },
    {
      name: "Projektmarkthalle Stadtteilzentrum Prenzlauerberg Ost",
      logo: Projektmarkthalle,
      description: "Vibrant community hub fostering social integration in Berlin.",
      delay: "100ms",
    },
    // {
    //   name: "Your Company?",
    //   logo: ehbElektro,
    //   description: "Join Us Contact us to discuss hiring, co-training and sponsorship opportunities.",
    //   delay: "200ms",
    // },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
              <img src={scLogo} alt="Solar Catalyst logo" className="w-30 h-30 object-contain" />
            </div>
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              {content.hero?.title || "Training Facilities"}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.hero?.description || "The first German program is hosted in partnership with Kulturmarkthalle in Berlin and WERK in Bremerhaven (feasible start Q4 2026) . These community-focused facilities offer a central and accessible location, ideal for hands-on installation training."}
            </p>
          </div>
        </div>
      </section>

      {/* Bremerhaven Facility Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-4">
                {content.facility?.title || "KulturMarktHalle Berlin"}
              </h2>
              <p className="text-sm sm:text-md md:text-lg text-muted-foreground">
                {content.facility?.subtitle || "Hosted by WERK, at the heart of Germany's renewable energy hub"}
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Left: Facility Photo */}
              <div className="scroll-reveal opacity-0 translate-x-6 transition-all duration-700 h-full flex">
                <img
                  src={werkFacility}
                  alt="Bremerhaven facility"
                  className="rounded-sm shadow-lg w-full h-full object-cover"
                />
              </div>

              {/* Right: Map + Address */}
              <div className="scroll-reveal opacity-0 -translate-x-6 transition-all duration-700 flex flex-col justify-between h-full space-y-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.2!2d13.4378!3d52.5292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e8b0b0b0b0b%3A0x0!2sHanns-Eisler-Str.%2093%2C%2010409%20Berlin!5e0!3m2!1sen!2sde!4v1730799427000!5m2!1sen!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-sm shadow-lg flex-1"
                />

                {/* Address Card */}
                <Card className="w-full border-border rounded-sm shadow-md mt-6">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0">
                      <img src={scLogo} alt="Solar Catalyst logo" className="w-10 h-10 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {content.facility?.addressTitle || "WERK Bremerhaven"}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {content.facility?.address || "An der Mühle 45, 27570 Bremerhaven, Germany"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 md:py-28 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {content.partners?.title || "Project Facilitators"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {content.partners?.subtitle || "Working together to deliver world-class solar training"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partners.map((partner, idx) => (
              <Card
                key={idx}
                className="scroll-reveal opacity-0 translate-y-6 transition-all duration-500 border-border hover:border-primary hover:shadow-md rounded-sm"
                style={{ transitionDelay: partner.delay }}
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-24 flex items-center justify-center mb-6">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-20 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-l font-bold mb-3 text-foreground">
                    {partner.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Locations */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-reveal opacity-0 scale-90 transition-all duration-700">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-sm mb-6">
                <Globe className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {content.futureLocations?.title || "Interested in being a trainer?"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {content.futureLocations?.description || "Contact us if you have at least 2 years installation experience and are able to dedicate a week to training future coherts at one of our partner facilities."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .scroll-reveal.show {
          opacity: 1 !important;
          transform: translate(0, 0) scale(1) !important;
        }
      `}</style>
    </div>
  );
};

export default Locations;