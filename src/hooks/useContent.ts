// import { useState, useEffect } from 'react';

// // Default fallback content - matches your actual content structure
// const defaultContent: Record<string, any> = {
//   home: {
//     hero: {
//       title: "Start Your Career in the Energy Transition",
//       subtitle: "Become a certified Solar Technician.",
//       subtitle2: "The pilot program is 100% free.",
//       buttonText: "Apply Now"
//     },
//     opportunity: {
//       title: "New EU-Wide harmonised solar training",
//       description: "The German pilot of a new, internationally-recognized Solar Technician certification is launching to meet the demands of new EU regulations."
//     },
//     infoCards: [
//       { title: "100% Free", subtitle: "(Pilot Program Only)" },
//       { title: "Bremerhaven", subtitle: "WERK Facilities" },
//       { title: "EU-wide harmonised training", subtitle: "European Solar Academy" }
//     ],
//     modules: [
//       "Fundamentals of Solar PV Energy",
//       "System Components & Design Principles",
//       "Safe Installation & On-Site Practice",
//       "Commissioning, Maintenance & Troubleshooting",
//       "German Electrical Standards & Regulations"
//     ],
//     requirements: [
//       "You are 18 years or older",
//       "You have B1 level German (or higher)",
//       "You have a strong academic record \n in STEM fields",
//       "You have access to a laptop\n for online learning"
//     ],
//     enrollTitle: "Power Your Future",
//     enrollSubtitle: "The only requirements for the pilot program are:",
//     partnersTitle: "Backed by Global Leaders in Energy & Innovation",
//     partnersSubtitle: "This program is made possible through a partnership with leading community and international organizations.",
//     finalCTA: {
//       title: "Don't Miss This. Your Solar Career Starts Here.",
//       subtitle: "Apply for the free Bremerhaven pilot program today. Spaces are limited.",
//       buttonText: "Apply now"
//     }
//   },
//   program: {
//     hero: {
//       title: "From Theory to Installation:",
//       subtitle: "A Complete Solar Education",
//       description: "This is not just a course; it's a career path."
//     },
//     curriculum: {
//       title: "Course Curriculum",
//       description: "The program combines structured theoretical knowledge with essential hands-on practical training."
//     },
//     finalCTA: {
//       title: "Ready to Begin Your Solar Career?",
//       subtitle: "Apply for the free Bremerhaven pilot program today. Spaces are limited.",
//       buttonText: "Apply Now →"
//     }
//   },
//   about: {
//     hero: {
//       title: "Building an international harmonised approach to training green skills",
//       description: "This initiative seeks to cultivate an international community of qualified technicians to power the energy transition."
//     },
//     germanPilot: {
//       title: "The German Pilot ",
//       titleHighlight: "(Solar Catalyst)"
//     },
//     partnersSection: {
//       title: "Project Facilitators",
//       subtitle: "Working together to create the future of green energy training"
//     }
//   },
//   settings: {
//     contact: {
//       email: "info@greentech.training",
//       phone: "+49 123 456 7890",
//       address: "Goerzallee 299, 14167 Berlin Zehlendorf, Germany"
//     },
//     program: {
//       startDate: "Q1 2026",
//       location: "Bremerhaven",
//       cost: "100% Free",
//       duration: "Several months"
//     },
//     company: {
//       name: "greentech.training",
//       vatNumber: "DE253336600",
//       representative: "Jerome Goerke"
//     }
//   },
//   locations: {
//     hero: {
//       title: "Training at the WERK Facility",
//       description: "The first German program is hosted in partnership with WERK."
//     },
//     facility: {
//       title: "Bremerhaven Training Facility",
//       subtitle: "Hosted by WERK, at the heart of Germany's renewable energy hub"
//     }
//   },
//   faq: {
//     hero: {
//       title: "Frequently Asked Questions",
//       subtitle: "Find answers to common questions about the Solar Catalyst program"
//     },
//     cta: {
//       title: "Still Have Questions?",
//       buttonText: "Apply Now"
//     }
//   }
// };

// export function useContent(page: string) {
//   const [content, setContent] = useState<any>(defaultContent[page] || {});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch JSON file from public folder
//         const response = await fetch(`/content/${page}.json`);
        
//         if (!response.ok) {
//           throw new Error(`Failed to load content for ${page}`);
//         }
        
//         const data = await response.json();
//         setContent(data);
//         setError(null);
//       } catch (err) {
//         console.error(`Error loading content for ${page}:`, err);
//         setError(err instanceof Error ? err.message : 'Failed to load content');
//         // Use fallback content
//         setContent(defaultContent[page] || {});
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContent();
//   }, [page]);

//   return { content, loading, error };
// }

