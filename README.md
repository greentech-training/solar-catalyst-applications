# Solar Catalyst Program Website

Official website for the Solar Catalyst Program - EU-wide solar technician training initiative in Bremerhaven, Germany.

## 🌟 About the Project

This website serves as the primary platform for the Solar Catalyst pilot program, a partnership between EIT InnoEnergy, WERK, and IOM. The program offers free, EU-certified solar technician training to qualified applicants in Bremerhaven.

### Key Features

- 🎓 **Program Information** - Comprehensive curriculum and certification details
- 📝 **Online Enrollment** - Integrated application form with Google Sheets backend
- 🎥 **Video Gallery** - Training showcase from our YouTube channel
- 🌍 **Multi-stakeholder Support** - Information for students, partners, and hiring companies
- ♿ **Accessible Design** - WCAG compliant, mobile-responsive interface
- 🎨 **Professional Animations** - Scroll-triggered, government-appropriate UX

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd solar-catalyst-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Routing:** React Router v6
- **Backend Integration:** Google Apps Script (Forms → Google Sheets)

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── Navigation.tsx # Main navigation component
├── pages/             # Route pages
│   ├── Home.tsx
│   ├── Program.tsx
│   ├── About.tsx
│   ├── Locations.tsx
│   ├── FAQ.tsx
│   ├── Enroll.tsx
│   └── HiringPartners.tsx
├── assets/            # Images and static files
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── App.tsx            # Main application component
```

## 🎨 Design System

### Color Palette

- **Primary Blue:** `hsl(215 85% 25%)` - Main brand color
- **Secondary Orange:** `hsl(30 95% 55%)` - Solar energy accent
- **Accent Yellow:** `hsl(45 100% 51%)` - Highlights
- **Gradients:** Custom solar-themed gradients

### Typography

- **Font Family:** DM Sans (Google Fonts)
- **Weights:** 400 (Regular), 500 (Medium), 700 (Bold)

## 📝 Form Integration Setup

The enrollment form integrates with Google Sheets via Google Apps Script.

### Setup Instructions:

1. Create a Google Sheet with columns:
   ```
   Timestamp | Full Name | Email | Phone | Has German | Has Laptop | 
   STEM Experience | Interview Days | Interview Time | Consent
   ```

2. Add Apps Script (Extensions → Apps Script):
   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     
     sheet.appendRow([
       new Date(),
       data.fullName,
       data.email,
       data.phone,
       data.hasGerman,
       data.hasLaptop,
       data.stemExperience,
       data.interviewDays.join(", "),
       data.interviewTime,
       data.consent
     ]);
     
     return ContentService.createTextOutput(JSON.stringify({ success: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Deploy as Web App and copy the URL

4. Update `src/pages/Enroll.tsx`:
   ```typescript
   const GOOGLE_SCRIPT_URL = "YOUR_DEPLOYED_WEB_APP_URL";
   ```

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Code Style

- ESLint + TypeScript strict mode
- Prettier for formatting (recommended)
- Conventional Commits for git messages

## 📄 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with program overview |
| Program | `/program` | Curriculum and learning modules |
| About | `/about` | Mission, history, and pilot story |
| Locations | `/locations` | Training facility information |
| FAQ | `/faq` | Frequently asked questions |
| Enroll | `/enroll` | Application form |
| Hiring Partners | `/hiring-partners` | B2B information for employers |

## 🤝 Contributing

This is a closed-source project for the Solar Catalyst Program. For inquiries, contact the development team.

## 📧 Contact

- **Program Inquiries:** info@solarcatalyst.training
- **Partnership Opportunities:** partners@greentech.training
- **Technical Support:** dev@solarcatalyst.training

## 📜 License

© 2025 Solar Catalyst Program. All rights reserved.

Developed in partnership with EIT InnoEnergy, WERK, and IOM.

---

**Built with ❤️ for the energy transition**