import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Users, MapPin, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "@/hooks/useContent";
import heroVideo from "@/assets/hero-solar.mp4";
import trainingImage from "@/assets/training-facility.avif";
import eitLogo from "@/assets/logos/eit-innoenergy.png";
import werkLogo from "@/assets/logos/werk.png";
import iomLogo from "@/assets/logos/iom.png";
import bmwkLogo from "@/assets/logos/bmwk.png";
import scLogo from "@/assets/logos/sc-logomark.png";
import ehbElektro from "@/assets/logos/ehbElektroGmbH.png";
import greenTech from "@/assets/logos/greentech.training.png";
import Projektmarkthalle from "@/assets/logos/ProjektmarkthalleStadtteilzentrumPrenzlauerbergOst.png";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // CMS Integration - loads content but falls back to hardcoded values
  const { content } = useContent('home');

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const modules = content.modules || [
    "Fundamentals of Solar PV Energy",
    "System Components & Design Principles",
    "Safe Installation & On-Site Practice",
    "Commissioning, Maintenance & Troubleshooting",
    "German Electrical Standards & Regulations",
  ];

  const partners = [
    { name: "BMWK", logo: bmwkLogo },
    { name: "WERK", logo: werkLogo },
    // { name: "IOM", logo: iomLogo },
    { name: "EIT InnoEnergy", logo: eitLogo },
    // { name: "ehbElektro", logo: ehbElektro },
    { name: "Projektmarkthalle", logo: Projektmarkthalle },
    { name: "Greentech.training", logo: greenTech },
  ];

  const requirements = content.requirements || [
    "You are 18 years or older",
    "You have B1 level German (or higher)",
    "You have a strong academic record \n in STEM fields",
    "You have access to a laptop\n for online learning",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative h-[650px] overflow-hidden bg-primary mt-[80px]">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-primary/65" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-in-up">
              {content.hero?.title || "Start Your Career in the Energy Transition"}
            </h1>
            <p
              className="text-xl text-primary-foreground/95 mb-8 leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {content.hero?.subtitle || "Become a certified Solar Technician."}<br /> {content.hero?.subtitle2 || "The pilot program is 100% free."}
            </p>
            <Link to="/enroll">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg transition-all hover:shadow-lg animate-scale-in rounded-sm"
                style={{ animationDelay: "0.4s" }}
              >
                {content.hero?.buttonText || "Apply Now"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* THE OPPORTUNITY */}
      <section className="py-24 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {content.opportunity?.title || "New EU-Wide Harmonised Solar Training"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.opportunity?.description || "The German pilot of a new, internationally-recognized Solar Technician certification is launching to meet the demands of new EU regulations. This community-driven initiative combines expert-led online learning with hands-on practical training. The program trains technicians in the latest IEC and VDE standards, as well as new EU requirements and the mandatory installations required by the Energy Performance of Buildings Directive."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                { icon: Award, title: content.infoCards?.[0]?.title || "100% Free", subtitle: content.infoCards?.[0]?.subtitle || "(Pilot Program Only)", delay: "0ms" },
                { icon: MapPin, title: content.infoCards?.[1]?.title || "Bremerhaven and Berlin ", subtitle: content.infoCards?.[1]?.subtitle || "WERK At Partnering Facilities", delay: "100ms" },
                { icon: Users, title: content.infoCards?.[2]?.title || "EU-wide harmonised training", subtitle: content.infoCards?.[2]?.subtitle || "European Solar Academy", delay: "200ms" },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="scroll-reveal opacity-0 translate-y-8 transition-all duration-500 border-border hover:border-primary hover:shadow-md bg-card rounded-sm"
                  style={{ transitionDelay: item.delay }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <item.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-card-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          <div className="scroll-reveal opacity-0 scale-95 transition-all duration-700">
            <div className="relative overflow-hidden rounded-sm shadow-lg">
              <img src={trainingImage} alt="Solar training facility" className="w-full h-[450px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                <p className="text-primary-foreground text-2xl font-semibold">Training Facility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL LEARN */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left side text */}
            <div className="scroll-reveal opacity-0 -translate-x-8 transition-all duration-700">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Gain the Skills for a <br /> High-Demand Career
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                The program blends expert-led online theory with hands-on practical training. 
                Participants will be ready to install, maintain, and design PV systems.
              </p>
              <ul className="space-y-5 mb-10">
                {modules.map((module, idx) => (
                  <li
                    key={idx}
                    className="scroll-reveal opacity-0 translate-x-4 transition-all duration-500 flex items-start gap-4"
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-foreground text-sm sm:text-md md:text-lg">{module}</span>
                  </li>
                ))}
              </ul>
              <Link to="/program">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-sm font-semibold"
                >
                  See Full Curriculum
                </Button>
              </Link>
            </div>
            {/* Right side - YouTube thumbnail + animation */}
            <div className="scroll-reveal opacity-0 translate-x-8 transition-all duration-700">
              <div className="relative bg-muted rounded-sm aspect-video flex items-center justify-center overflow-hidden border border-border hover:border-primary transition-all shadow-md group">
                {!isPlaying ? (
                  <>
                    <img
                      src="https://img.youtube.com/vi/9as0byD8oZU/hqdefault.jpg"
                      alt="Training video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition-colors duration-500"></div>
                    {/* TEXT + PLAY BUTTON */}
                    <div
                      className="relative z-20 text-center p-10 cursor-pointer"
                      onClick={() => setIsPlaying(true)}
                    >
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                        <Play className="w-8 h-8 text-secondary-foreground" fill="currentColor" />
                      </div>
                    </div>
                    {/* WAVE ANIMATION — Wider + thicker */}
                    <div
                      className="
                        absolute left-1/2 -translate-x-1/2 
                        bottom-[22%] sm:bottom-[20%]
                        flex items-end gap-[4px]
                        opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500 
                        z-10 pointer-events-none
                        w-[85%]   /* makes the wave wide */
                        justify-center
                      "
                    >
                      {[...Array(35)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-secondary rounded-full animate-wave"
                          style={{
                            width: "4px",                        // thicker
                            animationDelay: `${i * 0.07}s`,
                            height: `${Math.random() * 45 + 20}px`, // taller for more effect
                          }}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/9as0byD8oZU?autoplay=1"
                    title="Training video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO CAN ENROLL */}
      <section className="py-24 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {content.enrollTitle || "Power Your Future"}
            </h2>
            <p className="text-sm sm:text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.enrollSubtitle || "The only requirements for the pilot program are:"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {requirements.map((req, idx) => (
              <Card
                key={idx}
                className="scroll-reveal opacity-0 scale-95 transition-all duration-500 border-border hover:border-secondary hover:shadow-md bg-card rounded-sm"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <img src={scLogo} alt="Solar Catalyst logo" className="w-10 h-10 object-contain" />
                  </div>
                  <p className="text-card-foreground whitespace-pre-line text-sm sm:text-md md:text-lg">{req}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {content.partnersTitle || "Backed by Global Leaders in Energy & Innovation"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {content.partnersSubtitle || "This program is made possible through a partnership with leading community and international organizations."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {partners.map((partner, idx) => (
              <div
                key={partner.name}
                className="scroll-reveal opacity-0 translate-y-8 transition-all duration-500"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="h-32 bg-card border border-border rounded-sm flex items-center justify-center p-6 hover:border-primary hover:shadow-md transition-all">
                  <img src={partner.logo} alt={`${partner.name} logo`} className="max-h-32 w-auto object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 text-center scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {content.finalCTA?.title || "Don't Miss This. Your Solar Career Starts Here."}
          </h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto whitespace-pre-line">
            {content.finalCTA?.subtitle || "Apply for the free Bremerhaven or Berlin pilot programs today. Spaces are limited."}
          </p>
          <Link to="/enroll">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-10 py-6 text-lg transition-all hover:shadow-xl rounded-sm"
            >
              {content.finalCTA?.buttonText || "Apply now"}
            </Button>
          </Link>
        </div>
      </section>

      <style>{`
        .scroll-reveal.show {
          opacity: 1 !important;
          transform: translate(0, 0) scale(1) !important;
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .animate-wave {
          animation: wave 1.2s ease-in-out infinite;
          transform-origin: center bottom;
        }
      `}</style>
    </div>
  );
};

export default Home;