import { useEffect } from "react";
import { FileText, Shield } from "lucide-react";
import scLogo from "@/assets/logos/sc-logomark-white.png";

const ImprintPrivacy = () => {
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
      { 
        threshold: 0.05,
        rootMargin: "0px 0px -100px 0px" 
     }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
              <img src={scLogo} alt="Solar Catalyst logo" className="w-30 h-30 object-contain" />
            </div>
            <h1 className="text-xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Imprint & Privacy Policy
            </h1>
            <p className="text-sm sm:text-lg md:text-xl opacity-95 max-w-3xl mx-auto leading-relaxed">
              Legal information and data protection notice
            </p>
          </div>
        </div>
      </section>

      {/* Imprint Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Imprint
              </h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Project Coordinator</h3>
                  <p>greentech.training</p>
                  <p>Represented by Jerome Goerke</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Mailing Address</h3>
                  <p>Goerzallee 299</p>
                  <p>14167 Berlin Zehlendorf</p>
                  <p>Germany</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Contact</h3>
                  <p>Email: <a href="mailto:info@greentech.training" className="text-primary hover:underline">info@greentech.training</a></p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">VAT Identification Number</h3>
                  <p>Identification number according to §27a UStG-Id.Nr.: DE253336600</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Responsible for Content</h3>
                  <p>Managing Director: Jerome Goerke</p>
                  <p>Implementation & Design: greentech.training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section className="py-20 md:py-28 bg-softyellow">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
              <div className="flex items-center gap-3 mb-8">
                <Shield className="w-8 h-8 text-primary" strokeWidth={1.5} />
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Privacy Policy
                </h2>
              </div>

              <div className="space-y-10 text-muted-foreground leading-relaxed">
                {/* General Information */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">General Information</h3>
                  <p className="mb-4">
                    The following notices provide a simple overview of what happens to your personal data when you visit this website.
                  </p>
                  <p>
                    Personal data is any data by which you can be personally identified. The privacy policy provides more detailed information on data protection.
                  </p>
                </div>

                {/* Data Collection */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Data Collection on This Website</h3>
                  
                  <h4 className="text-xl font-semibold text-foreground mb-3">Who is responsible for data collection on this website?</h4>
                  <p className="mb-4">
                    Data processing on this website is carried out by the website operator. You can find the contact details of the website operator in the section "Imprint" above.
                  </p>

                  <h4 className="text-xl font-semibold text-foreground mb-3">How do we collect your data?</h4>
                  <p className="mb-4">
                    On the one hand, your data is collected by you providing it to us. This may, for example, be data that you enter in a contact form.
                  </p>
                  <p className="mb-4">
                    Other data is collected automatically or with your consent by our IT systems when you visit the website. This is mainly technical data (e.g. internet browser, operating system or time of page view). This data is collected automatically as soon as you enter this website.
                  </p>

                  <h4 className="text-xl font-semibold text-foreground mb-3">What do we use your data for?</h4>
                  <p className="mb-4">
                    Some of the data is collected in order to ensure error-free provision of the website. Other data may be used to analyse your user behaviour, or to contact you.
                  </p>

                  <h4 className="text-xl font-semibold text-foreground mb-3">What rights do you have regarding your data?</h4>
                  <p className="mb-4">
                    You have the right at any time to receive information free of charge about the origin, recipient and purpose of your stored personal data. You also have the right to request the correction or deletion of this data. If you have given your consent to data processing, you can revoke this consent at any time for the future. You also have the right to request the restriction of the processing of your personal data under certain circumstances. Furthermore, you have the right to lodge a complaint with the competent supervisory authority.
                  </p>
                  <p>
                    You can contact us at any time about this and any other questions you may have on the subject of data protection.
                  </p>
                </div>

                {/* Hosting */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Hosting</h3>
                  <p className="mb-4">
                    We host our website with Strato. The provider is Strato AG, Otto-Ostrowski-Straße 7, 10249 Berlin (hereinafter "Strato"). When you visit our website, Strato collects various log files including your IP addresses.
                  </p>
                  <p className="mb-4">
                    For more information, please refer to Strato's privacy policy: <a href="https://www.strato.de/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.strato.de/datenschutz/</a>
                  </p>
                  <p>
                    The use of Strato is based on Art. 6 para. 1 lit. f DSGVO. We have a legitimate interest in ensuring that our website is presented as reliably as possible. If a corresponding consent has been requested, the processing is carried out exclusively on the basis of Art. 6 para. 1 lit. a DSGVO and § 25 para. 1 TTDSG, insofar as the consent includes the storage of cookies or access to information in your terminal device (e.g. device fingerprinting) as defined by the TTDSG. The consent can be revoked at any time.
                  </p>
                </div>

                {/* Data Protection Officer */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Data Protection Officer</h3>
                  <p className="mb-2">We have appointed a data protection officer for our company:</p>
                  <p>Jerome Goerke</p>
                  <p>Email: <a href="mailto:info@greentech.training" className="text-primary hover:underline">info@greentech.training</a></p>
                </div>

                {/* Controller */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Data Controller</h3>
                  <p className="mb-4">
                    The responsible party for data processing on this website is:
                  </p>
                  <p>greentech.training</p>
                  <p>Represented by Jerome Goerke</p>
                  <p>Email: <a href="mailto:info@greentech.training" className="text-primary hover:underline">info@greentech.training</a></p>
                  <p className="mb-4">Mailing Address: Goerzallee 299, 14167 Berlin Zehlendorf</p>
                  <p>
                    The data controller is the natural or legal person who alone or jointly with others determines the purposes and means of the processing of personal data (e.g. names, e-mail addresses, etc.).
                  </p>
                </div>

                {/* Storage & Processing */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Storage & Processing</h3>
                  <p className="mb-4">
                    Unless a more specific storage period has been specified within this privacy policy, your personal data will remain with us until the purpose for processing the data no longer applies. If you assert a legitimate request for deletion or revoke consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g. retention periods under tax or commercial law); in the latter case, the data will be deleted once these reasons no longer apply.
                  </p>
                  <p className="mb-4">
                    If you have consented to data processing, we process your personal data on the basis of Art. 6 para. 1 lit. a DSGVO or Art. 9 para. 2 lit. a DSGVO if special categories of data are processed in accordance with Art. 9 para. 1 DSGVO. In the event of express consent to the transfer of personal data to third countries, data processing is also carried out on the basis of Art. 49 para. 1 lit. a DSGVO.
                  </p>
                  <p className="mb-4">
                    For evidentiary purposes, we must retain contractual data for three years from the end of the year in which the business relationship with you ends. Any claims become statute-barred at this point at the earliest in accordance with the standard statutory limitation period.
                  </p>
                  <p>
                    Even after this, we still have to store some of your data for accounting reasons. We are obliged to do so because of legal documentation obligations that may arise from the German Commercial Code, the German Fiscal Code, the German Banking Act and the German Money Laundering Act. The periods specified there for the retention of documents are two to ten years.
                  </p>
                </div>

                {/* Application Data */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Data Transmitted as Part of an Application</h3>
                  <p className="mb-4">
                    You can apply for advertised vacancies or solicit your interest by e-mail or via our contact form. The purpose of the data collection is the selection of applicants for the possible establishment of an employment relationship with partner companies. In order to process applications from partner companies and applicants, we collect the data provided by you (usually in the first instance name and e-mail address; and in the second instance application documents such as certificates and CV).
                  </p>
                  <p className="mb-4">
                    Your application data is stored in Germany via our secure server with Strato. The legal basis for the processing of your application documents is Art. 6 para. 1 lit. b and Art. 88 para. 1 DSGVO in conjunction with § 26 para. 1 p. 1 BDSG.
                  </p>
                  <p>
                    If we reject your application, we will store your application data for a maximum of three months after rejecting your application, unless you give us your consent to store it for a longer period. You can revoke this consent for the future at any time by sending us an email to <a href="mailto:info@greentech.training" className="text-primary hover:underline">info@greentech.training</a>.
                  </p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Online Presence in Social Networks</h3>
                  <p className="mb-4">
                    We maintain an online presence in social networks in order to communicate with interested parties and to inform them about our services:
                  </p>
                  <p className="mb-4">
                    LinkedIn Company Page of LinkedIn Ireland Unlimited Company, Wilton Place, Dublin 2, Ireland ("LinkedIn")
                  </p>
                  <p className="mb-4">
                    The legal basis for this data processing is Art. 6 para. 1 lit. b DSGVO, in order to stay in contact with our customers and to inform them, as well as for the implementation of pre-contractual measures with interested parties, and 6 para. 1 lit. f DSGVO, based on our legitimate interest in effective information and communication with users.
                  </p>
                  <p>
                    For more information on LinkedIn's data practices, please visit their <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </div>

                {/* Google Meet */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Online Meetings via Google Meet</h3>
                  <p className="mb-4">
                    We use "Google Meet" to conduct online meetings, conference calls and/or webinars. Meet is software from Google LLC, 1600 Amphitheatre Parkway, Mountain View, California, U.S.
                  </p>
                  <p className="mb-4">
                    The legal basis for the processing of data to conduct meetings via Google Meet is our legitimate interest in the effective and simple conduct of online meetings, discussion rounds and presentations pursuant to Art. 6 (1) lit. f DSGVO.
                  </p>
                  <p>
                    During a meeting, various data may be processed including participant details, metadata, chat messages, audio/video recordings, and screen sharing content. Before a meeting, you register via our website contact form or by e-mail.
                  </p>
                </div>

                {/* Data Transfer */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Passing On of Data</h3>
                  <p className="mb-4">
                    The data collected by us will only be passed on if:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>You have given your express consent in accordance with Art. 6 Para. 1 lit. a DSGVO</li>
                    <li>The disclosure is necessary for the assertion, exercise or defence of legal claims</li>
                    <li>We are legally obliged to disclose your data according to Art. 6 para. 1 lit. c DSGVO</li>
                    <li>This is legally permissible and necessary for the processing of contractual relationships</li>
                  </ul>
                  <p>
                    Part of the data processing may be carried out by our service providers. The service providers have been carefully selected and commissioned by us. They are contractually bound to our instructions and are regularly monitored by us.
                  </p>
                </div>

                {/* Third Country Transfer */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Data Transfer to Third Countries</h3>
                  <p className="mb-4">
                    We use services whose providers are partly located in so-called third countries (such as the USA), i.e. countries whose level of data protection does not correspond to that of the European Union. Where this is the case and the European Commission has not issued an adequacy decision for these countries, we have taken appropriate precautions to ensure an adequate level of data protection for any data transfers.
                  </p>
                </div>

                {/* Your Rights */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Your Rights</h3>
                  <p className="mb-4">
                    You have the right to request information about the processing of your personal data by us at any time. When you request information, we will explain the data processing to you and provide you with an overview of the data stored about you.
                  </p>
                  <p className="mb-4">
                    If any data stored by us is incorrect or no longer up to date, you have the right to have this data corrected. You can also request the deletion of your data. You also have the right to data portability, which means that we will provide you with a digital copy of the personal data you have provided to us if you request it.
                  </p>
                  <p className="mb-4">
                    To exercise your rights as described here, you can contact us at any time at <a href="mailto:info@greentech.training" className="text-primary hover:underline">info@greentech.training</a>.
                  </p>
                  <p>
                    Finally, you have the right to complain to a data protection supervisory authority. In Berlin the competent supervisory authority is: Berlin Commissioner for Data Protection and Freedom of Information, Alt-Moabit 59-61, 10555 Berlin.
                  </p>
                </div>
              </div>
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

export default ImprintPrivacy;