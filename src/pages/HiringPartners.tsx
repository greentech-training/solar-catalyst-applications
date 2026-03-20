import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Award, BookOpen, Wrench, FileCheck } from "lucide-react";
import { useEffect } from "react";
import { useContent } from "@/hooks/useContent";
import scLogo from "@/assets/logos/sc-logomark-white.png";

const HiringPartners = () => {
  const { content } = useContent('hiring');

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

  const benefits = content.benefits || [
    "Access to pre-screened, certified\n talent ready to work",
    "Technicians trained in the latest EU-wide standards and safety protocols",
    "Reduce your internal training costs and time-to-hire significantly",
    "Graduates with both theoretical knowledge and hands-on practical experience",
    "Support the energy transition while building your\n skilled workforce",
    "Partnership opportunities for curriculum input and early recruitment access"
  ];

  const whatYouGet = [
    {
      icon: Award,
      title: "EU-Wide Certification",
      description: "Developed in partnership with InnoEnergy, our certification meets the highest European standards for solar technician training. Your new hires will have credentials designed to be recognized across the continent.",
      delay: "0ms"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Training",
      description: "Our blended learning model ensures graduates understand both the theory and practice of solar installation. From system design to safety protocols, technicians are prepared for both field and office work.",
      delay: "100ms"
    },
    {
      icon: Wrench,
      title: "Hands-On Experience",
      description: "All graduates complete extensive practical training at our WERK facility in Bremerhaven, working with\n real equipment and also simulating the actual installation scenarios.",
      delay: "200ms"
    },
    {
      icon: FileCheck,
      title: "German Standards Compliance",
      description: "Our curriculum includes comprehensive training on German electrical standards and regulations, ensuring your new technicians can work safely and compliantly from day one.",
      delay: "300ms"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
              <img src={scLogo} alt="Solar Catalyst logo" className="w-30 h-30 object-contain" />
            </div>
            <h1 className="text-xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {content.hero?.title || "Hire Germany's Next Generation"}<br />{content.hero?.subtitle || "of Solar Technicians"}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl opacity-95 max-w-3xl mx-auto leading-relaxed">
              {content.hero?.description || "Our graduates are trained to a new EU-wide standard of excellence. They complete a rigorous program of online theory and hands-on practical installation, making them job-ready from day one."}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {content.benefitsSection?.title || "Benefits for SME Installation Companies"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className="scroll-reveal opacity-0 translate-y-6 transition-all duration-500 border-border hover:border-secondary hover:shadow-md rounded-sm"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-8 h-8 bg-secondary/20 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-secondary" strokeWidth={2} />
                    </div>
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {benefit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 md:py-28 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {content.whatYouGetSection?.title || "What Our Graduates Bring to Your Team"}
              </h2>
            </div>
            <div className="space-y-6">
              {whatYouGet.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card 
                    key={index} 
                    className="scroll-reveal opacity-0 translate-x-6 transition-all duration-500 border-border hover:border-primary hover:shadow-md rounded-sm"
                    style={{ transitionDelay: item.delay }}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-3 text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {item.description}
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

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-6">
                {content.cta?.title || "Partner With Us"}
              </h2>
              <p className="text-md sm:text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                {content.cta?.description || "Join our network of hiring partners and get early access to our certified graduates. Download our program brochure or contact us to learn more about partnership opportunities."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal opacity-0 scale-95 transition-all duration-700 mb-10" style={{ transitionDelay: "200ms" }}>
              <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-sm transition-all"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = 'https://greentech.training/wp-content/uploads/2026/02/Solar-Catalyst-Broschure.pdf';
                    link.download = 'Solar-Catalyst-Brochure.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  {content.cta?.downloadButtonText || "Download Program Brochure"}
                </Button>
              <a href="mailto:partners@greentech.training">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-sm font-semibold"
                >
                  {content.cta?.contactButtonText || "Contact Us"}
                </Button>
              </a>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 p-6 bg-softyellow border border-border rounded-sm" style={{ transitionDelay: "400ms" }}>
              <p className="text-sm text-muted-foreground">
                {content.cta?.contactNote || "For partnership inquiries, please contact us at:"}{" "}
                <a 
                  href="mailto:partners@greentech.training" 
                  className="text-primary hover:underline font-medium"
                >
                  info@greentech.training
                </a>
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

export default HiringPartners;