// // For accessing settings globally
// export function useSettings() {
//   return useContent('settings');
// }



import { useState, useEffect } from 'react';

// Default fallback content - matches your actual content structure
const defaultContent: Record<string, any> = {
  home: {
    hero: {
      title: "Start Your Career in the Energy Transition",
      subtitle: "Become a certified Solar Technician.",
      subtitle2: "The pilot program is 100% free.",
      buttonText: "Apply Now"
    },
    opportunity: {
      title: "New EU-Wide harmonised solar training",
      description: "The German pilot of a new, internationally-recognized Solar Technician certification is launching to meet the demands of new EU regulations."
    },
    infoCards: [
      { title: "100% Free", subtitle: "(Pilot Program Only)" },
      { title: "Bremerhaven", subtitle: "WERK Facilities" },
      { title: "EU-wide harmonised training", subtitle: "European Solar Academy" }
    ],
    modules: [
      "Fundamentals of Solar PV Energy",
      "System Components & Design Principles",
      "Safe Installation & On-Site Practice",
      "Commissioning, Maintenance & Troubleshooting",
      "German Electrical Standards & Regulations"
    ],
    requirements: [
      "You are 18 years or older",
      "You have B1 level German (or higher)",
      "You have a strong academic record \n in STEM fields",
      "You have access to a laptop\n for online learning"
    ],
    enrollTitle: "Power Your Future",
    enrollSubtitle: "The only requirements for the pilot program are:",
    partnersTitle: "Backed by Global Leaders in Energy & Innovation",
    partnersSubtitle: "This program is made possible through a partnership with leading community and international organizations.",
    finalCTA: {
      title: "Don't Miss This. Your Solar Career Starts Here.",
      subtitle: "Apply for the free Bremerhaven pilot program today. Spaces are limited.",
      buttonText: "Apply now"
    }
  },
  program: {
    hero: {
      title: "From Theory to Installation:",
      subtitle: "A Complete Solar Education",
      description: "This is not just a course; it's a career path."
    },
    curriculum: {
      title: "Course Curriculum",
      description: "The program combines structured theoretical knowledge with essential hands-on practical training."
    },
    finalCTA: {
      title: "Ready to Begin Your Solar Career?",
      subtitle: "Apply for the free Bremerhaven pilot program today. Spaces are limited.",
      buttonText: "Apply Now →"
    }
  },
  about: {
    hero: {
      title: "Building an international harmonised approach to training green skills",
      description: "This initiative seeks to cultivate an international community of qualified technicians to power the energy transition."
    },
    germanPilot: {
      title: "The German Pilot ",
      titleHighlight: "(Solar Catalyst)"
    },
    partnersSection: {
      title: "Project Facilitators",
      subtitle: "Working together to create the future of green energy training"
    }
  },
  settings: {
    contact: {
      email: "info@greentech.training",
      phone: "+49 123 456 7890",
      address: "Goerzallee 299, 14167 Berlin Zehlendorf, Germany"
    },
    program: {
      startDate: "Q1 2026",
      location: "Bremerhaven",
      cost: "100% Free",
      duration: "Several months"
    },
    company: {
      name: "greentech.training",
      vatNumber: "DE253336600",
      representative: "Jerome Goerke"
    }
  },
  locations: {
    hero: {
      title: "Training at the WERK Facility",
      description: "The first German program is hosted in partnership with WERK."
    },
    facility: {
      title: "Bremerhaven Training Facility",
      subtitle: "Hosted by WERK, at the heart of Germany's renewable energy hub"
    }
  },
  faq: {
    hero: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about the Solar Catalyst program"
    },
    cta: {
      title: "Still Have Questions?",
      buttonText: "Apply Now"
    }
  },
  enroll: {
    hero: {
      title: "Apply Now",
      description: "Selection for the pilot programs is based on a number of criteria..."
    },
    form: {
      title: "Application Form",
      submitButtonText: "Submit My Application"
    }
  },
  hiring: {
    hero: {
      title: "Hire Germany's Next Generation",
      subtitle: "of Solar Technicians"
    },
    cta: {
      title: "Partner With Us"
    }
  }
};

export function useContent(page: string) {
  const [content, setContent] = useState<any>(defaultContent[page] || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch JSON file from public folder
        const response = await fetch(`/content/${page}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to load content for ${page}`);
        }
        
        const data = await response.json();
        setContent(data);
        setError(null);
      } catch (err) {
        console.error(`Error loading content for ${page}:`, err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
        // Use fallback content
        setContent(defaultContent[page] || {});
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [page]);

  return { content, loading, error };
}

// For accessing settings globally
export function useSettings() {
  return useContent('settings');
}