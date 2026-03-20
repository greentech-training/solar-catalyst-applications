import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, Eye, CheckCircle2, AlertCircle, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CMSLogin from "@/components/CMSLogin";

const CMSAdmin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedPage, setSelectedPage] = useState('home');
  const [content, setContent] = useState<any>({});
  const [jsonView, setJsonView] = useState('');
  const [viewMode, setViewMode] = useState<'form' | 'json'>('form');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFYlCms_hPHW0dU3i41wvHpgz-RM_q8CpVxgOEK7KcvSYWIuTtJq6B1UhoFIJ-qXHs/exec";
  const pages = ['home', 'program', 'about', 'locations', 'faq', 'enroll', 'hiring', 'settings'];

  useEffect(() => {
    const authenticated = sessionStorage.getItem("cmsAuthenticated");
    const user = sessionStorage.getItem("cmsUser");
    if (authenticated === "true" && user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadContent(selectedPage);
      setHasChanges(false);
    }
  }, [selectedPage, isAuthenticated]);

  const handleLoginSuccess = () => {
    const user = sessionStorage.getItem("cmsUser");
    setIsAuthenticated(true);
    setCurrentUser(user || "User");
    toast({ title: "Welcome!", description: `Logged in as ${user}` });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setCurrentUser("");
    toast({ title: "Logged out", description: "You have been logged out successfully" });
  };

  const loadContent = async (page: string) => {
    try {
      const response = await fetch(`/content/${page}.json`);
      const data = await response.json();
      setContent(data);
      setJsonView(JSON.stringify(data, null, 2));
    } catch (error) {
      toast({ title: "Error", description: `Failed to load ${page} content`, variant: "destructive" });
    }
  };

  const handleInputChange = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
    setJsonView(JSON.stringify(newContent, null, 2));
    setHasChanges(true);
  };

  const handleArrayChange = (path: string, index: number, value: string) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1) {
        if (!Array.isArray(current[keys[i]])) current[keys[i]] = [];
        current[keys[i]][index] = value;
      } else {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
    }
    setContent(newContent);
    setJsonView(JSON.stringify(newContent, null, 2));
    setHasChanges(true);
  };

  const handleSaveToSheets = async () => {
    if (GOOGLE_SCRIPT_URL === "https://script.google.com/macros/s/AKfycbxFYlCms_hPHW0dU3i41wvHpgz-RM_q8CpVxgOEK7KcvSYWIuTtJq6B1UhoFIJ-qXHs/exec") {
      toast({ title: "Setup Required", description: "Please configure the Google Script URL first.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: selectedPage,
          content: jsonView,
          timestamp: new Date().toISOString(),
          editor: currentUser
        }),
      });
      toast({ title: "✅ Changes Saved!", description: `Your changes to ${selectedPage}.json will be live in ~30 seconds!` });
      setHasChanges(false);
    } catch (error) {
      toast({ title: "Save Failed", description: "Could not save changes.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonView], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPage}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded!", description: `${selectedPage}.json downloaded` });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setContent(data);
        setJsonView(JSON.stringify(data, null, 2));
        setHasChanges(true);
        toast({ title: "Loaded!", description: "Content loaded from file" });
      } catch (error) {
        toast({ title: "Error", description: "Invalid JSON file", variant: "destructive" });
      }
    };
    reader.readAsText(file);
  };

  // ALL FORM RENDERERS
