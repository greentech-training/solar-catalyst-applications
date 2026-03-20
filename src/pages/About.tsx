import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, Award, TrendingUp, Target, Zap, Briefcase } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import scLogo from "@/assets/logos/sc-logomark.png";
import bmwkLogo from "@/assets/logos/bmwk.png";
import oanaPenu from "@/assets/Oana-Penu.jpg";

const About = () => {
  // CMS Integration - optional, falls back to hardcoded
  const { content } = useContent('about');

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
      <section className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
              {content.hero?.title || "Building an international harmonised\n approach to training green skills"}
            </h1>
            <p className="text-lg sm:text-lg md:text-xl opacity-95 max-w-3xl mx-auto leading-relaxed">
              {content.hero?.description || "This initiative seeks to cultivate an international community of qualified technicians to power the energy transition. As a new approach to training, it focuses on"} <br /> {content.hero?.description2 || "empowerment, energy autonomy and professional integration."}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                logo: scLogo,
                title: "Global Benchmark",
                description:
                  "This European qualification provides a globally adaptable, high-quality framework for essential\n solar technical skills.",
                delay: "0ms",
              },
              {
                logo: scLogo,
                title: "Empowerment",
                description:
                  "Providing accessible pathways to green careers, fostering social integration and\n economic independence.",
                delay: "100ms",
              },
              {
                logo: scLogo,
                title: "Excellence",
                description:
                  "Developing EU-wide harmonised training in partnership with leading organizations to ensure the highest quality training.",
                delay: "200ms",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="scroll-reveal opacity-0 translate-y-6 transition-all duration-500 border-border hover:border-primary hover:shadow-md rounded-sm"
                style={{ transitionDelay: item.delay }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <img
                      src={item.logo}
                      alt={`${item.title} logo`}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lebanon Pilot Section */}
      <LebanonPilotSection />

      {/* German Pilot Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {content.germanPilot?.title || "The German Pilot "}<span className="text-primary">{content.germanPilot?.titleHighlight || "(Solar Catalyst)"}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              {content.germanPilot?.description || "The pilot programs set to occur in Berlin and Bremerhaven have been crafted with local partners to best facilitate the unprecedented regional job growth projected for the solar sector."}
            </p>

            <div className="scroll-reveal opacity-0 scale-95 transition-all duration-700 bg-softyellow border border-border p-10 rounded-sm shadow-md text-center">
              
              {/* ✅ Replaced logo with Oana's photo */}
              <div className="flex justify-center mb-6">
                <img 
                  src={oanaPenu} 
                  alt="Oana Penu" 
                  className="w-24 h-24 rounded-full object-cover shadow-md object-top"
                />
              </div>

              <p className="text-lg text-foreground mb-4 leading-relaxed">
                {content.germanPilot?.quote || "71% of CEOs already cite skills shortages as their most significant business challenge."} 
                <br />{content.germanPilot?.quote2 || "We're dedicated to supporting green innovations of the future and ensuring"} <br />{content.germanPilot?.quote3 || "there is a trained workforce to achieve climate goals."}
              </p>

              {/* ✅ Broke line and centered attribution */}
              <p className="text-sm text-muted-foreground font-medium leading-snug">
                {content.germanPilot?.attribution || "— Oana Penu"} <br /> {content.germanPilot?.attribution2 || "InnoEnergy Skills Institute"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 md:py-28 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {content.partnersSection?.title || "Project Facilitators"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {content.partnersSection?.subtitle || "Working together to create the future of green energy training"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "InnoEnergy",
                description: "Co-developing the curriculum and \nEU-wide accreditation, bringing decades of experience in sustainable education.",
                delay: "0ms"
              },
              {
                title: "WERK",
                description: "Local community partner in Bremerhaven, hosting the practical training at their central facility.",
                delay: "100ms"
              },
              {
                title: "IOM",
                description: "International initator of the successful Lebanon pilot, providing expertise in integration and empowerment program.",
                delay: "200ms"
              },
              {
                "title": "greentech.training",
                "description": "A specialized training initiative bridging the skills gap by recruiting and preparing international talent for Germany's renewable energy sector through expert-led and \npractical education.",
                "delay": "300ms"
              },
              {
                "title": "KulturMarktHalle",
                "description": "A vibrant community hub that fosters social integration and neighborhood development, serving as the central location for community-embedded project activities in Berlin.",
                "delay": "400ms"
              },
              {
                "title": "Your company?",
                "description": "We are calling on forward-thinking installation and energy firms to join the Solar Catalyst initiative as employer partners to hire our graduates as apprentices (Azubis) or as full-time technical staff specializing in installation and design.",
                "delay": "500ms"
              }
            ].map((partner, idx) => (
              <Card 
                key={idx}
                className="scroll-reveal opacity-0 translate-y-6 transition-all duration-500 border-border hover:border-primary hover:shadow-md rounded-sm"
                style={{ transitionDelay: partner.delay }}
              >
                <CardContent className="p-6">
                  <h3 className="text-l font-bold mb-3 text-foreground">
                    {partner.title}
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

      <style>{`
        .scroll-reveal.show {
          opacity: 1 !important;
          transform: translate(0, 0) scale(1) !important;
        }
      `}</style>
    </div>
  );
};

export default About;

/* ---------------- Lebanon Pilot Section with count-up animation ---------------- */
function LebanonPilotSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 215, suffix: " GW", label: "Germany's 2030 Solar Target", icon: Target, delay: "0ms" },
    { value: 86, suffix: "%", label: "Share of Jobs in Installation", icon: TrendingUp, delay: "100ms" },
    { value: 916000, suffix: "", label: "Projected EU Solar Jobs by 2029", icon: Briefcase, delay: "200ms" },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-softyellow">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              A Proven Model: From MENA to EU
            </h2>
          </div>
          <Card className="scroll-reveal opacity-0 scale-95 transition-all duration-700 border-border rounded-sm shadow-md">
            <CardContent className="p-10 text-center">
              
              {/* Added German Ministry logo above paragraph */}
              <div className="flex justify-center mb-8">
                <img 
                  src={bmwkLogo} 
                  alt="German Ministry for Economic Affairs and Climate Action" 
                  className="w-28 h-auto object-contain"
                />
              </div>

              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                The curriculum's framework was first applied internationally in Lebanon,
                supported by InnoEnergy and the International Organisation for Migration (IOM).
                With funding provided by Germany's Federal Ministry for Economic Affairs and Energy,
                the training program is now launching in Germany to meet the critical demands of the European energy transition.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, idx) => (
                  <StatBox key={idx} visible={visible} {...stat} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function StatBox({ visible, value, suffix, label, icon: Icon, delay }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <div
      className="text-center scroll-reveal opacity-0 translate-y-4 transition-all duration-500"
      style={{ transitionDelay: delay }}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-sm mb-3">
        <Icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
      </div>
      <div className="text-4xl font-bold text-secondary mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
}