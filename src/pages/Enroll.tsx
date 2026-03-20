import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const Enroll = () => {
  const { toast } = useToast();
  const { content } = useContent('enroll');

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

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    city: "",
    hasGerman: "",
    hasLaptop: "",
    stemExperience: "",
    interviewDays: [] as string[],
    interviewTime: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please confirm that the information provided is accurate.",
        variant: "destructive",
      });
      return;
    }

    if (formData.interviewDays.length === 0) {
      toast({
        title: "Interview Day Required",
        description: "Please select at least one day for the interview.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYYJXlb_SdsC5YhQ6sIyK9UJ09_18zi4BccqtIXJml4UL_FM7M6m_RdVUVfXWijF-VlA/exec";
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      console.log("Form submitted:", formData);
      setSubmitted(true);
      
      toast({
        title: "Application Submitted!",
        description: "We'll contact you within 5-7 business days.",
      });
      
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDayChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interviewDays: checked 
        ? [...prev.interviewDays, day]
        : prev.interviewDays.filter(d => d !== day)
    }));
  };

  const processSteps = content.processSteps || [
    "Submit Application",
    "Online Interview",
    "Review",
    "Acceptance",
    "Program Start",
  ];

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-muted">
        <div className="container mx-auto px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto shadow-lg border-border rounded-sm">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-secondary" strokeWidth={2} />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {content.successMessage?.title || "Thank You for Applying!"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {content.successMessage?.description || "We have received your application. Our team will review it and contact you via email within 5-7 business days to schedule your online interview."}
              </p>
              <p className="text-muted-foreground">
                {content.successMessage?.note || "Please check your email regularly, including your spam folder, for our response."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {content.hero?.title || "Apply Now"}
            </h1>
            <p className="text-lg sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">            
              {content.hero?.description || "Selection for the pilot programs is based on a number of criteria: It is open to anyone in Germany aged over 18 with at least a CEF-B1 German level. Selection will be based on previous STEM performance, location, demonstrated civic engagement, and expressed desire to enter a climate career. Online training for selected participated is slated to begin in the first quarter of 2026, with practical training at the partnering facilities commencing after successful completion of the online component."}
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="relative flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              {/* Dotted Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 border-t-4 border-secondary border-dotted z-0"></div>

              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative text-center flex-1 min-w-[50px] sm:min-w-[80px] lg:min-w-[120px] z-10 scroll-reveal opacity-0 translate-y-4 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold mx-auto mb-2 text-sm sm:text-base shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-[8px] sm:text-sm font-medium text-foreground whitespace-nowrap">
                    {step}
                  </p>
                  {index === 4 && (
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                      Q2 2026
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto shadow-lg border-border rounded-sm scroll-reveal opacity-0 scale-95 transition-all duration-700">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                {content.form?.title || "Application Form"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Part 1: Personal Information */}
                <div className="space-y-4 scroll-reveal opacity-0 translate-y-6 transition-all duration-500" style={{ transitionDelay: '100ms' }}>
                  <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                  
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                      className="rounded-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      disabled={isSubmitting}
                      className="rounded-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+49 123 456 7890"
                      disabled={isSubmitting}
                      className="rounded-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Street name and number"
                      disabled={isSubmitting}
                      className="rounded-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postcode">Postcode *</Label>
                      <Input
                        id="postcode"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                        placeholder="12345"
                        disabled={isSubmitting}
                        className="rounded-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="City name"
                        disabled={isSubmitting}
                        className="rounded-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Part 2: Pre-Screening Questionnaire */}
                <div className="space-y-4 pt-6 border-t border-border scroll-reveal opacity-0 translate-y-6 transition-all duration-500" style={{ transitionDelay: '200ms' }}>
                  <h3 className="text-lg font-semibold text-foreground">Pre-Screening Questionnaire</h3>
                  
                  <div>
                    <Label>Do you have B1-level German or higher? *</Label>
                    <RadioGroup
                      required
                      value={formData.hasGerman}
                      onValueChange={(value) => setFormData({...formData, hasGerman: value})}
                      disabled={isSubmitting}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="german-yes" disabled={isSubmitting} />
                        <Label htmlFor="german-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="german-no" disabled={isSubmitting} />
                        <Label htmlFor="german-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Do you have access to a laptop and reliable internet? *</Label>
                    <RadioGroup
                      required
                      value={formData.hasLaptop}
                      onValueChange={(value) => setFormData({...formData, hasLaptop: value})}
                      disabled={isSubmitting}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="laptop-yes" disabled={isSubmitting} />
                        <Label htmlFor="laptop-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="laptop-no" disabled={isSubmitting} />
                        <Label htmlFor="laptop-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="stemExperience">
                      {content.form?.stemQuestionLabel || "Please explain why you are seeking a career in climate, your current German level, and finish by briefly describing your academic record in STEM (Science, Tech, Engineering, Math). You can answer in German or English. *"}
                    </Label>
                    <Textarea
                      id="stemExperience"
                      required
                      value={formData.stemExperience}
                      onChange={(e) => setFormData({...formData, stemExperience: e.target.value})}
                      placeholder="Tell us about your education, work experience, or projects related to STEM fields..."
                      rows={5}
                      disabled={isSubmitting}
                      className="rounded-sm"
                    />
                  </div>
                </div>

                {/* Part 3: Interview Scheduling */}
                <div className="space-y-4 pt-6 border-t border-border scroll-reveal opacity-0 translate-y-6 transition-all duration-500" style={{ transitionDelay: '300ms' }}>
                  <h3 className="text-lg font-semibold text-foreground">Interview Scheduling</h3>
                  
                  <div>
                    <Label>What is the best day of the week for an online interview? *</Label>
                    <div className="space-y-2 mt-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={formData.interviewDays.includes(day)}
                            onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                            disabled={isSubmitting}
                          />
                          <Label htmlFor={day} className="font-normal">{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>What is the best time of day for you? *</Label>
                    <RadioGroup
                      required
                      value={formData.interviewTime}
                      onValueChange={(value) => setFormData({...formData, interviewTime: value})}
                      disabled={isSubmitting}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="time-morning" disabled={isSubmitting} />
                        <Label htmlFor="time-morning">Morning</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="time-afternoon" disabled={isSubmitting} />
                        <Label htmlFor="time-afternoon">Afternoon</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Part 4: Confirmation */}
                <div className="space-y-4 pt-6 border-t border-border scroll-reveal opacity-0 translate-y-6 transition-all duration-500" style={{ transitionDelay: '400ms' }}>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="consent" className="font-normal">
                      {content.form?.consentLabel || "I confirm the information provided is accurate and I consent to be contacted about my application. *"}
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-sm transition-all scroll-reveal opacity-0 translate-y-4 duration-500"
                  disabled={isSubmitting}
                  style={{ transitionDelay: '500ms' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    content.form?.submitButtonText || "Submit My Application"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
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

export default Enroll;