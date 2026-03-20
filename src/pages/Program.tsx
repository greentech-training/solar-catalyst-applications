import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Clock, MapPin, Award, CheckCircle, Zap, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "@/hooks/useContent";
import scLogo from "@/assets/logos/sc-logomark.png";
import scLogoWhite from "@/assets/logos/sc-logomark-white.png";
import { Battery, ClipboardCheck, ShieldCheck, Cpu, Hammer, Cable, Plug, Wrench } from "lucide-react";

const Program = () => {
  // CMS Integration - optional, falls back to hardcoded
  const { content } = useContent('program');

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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {content.hero?.title || "From Theory to Installation:"}<br />{content.hero?.subtitle || "A Complete Solar Education"}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {content.hero?.description || "This is not just a course; it's a career path. Our \"blended learning\" model combines flexible online modules with essential, hands-on workshop training. You will learn the 'why' and the 'how' of solar energy."}
            </p>
          </div>
        </div>
      </section>

      {/* Key Info Boxes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Cost", value: "100% Free", subtitle: "(Pilot Program)", delay: "0ms" },
              { icon: MapPin, title: "Location", value: "Berlin", subtitle: "(at Kulturmarkthalle)", delay: "100ms" },
              { icon: CheckCircle, title: "Accreditation", value: "EU-wide \nHarmonised Training", subtitle: "(via InnoEnergy's European Solar Academy)", delay: "200ms" },
              { icon: Clock, title: "Eligibility", value: "Open to All", subtitle: "(18+ years with CEF-B1 German)", delay: "300ms" },
            ].map((item, idx) => (
              <Card 
                key={idx}
                className="scroll-reveal opacity-0 translate-y-6 transition-all duration-500 text-center border-border hover:border-primary hover:shadow-md rounded-sm"
                style={{ transitionDelay: item.delay }}
              >
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-base text-muted-foreground font-normal">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground whitespace-pre-line">{item.value}</p>
                  <p className="text-muted-foreground text-sm mt-1 whitespace-pre-line">{item.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 md:py-28 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {content.curriculum?.title || "Course Curriculum"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {content.curriculum?.description || "The program combines structured theoretical knowledge with essential hands-on practical training. You'll master both the science and real-world application of solar energy systems."}
            </p>
          </div>

          {/* Theoretical Modules */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Theoretical Modules
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Theoretical 1: Fundamentals of Solar PV Technology",
                  description:
                    "Understanding PV principles, system components, panel types, and new EU Eco-design rules covering product efficiency and also durability.",
                  icon: Zap,
                },
                {
                  title: "Theoretical 2: PV System Types & Energy Storage",
                  description:
                    "Detailing On-Grid, Off-Grid, and Hybrid systems, including battery technology and safe electrical integration.",
                  icon: Battery,
                },
                {
                  title: "Theoretical 3: Site Assessment & System Design",
                  description:
                    "Analyzing roof angles and shading to optimize system sizing, while complying with EPBD (Solar Rooftop Initiative) mandates for new and existing buildings.",
                  icon: MapPin,
                },
                {
                  title: "Theoretical 4: Project Management & Preparation",
                  description:
                    "Covering project lifecycles, milestone tracking, and managing essential pre-installation documentation.",
                  icon: ClipboardCheck,
                },
                {
                  title: "Theoretical 5: Installation Safety & Best Practices",
                  description:
                    "Focusing on DGUV Vorschrift 3 protocols, correct PPE usage, and safe handling of DC electricity and batteries.",
                  icon: ShieldCheck,
                },
                {
                  title: "Theoretical 6: System Programming & Energy Calculation",
                  description:
                    "Performing electric energy calculations, programming inverter settings, and testing module performance.",
                  icon: Cpu,
                },
              ].map((module, index) => {
                const Icon = module.icon;
                return (
                  <Card
                    key={index}
                    className="scroll-reveal opacity-0 translate-x-6 transition-all duration-500 border-border hover:border-primary hover:shadow-md rounded-sm"
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {module.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Practical Modules */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Practical Modules
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Practical 1: Mounting Structures & Physical Installation",
                  description:
                    "Hands-on practice installing mounting structures and physically securing solar panels on both flat and sloped roofs, ensuring compliance with DIN EN 1991 and new EPBD 'solar ready' building standards.",
                  icon: Hammer,
                },
                {
                  title: "Practical 2: Electrical Wiring & DC Connections",
                  description:
                    "Hands-on practice wiring all DC-side components, including string cabling, DC isolators, and batteries, following\n VDE 0100-712 standards.",
                  icon: Cable,
                },
                {
                  title: "Practical 3: Inverter Mounting & DC Commissioning",
                  description:
                    "Covering the physical mounting of inverters, connecting all DC-side inputs, and preparing the AC output for final connection by a certified electrician.",
                  icon: Plug,
                },
                {
                  title: "Practical 4: Operations, Maintenance & Troubleshooting",
                  description:
                    "Learning systematic troubleshooting according to IEC 62446, including DC-side repair and understanding the new\n A-G Energy Labels for modules.",
                  icon: Wrench,
                },
              ].map((module, index) => {
                const Icon = module.icon;
                return (
                  <Card
                    key={index}
                    className="scroll-reveal opacity-0 translate-x-6 transition-all duration-500 border-border hover:border-primary hover:shadow-md rounded-sm"
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {module.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Training in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch interviews with previous participants of our program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { id: "ldLoVQ4ywDk", title: "Solar Technician Training", delay: "0ms" },
              { id: "GHVpQlqd5Z8", title: "On-grid/Off-grid", delay: "100ms" },
              { id: "Q-RqpJqscBc", title: "Future Perspectives", delay: "200ms" },
            ].map((video, idx) => {
              const [isPlaying, setIsPlaying] = useState(false);

              return (
                <div
                  key={idx}
                  className="scroll-reveal opacity-0 scale-95 transition-all duration-500"
                  style={{ transitionDelay: video.delay }}
                >
                  <div
                    className="relative bg-muted rounded-sm overflow-hidden border border-border hover:border-primary transition-all shadow-md hover:shadow-lg aspect-video cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  >
                    {!isPlaying ? (
                      <>
                        {/* YouTube thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                          }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                          </div>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/90 to-transparent">
                          <h3 className="text-primary-foreground font-semibold text-sm">{video.title}</h3>
                        </div>
                      </>
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visit channel link */}
          <div
            className="text-center mt-10 scroll-reveal opacity-0 translate-y-6 transition-all duration-700"
            style={{ transitionDelay: "300ms" }}
          >
            <a
              href="https://www.youtube.com/@greentech.training"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-sm font-semibold"
              >
                View All Videos on YouTube →
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm mb-6">
              <img src={scLogoWhite} alt="Solar Catalyst logo" className="w-30 h-30 object-contain" />
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6">
              {content.accreditation?.title || "A Certification That Opens Doors Across Europe"}
            </h2>
            <p className="text-xs sm:text-md md:text-xl opacity-95 mb-10 leading-relaxed">
              {content.accreditation?.description || "This curriculum is being developed with support from InnoEnergy, the BMWK, and the IOM to create a new, EU-wide standard for Solar Technicians. This qualification is designed to give participants energy autonomy and career mobility with European employers powering the energy transition."}
            </p>

            {/* Professional badge list */}
            <div className="flex flex-wrap justify-center gap-3">
              {["EPBD-Ready", "Climate Career Kickstart", "Professional Mobility", "International Focus"].map((badge, idx) => (
                <div 
                  key={idx}
                  className="px-5 py-2 bg-secondary/20 rounded-sm border border-secondary/30 text-primary-foreground text-sm font-medium"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-6">
              {content.finalCTA?.title || "Ready to Begin Your Solar Career?"}
            </h2>
            <p className="text-sm sm:text-md md:text-xl text-muted-foreground mb-10">
              {content.finalCTA?.subtitle || "Apply for the free Berlin pilot program today. Spaces are limited."}
            </p>
            
            <Link to="/enroll">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-10 py-6 rounded-sm transition-all hover:shadow-lg"
              >
                {content.finalCTA?.buttonText || "Apply Now →"}
              </Button>
            </Link>
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

export default Program;