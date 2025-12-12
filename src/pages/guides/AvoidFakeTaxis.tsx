import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle, XCircle, Shield, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AvoidFakeTaxis = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
              <span className="text-sm font-medium">{t.avoidFakeTaxis.badge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display mb-6">
              {t.avoidFakeTaxis.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {t.avoidFakeTaxis.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* 1. Introduction - The Real Problem */}
            <div className="mb-12">
              <h2 className="text-3xl font-display text-primary mb-4">{t.avoidFakeTaxis.problem.title}</h2>
              <p className="text-lg text-muted-foreground mb-4">
                {t.avoidFakeTaxis.problem.paragraph1}
              </p>
              <p className="text-lg text-muted-foreground">
                {t.avoidFakeTaxis.problem.paragraph2}
              </p>
            </div>

            {/* 2. How the Scam Works */}
            <div className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h2 className="text-3xl font-display text-primary mb-4 flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-500" />
                {t.avoidFakeTaxis.howScamWorks.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                {t.avoidFakeTaxis.howScamWorks.paragraph1}
              </p>
              <p className="text-lg text-muted-foreground">
                {t.avoidFakeTaxis.howScamWorks.paragraph2}
              </p>
            </div>

            {/* 3. Red Flags Checklist */}
            <div className="mb-12">
              <h2 className="text-3xl font-display text-primary mb-6">{t.avoidFakeTaxis.redFlags.title}</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.redFlags.flag1.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.redFlags.flag1.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.redFlags.flag2.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.redFlags.flag2.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.redFlags.flag3.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.redFlags.flag3.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.redFlags.flag4.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.redFlags.flag4.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.redFlags.flag5.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.redFlags.flag5.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. How to Protect Yourself */}
            <div className="mb-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-3xl font-display text-primary mb-4">{t.avoidFakeTaxis.protection.title}</h2>
              <p className="text-lg font-semibold mb-4">{t.avoidFakeTaxis.protection.intro}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-lg">{t.avoidFakeTaxis.protection.tip1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-lg">{t.avoidFakeTaxis.protection.tip2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-lg">{t.avoidFakeTaxis.protection.tip3}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-lg">{t.avoidFakeTaxis.protection.tip4}</span>
                </li>
              </ul>
              <p className="text-lg font-semibold text-blue-700">
                {t.avoidFakeTaxis.protection.betterOption}
              </p>
            </div>

            {/* 5. Why VTC is the Safe Alternative */}
            <div className="mb-12 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h2 className="text-3xl font-display text-primary mb-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-500" />
                {t.avoidFakeTaxis.whyVTC.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t.avoidFakeTaxis.whyVTC.intro}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.whyVTC.benefit1.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.whyVTC.benefit1.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.whyVTC.benefit2.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.whyVTC.benefit2.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.whyVTC.benefit3.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.whyVTC.benefit3.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.whyVTC.benefit4.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.whyVTC.benefit4.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.whyVTC.benefit5.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.whyVTC.benefit5.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-lg">{t.avoidFakeTaxis.whyVTC.benefit6.title}</strong>
                    <p className="text-muted-foreground">{t.avoidFakeTaxis.whyVTC.benefit6.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Real Prices - Transparency */}
            <div className="mb-12">
              <h2 className="text-3xl font-display text-primary mb-4">{t.avoidFakeTaxis.pricing.title}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t.avoidFakeTaxis.pricing.intro}
              </p>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">{t.avoidFakeTaxis.pricing.tableHeaders.route}</th>
                      <th className="px-6 py-4 text-left">{t.avoidFakeTaxis.pricing.tableHeaders.passengers1to3}</th>
                      <th className="px-6 py-4 text-left">{t.avoidFakeTaxis.pricing.tableHeaders.passengers4to7}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium">{t.avoidFakeTaxis.pricing.routes.cdg}</td>
                      <td className="px-6 py-4">€70</td>
                      <td className="px-6 py-4">€90</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium">{t.avoidFakeTaxis.pricing.routes.orly}</td>
                      <td className="px-6 py-4">€60</td>
                      <td className="px-6 py-4">€78</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">{t.avoidFakeTaxis.pricing.routes.beauvais}</td>
                      <td className="px-6 py-4">€130</td>
                      <td className="px-6 py-4">€150</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-lg">
                  {t.avoidFakeTaxis.pricing.warning}
                </p>
              </div>
            </div>

            {/* 7. CTA - Book Now */}
            <div className="bg-gradient-to-br from-primary to-primary/90 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-display mb-4">
                {t.avoidFakeTaxis.cta.title}
              </h2>
              <p className="text-xl mb-8 text-white/90">
                {t.avoidFakeTaxis.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-primary font-semibold text-lg px-8 py-6"
                  onClick={() => navigate('/booking')}
                >
                  {t.avoidFakeTaxis.cta.bookNow}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold text-lg px-8 py-6"
                  onClick={() => window.open('https://wa.me/33668251102', '_blank')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t.avoidFakeTaxis.cta.whatsapp}
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-6">
                {t.avoidFakeTaxis.cta.groupsNotice}
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AvoidFakeTaxis;

