import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { DestinationHeader } from "@/components/destination/DestinationHeader";
import { DestinationNavigation } from "@/components/destination/DestinationNavigation";
import { DestinationContent } from "@/components/destination/DestinationContent";
import { DestinationSidebar } from "@/components/destination/DestinationSidebar";
import { Button } from "@/components/ui/button";
import { versaillesGuideContent } from "@/data/excursions/versailles-guide";

export default function VersaillesPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState("description");

  const guide = versaillesGuideContent[language];

  const navigationItems = [
    { id: "description", label: guide.navigation.description },
    { id: "tours", label: guide.navigation.tours },
    { id: "map", label: guide.navigation.map },
    { id: "events", label: guide.navigation.events },
    { id: "faq", label: guide.navigation.faq },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const renderCta = (title: string, body: string, buttonLabel: string) => (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8 my-8">
      <h4 className="text-2xl font-bold text-foreground mb-3">{title}</h4>
      <p className="text-muted-foreground mb-5">{body}</p>
      <Button onClick={() => navigate("/booking")} size="lg">
        {buttonLabel}
      </Button>
    </div>
  );

  const sidebarTours = (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-xl font-bold mb-2">{guide.sidebar.title}</h3>
        <p className="text-sm text-muted-foreground">{guide.sidebar.note}</p>
      </div>

      {guide.sidebar.cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h4 className="text-lg font-bold text-foreground">
                {card.title}
              </h4>
              <p className="text-sm text-muted-foreground">{card.duration}</p>
            </div>
            <span className="text-base font-semibold text-primary">
              {card.priceLabel}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {card.description}
          </p>
          <ul className="space-y-2 mb-4">
            {card.includes.map((item) => (
              <li
                key={item}
                className="text-sm text-muted-foreground flex gap-2"
              >
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full" onClick={() => navigate("/booking")}>
            {card.button}
          </Button>
        </div>
      ))}
    </div>
  );

  const content = {
    description: (
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">{guide.overviewTitle}</h2>
          <p className="text-muted-foreground leading-7 mb-6">{guide.intro}</p>
          <h3 className="text-2xl font-semibold mb-4">{guide.whyVisitTitle}</h3>
          <ul className="space-y-3">
            {guide.whyVisitPoints.map((reason) => (
              <li
                key={reason}
                className="rounded-xl bg-muted/40 px-4 py-3 text-muted-foreground leading-7"
              >
                {reason}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">
            {guide.firstStopsTitle}
          </h3>
          <p className="text-muted-foreground leading-7 mb-5">
            {guide.firstStopsIntro}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {guide.firstStops.map((stop) => (
              <div
                key={stop.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <h4 className="text-lg font-semibold mb-2">{stop.title}</h4>
                <p className="text-sm text-muted-foreground leading-6">
                  {stop.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">
            {guide.itineraryTitle}
          </h3>
          <p className="text-muted-foreground leading-7 mb-5">
            {guide.itineraryIntro}
          </p>
          <ol className="space-y-3">
            {guide.itinerarySteps.map((step, index) => (
              <li
                key={step}
                className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm"
              >
                <span className="font-semibold text-primary mr-2">
                  {index + 1}.
                </span>
                <span className="text-muted-foreground leading-7">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {renderCta(guide.midCta.title, guide.midCta.body, guide.midCta.button)}
      </div>
    ),
    tours: (
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">{guide.visitOptionsTitle}</h2>
          <p className="text-muted-foreground leading-7 mb-6">
            {guide.visitOptionsIntro}
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                {guide.halfDayTitle}
              </h3>
              <p className="text-muted-foreground leading-7">
                {guide.halfDayBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                {guide.fullDayTitle}
              </h3>
              <p className="text-muted-foreground leading-7">
                {guide.fullDayBody}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">
            {guide.chauffeurTitle}
          </h3>
          <p className="text-muted-foreground leading-7 mb-5">
            {guide.chauffeurIntro}
          </p>
          <ul className="space-y-3">
            {guide.chauffeurPoints.map((point) => (
              <li
                key={point}
                className="rounded-xl bg-muted/40 px-4 py-3 text-muted-foreground leading-7"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>
      </div>
    ),
    map: (
      <div className="space-y-6">
        <section>
          <h2 className="text-3xl font-bold mb-4">{guide.gettingThereTitle}</h2>
          <p className="text-muted-foreground leading-7 mb-6">
            {guide.gettingThereIntro}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {guide.gettingThereOptions.map((option) => (
              <div
                key={option.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground leading-6">
                  {option.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    events: (
      <div className="space-y-6">
        <section>
          <h2 className="text-3xl font-bold mb-4">{guide.practicalTitle}</h2>
          <p className="text-muted-foreground leading-7 mb-6">
            {guide.practicalIntro}
          </p>
          <div className="space-y-4">
            {guide.practicalTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-6">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    faq: (
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">{guide.faqTitle}</h2>
          <div className="space-y-4">
            {guide.faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground leading-6">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {renderCta(
          guide.finalCta.title,
          guide.finalCta.body,
          guide.finalCta.button,
        )}
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <DestinationHeader
        title={guide.title}
        image="https://images.unsplash.com/photo-1773472224690-2d80ee8ac1f3?auto=format&fit=crop&w=1920&q=80"
        distance={guide.distance}
        duration={guide.duration}
        currentPath="/excursions/versailles"
      />

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-3">
          <DestinationSidebar tours={sidebarTours}>
            <DestinationNavigation
              items={navigationItems}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </DestinationSidebar>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <DestinationContent activeSection={activeSection} content={content} />
        </div>
      </div>
    </div>
  );
}