const renderHomeForm = () => (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.hero?.title || ''} onChange={(e) => handleInputChange('hero.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Input value={content.hero?.subtitle || ''} onChange={(e) => handleInputChange('hero.subtitle', e.target.value)} /></div>
          <div><Label>Subtitle 2</Label><Input value={content.hero?.subtitle2 || ''} onChange={(e) => handleInputChange('hero.subtitle2', e.target.value)} /></div>
          <div><Label>Button Text</Label><Input value={content.hero?.buttonText || ''} onChange={(e) => handleInputChange('hero.buttonText', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Opportunity Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.opportunity?.title || ''} onChange={(e) => handleInputChange('opportunity.title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.opportunity?.description || ''} onChange={(e) => handleInputChange('opportunity.description', e.target.value)} rows={4} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Enroll Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Enroll Title</Label><Input value={content.enrollTitle || ''} onChange={(e) => handleInputChange('enrollTitle', e.target.value)} /></div>
          <div><Label>Enroll Subtitle</Label><Input value={content.enrollSubtitle || ''} onChange={(e) => handleInputChange('enrollSubtitle', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Partners Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Partners Title</Label><Input value={content.partnersTitle || ''} onChange={(e) => handleInputChange('partnersTitle', e.target.value)} /></div>
          <div><Label>Partners Subtitle</Label><Textarea value={content.partnersSubtitle || ''} onChange={(e) => handleInputChange('partnersSubtitle', e.target.value)} rows={2} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Final CTA</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.finalCTA?.title || ''} onChange={(e) => handleInputChange('finalCTA.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Textarea value={content.finalCTA?.subtitle || ''} onChange={(e) => handleInputChange('finalCTA.subtitle', e.target.value)} rows={2} /></div>
          <div><Label>Button Text</Label><Input value={content.finalCTA?.buttonText || ''} onChange={(e) => handleInputChange('finalCTA.buttonText', e.target.value)} /></div>
        </CardContent>
      </Card>
      <div className="bg-muted p-4 rounded-sm"><p className="text-sm text-muted-foreground"><strong>Note:</strong> Info cards, modules, and requirements arrays are best edited in JSON view.</p></div>
    </div>
  );

  const renderProgramForm = () => (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.hero?.title || ''} onChange={(e) => handleInputChange('hero.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Input value={content.hero?.subtitle || ''} onChange={(e) => handleInputChange('hero.subtitle', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.hero?.description || ''} onChange={(e) => handleInputChange('hero.description', e.target.value)} rows={3} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Curriculum Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Curriculum Title</Label><Input value={content.curriculum?.title || ''} onChange={(e) => handleInputChange('curriculum.title', e.target.value)} /></div>
          <div><Label>Curriculum Description</Label><Textarea value={content.curriculum?.description || ''} onChange={(e) => handleInputChange('curriculum.description', e.target.value)} rows={2} /></div>
          <div><Label>Theoretical Modules Title</Label><Input value={content.curriculum?.theoreticalTitle || ''} onChange={(e) => handleInputChange('curriculum.theoreticalTitle', e.target.value)} /></div>
          <div><Label>Practical Modules Title</Label><Input value={content.curriculum?.practicalTitle || ''} onChange={(e) => handleInputChange('curriculum.practicalTitle', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Video Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Video Section Title</Label><Input value={content.videoSection?.title || ''} onChange={(e) => handleInputChange('videoSection.title', e.target.value)} /></div>
          <div><Label>Video Section Description</Label><Textarea value={content.videoSection?.description || ''} onChange={(e) => handleInputChange('videoSection.description', e.target.value)} rows={2} /></div>
          <div><Label>Video Button Text</Label><Input value={content.videoSection?.buttonText || ''} onChange={(e) => handleInputChange('videoSection.buttonText', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Accreditation</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.accreditation?.title || ''} onChange={(e) => handleInputChange('accreditation.title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.accreditation?.description || ''} onChange={(e) => handleInputChange('accreditation.description', e.target.value)} rows={3} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Final CTA</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.finalCTA?.title || ''} onChange={(e) => handleInputChange('finalCTA.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Textarea value={content.finalCTA?.subtitle || ''} onChange={(e) => handleInputChange('finalCTA.subtitle', e.target.value)} rows={2} /></div>
          <div><Label>Button Text</Label><Input value={content.finalCTA?.buttonText || ''} onChange={(e) => handleInputChange('finalCTA.buttonText', e.target.value)} /></div>
        </CardContent>
      </Card>
      <div className="bg-muted p-4 rounded-sm"><p className="text-sm text-muted-foreground"><strong>Note:</strong> Info cards, theoretical/practical modules, and video arrays are best edited in JSON view.</p></div>
    </div>
  );

  const renderAboutForm = () => (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Textarea value={content.hero?.title || ''} onChange={(e) => handleInputChange('hero.title', e.target.value)} rows={2} /></div>
          <div><Label>Description</Label><Textarea value={content.hero?.description || ''} onChange={(e) => handleInputChange('hero.description', e.target.value)} rows={3} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Lebanon Pilot</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.lebanonPilot?.title || ''} onChange={(e) => handleInputChange('lebanonPilot.title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.lebanonPilot?.description || ''} onChange={(e) => handleInputChange('lebanonPilot.description', e.target.value)} rows={3} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>German Pilot</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.germanPilot?.title || ''} onChange={(e) => handleInputChange('germanPilot.title', e.target.value)} /></div>
          <div><Label>Title Highlight</Label><Input value={content.germanPilot?.titleHighlight || ''} onChange={(e) => handleInputChange('germanPilot.titleHighlight', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.germanPilot?.description || ''} onChange={(e) => handleInputChange('germanPilot.description', e.target.value)} rows={2} /></div>
          <div><Label>Quote</Label><Textarea value={content.germanPilot?.quote || ''} onChange={(e) => handleInputChange('germanPilot.quote', e.target.value)} rows={2} /></div>
          <div><Label>Attribution</Label><Input value={content.germanPilot?.attribution || ''} onChange={(e) => handleInputChange('germanPilot.attribution', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Partners Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.partnersSection?.title || ''} onChange={(e) => handleInputChange('partnersSection.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Input value={content.partnersSection?.subtitle || ''} onChange={(e) => handleInputChange('partnersSection.subtitle', e.target.value)} /></div>
        </CardContent>
      </Card>
      <div className="bg-muted p-4 rounded-sm"><p className="text-sm text-muted-foreground"><strong>Note:</strong> Mission cards, stats, and partners arrays are best edited in JSON view.</p></div>
    </div>
  );

  const renderLocationsForm = () => (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.hero?.title || ''} onChange={(e) => handleInputChange('hero.title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.hero?.description || ''} onChange={(e) => handleInputChange('hero.description', e.target.value)} rows={2} /></div>
          <div><Label>Description 2</Label><Input value={content.hero?.description2 || ''} onChange={(e) => handleInputChange('hero.description2', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Facility</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.facility?.title || ''} onChange={(e) => handleInputChange('facility.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Input value={content.facility?.subtitle || ''} onChange={(e) => handleInputChange('facility.subtitle', e.target.value)} /></div>
          <div><Label>Address Title</Label><Input value={content.facility?.addressTitle || ''} onChange={(e) => handleInputChange('facility.addressTitle', e.target.value)} /></div>
          <div><Label>Address</Label><Input value={content.facility?.address || ''} onChange={(e) => handleInputChange('facility.address', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Partners Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.partners?.title || ''} onChange={(e) => handleInputChange('partners.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Input value={content.partners?.subtitle || ''} onChange={(e) => handleInputChange('partners.subtitle', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Future Locations</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.futureLocations?.title || ''} onChange={(e) => handleInputChange('futureLocations.title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.futureLocations?.description || ''} onChange={(e) => handleInputChange('futureLocations.description', e.target.value)} rows={2} /></div>
          <div><Label>Description 2</Label><Input value={content.futureLocations?.description2 || ''} onChange={(e) => handleInputChange('futureLocations.description2', e.target.value)} /></div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFAQForm = () => (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.hero?.title || ''} onChange={(e) => handleInputChange('hero.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Input value={content.hero?.subtitle || ''} onChange={(e) => handleInputChange('hero.subtitle', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Call to Action (CTA)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.cta?.title || ''} onChange={(e) => handleInputChange('cta.title', e.target.value)} /></div>
          <div><Label>Description 1</Label><Textarea value={content.cta?.description || ''} onChange={(e) => handleInputChange('cta.description', e.target.value)} rows={2} /></div>
          <div><Label>Description 2</Label><Textarea value={content.cta?.description2 || ''} onChange={(e) => handleInputChange('cta.description2', e.target.value)} rows={2} /></div>
          <div><Label>Button Text</Label><Input value={content.cta?.buttonText || ''} onChange={(e) => handleInputChange('cta.buttonText', e.target.value)} /></div>
        </CardContent>
      </Card>
      <div className="bg-muted p-4 rounded-sm"><p className="text-sm text-muted-foreground"><strong>Note:</strong> FAQ questions/answers are best edited in JSON view.</p></div>
    </div>
  );

  const renderEnrollForm = () => (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.hero?.title || ''} onChange={(e) => handleInputChange('hero.title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.hero?.description || ''} onChange={(e) => handleInputChange('hero.description', e.target.value)} rows={4} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Application Form</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Form Title</Label><Input value={content.form?.title || ''} onChange={(e) => handleInputChange('form.title', e.target.value)} /></div>
          <div><Label>STEM Question Label</Label><Textarea value={content.form?.stemQuestionLabel || ''} onChange={(e) => handleInputChange('form.stemQuestionLabel', e.target.value)} rows={4} /></div>
          <div><Label>Consent Label</Label><Input value={content.form?.consentLabel || ''} onChange={(e) => handleInputChange('form.consentLabel', e.target.value)} /></div>
          <div><Label>Submit Button Text</Label><Input value={content.form?.submitButtonText || ''} onChange={(e) => handleInputChange('form.submitButtonText', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Success Message</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.successMessage?.title || ''} onChange={(e) => handleInputChange('successMessage.title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.successMessage?.description || ''} onChange={(e) => handleInputChange('successMessage.description', e.target.value)} rows={2} /></div>
          <div><Label>Note</Label><Input value={content.successMessage?.note || ''} onChange={(e) => handleInputChange('successMessage.note', e.target.value)} /></div>
        </CardContent>
      </Card>
      <div className="bg-muted p-4 rounded-sm"><p className="text-sm text-muted-foreground"><strong>Note:</strong> Process steps array is best edited in JSON view.</p></div>
    </div>
  );

  const renderHiringForm = () => (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.hero?.title || ''} onChange={(e) => handleInputChange('hero.title', e.target.value)} /></div>
          <div><Label>Subtitle</Label><Input value={content.hero?.subtitle || ''} onChange={(e) => handleInputChange('hero.subtitle', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.hero?.description || ''} onChange={(e) => handleInputChange('hero.description', e.target.value)} rows={3} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Benefits Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.benefitsSection?.title || ''} onChange={(e) => handleInputChange('benefitsSection.title', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>What You Get Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.whatYouGetSection?.title || ''} onChange={(e) => handleInputChange('whatYouGetSection.title', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>CTA Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={content.cta?.title || ''} onChange={(e) => handleInputChange('cta.title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea value={content.cta?.description || ''} onChange={(e) => handleInputChange('cta.description', e.target.value)} rows={2} /></div>
          <div><Label>Download Button Text</Label><Input value={content.cta?.downloadButtonText || ''} onChange={(e) => handleInputChange('cta.downloadButtonText', e.target.value)} /></div>
          <div><Label>Contact Button Text</Label><Input value={content.cta?.contactButtonText || ''} onChange={(e) => handleInputChange('cta.contactButtonText', e.target.value)} /></div>
          <div><Label>Contact Note</Label><Input value={content.cta?.contactNote || ''} onChange={(e) => handleInputChange('cta.contactNote', e.target.value)} /></div>
        </CardContent>
      </Card>
      <div className="bg-muted p-4 rounded-sm"><p className="text-sm text-muted-foreground"><strong>Note:</strong> Benefits array and what-you-get-content are best edited in JSON view.</p></div>
    </div>
  );

  const renderSettingsForm = () => (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>Contact Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Email</Label><Input value={content.contact?.email || ''} onChange={(e) => handleInputChange('contact.email', e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={content.contact?.phone || ''} onChange={(e) => handleInputChange('contact.phone', e.target.value)} /></div>
          <div><Label>Address</Label><Input value={content.contact?.address || ''} onChange={(e) => handleInputChange('contact.address', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Program Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Start Date</Label><Input value={content.program?.startDate || ''} onChange={(e) => handleInputChange('program.startDate', e.target.value)} /></div>
          <div><Label>Location</Label><Input value={content.program?.location || ''} onChange={(e) => handleInputChange('program.location', e.target.value)} /></div>
          <div><Label>Cost</Label><Input value={content.program?.cost || ''} onChange={(e) => handleInputChange('program.cost', e.target.value)} /></div>
          <div><Label>Duration</Label><Input value={content.program?.duration || ''} onChange={(e) => handleInputChange('program.duration', e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Company Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Company Name</Label><Input value={content.company?.name || ''} onChange={(e) => handleInputChange('company.name', e.target.value)} /></div>
          <div><Label>VAT Number</Label><Input value={content.company?.vatNumber || ''} onChange={(e) => handleInputChange('company.vatNumber', e.target.value)} /></div>
          <div><Label>Representative</Label><Input value={content.company?.representative || ''} onChange={(e) => handleInputChange('company.representative', e.target.value)} /></div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isAuthenticated) return <CMSLogin onLoginSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Content Management System</h1>
            <p className="text-muted-foreground">Edit website content and save changes instantly</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Logged in as</p>
              <p className="font-semibold text-foreground">{currentUser}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="rounded-sm">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>
        </div>

        {hasChanges && (
          <Alert className="mb-6 border-orange-500 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">You have unsaved changes. Click "Save Changes" to deploy them.</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3 mb-6 flex-wrap">
          {pages.map((page) => (
            <Button key={page} variant={selectedPage === page ? "default" : "outline"} onClick={() => setSelectedPage(page)} className="rounded-sm">
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </Button>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          <Button variant={viewMode === 'form' ? "default" : "outline"} onClick={() => setViewMode('form')} className="rounded-sm">
            <Eye className="w-4 h-4 mr-2" />Form View
          </Button>
          <Button variant={viewMode === 'json' ? "default" : "outline"} onClick={() => setViewMode('json')} className="rounded-sm">
            <Eye className="w-4 h-4 mr-2" />JSON View
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Edit Content</CardTitle></CardHeader>
              <CardContent>
                {viewMode === 'form' ? (
                  <>
                    {selectedPage === 'home' && renderHomeForm()}
                    {selectedPage === 'program' && renderProgramForm()}
                    {selectedPage === 'about' && renderAboutForm()}
                    {selectedPage === 'locations' && renderLocationsForm()}
                    {selectedPage === 'faq' && renderFAQForm()}
                    {selectedPage === 'enroll' && renderEnrollForm()}
                    {selectedPage === 'hiring' && renderHiringForm()}
                    {selectedPage === 'settings' && renderSettingsForm()}
                  </>
                ) : (
                  <Textarea value={jsonView} onChange={(e) => { setJsonView(e.target.value); setHasChanges(true); try { setContent(JSON.parse(e.target.value)); } catch (e) {} }} rows={25} className="font-mono text-sm" />
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleSaveToSheets} disabled={!hasChanges || isSaving} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-sm font-semibold text-lg py-6">
                  {isSaving ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Saving...</>) : (<><CheckCircle2 className="w-5 h-5 mr-2" />Save Changes</>)}
                </Button>
                <div className="bg-green-50 border border-green-200 rounded-sm p-3">
                  <p className="text-xs text-green-800"><strong>Auto-Deploy:</strong> Changes go live in ~30 seconds!</p>
                </div>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Backup</span></div>
                </div>
                <Button onClick={handleDownload} variant="outline" className="w-full rounded-sm">
                  <Download className="w-4 h-4 mr-2" />Download JSON
                </Button>
                <div>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-border rounded-sm p-4 text-center hover:border-primary transition-colors">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload JSON</p>
                    </div>
                  </Label>
                  <input id="file-upload" type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                </div>
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-2 text-sm">Quick Guide:</h4>
                  <ol className="text-sm text-muted-foreground space-y-2">
                    <li>1. Edit content above</li>
                    <li>2. Click "Save Changes"</li>
                    <li>3. Wait 30 seconds</li>
                    <li>4. Check live site!</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSAdmin;