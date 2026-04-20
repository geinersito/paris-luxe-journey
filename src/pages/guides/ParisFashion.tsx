import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Train,
  CloudRain,
  Sparkles,
  ShoppingBag,
  Gem,
  Repeat2,
  Phone,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const DISTRICTS = [
  "marais",
  "saintGermain",
  "montaigne",
  "faubourg",
  "pigalle",
] as const;
const PRIORITIZE = ["luxury", "conceptStores", "vintage", "emerging"] as const;
const PRACTICAL_ICONS = [Clock, Train, Sparkles, CloudRain] as const;
const PRACTICAL_KEYS = ["hours", "transport", "rhythm", "weather"] as const;

export default function ParisFashion() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const g = t.parisFashion;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{g.meta.title}</title>
        <meta name="description" content={g.meta.description} />
        <meta property="og:title" content={g.meta.title} />
        <meta property="og:description" content={g.meta.description} />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 text-white py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(212,175,55,0.4) 0,rgba(212,175,55,0.4) 1px,transparent 0,transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                {g.badge}
              </span>
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              {g.hero.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              {g.hero.title}
            </h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto">
              {g.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        {/* 1 — For who */}
        <section className="mb-16">
          <h2 className="text-3xl font-display text-secondary mb-3">
            {g.forWho.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">{g.forWho.intro}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {(
              [
                g.forWho.profile1,
                g.forWho.profile2,
                g.forWho.profile3,
                g.forWho.profile4,
              ] as { label: string; desc: string }[]
            ).map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent p-5"
              >
                <strong className="block text-base font-semibold text-secondary mb-1">
                  {p.label}
                </strong>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2 — Districts */}
        <section className="mb-16">
          <h2 className="text-3xl font-display text-secondary mb-3">
            {g.districts.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {g.districts.intro}
          </p>
          <div className="space-y-4">
            {DISTRICTS.map((key) => {
              const d = g.districts[key];
              return (
                <div
                  key={key}
                  className="flex gap-4 p-5 rounded-2xl border border-primary/10 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mt-1 shrink-0 rounded-full bg-primary/10 p-2 text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-base font-semibold text-secondary mb-1">
                      {d.name}
                    </strong>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3 — Prioritize */}
        <section className="mb-16">
          <h2 className="text-3xl font-display text-secondary mb-3">
            {g.prioritize.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {g.prioritize.intro}
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {(
              [
                { key: "luxury", icon: Gem },
                { key: "conceptStores", icon: ShoppingBag },
                { key: "vintage", icon: Repeat2 },
                { key: "emerging", icon: Sparkles },
              ] as {
                key: (typeof PRIORITIZE)[number];
                icon: React.ElementType;
              }[]
            ).map(({ key, icon: Icon }) => {
              const item = g.prioritize[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 inline-flex rounded-full bg-primary/10 p-2.5 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <strong className="block text-base font-semibold text-secondary mb-2">
                    {item.title}
                  </strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4 — Fashion Week */}
        <section className="mb-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-secondary/5 via-primary/5 to-transparent p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
            {g.fashionWeek.eyebrow}
          </p>
          <h2 className="text-3xl font-display text-secondary mb-4">
            {g.fashionWeek.title}
          </h2>
          <p className="text-base text-muted-foreground mb-6 leading-7">
            {g.fashionWeek.intro}
          </p>
          <ol className="space-y-3">
            {[
              g.fashionWeek.tip1,
              g.fashionWeek.tip2,
              g.fashionWeek.tip3,
              g.fashionWeek.tip4,
            ].map((tip, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
              >
                <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ol>
        </section>

        {/* 5 — Practical */}
        <section className="mb-16">
          <h2 className="text-3xl font-display text-secondary mb-8">
            {g.practical.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {PRACTICAL_KEYS.map((key, i) => {
              const Icon = PRACTICAL_ICONS[i];
              const item = g.practical[key];
              return (
                <div
                  key={key}
                  className="flex gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm"
                >
                  <div className="mt-0.5 shrink-0 rounded-full bg-primary/10 p-2 text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-secondary mb-1">
                      {item.title}
                    </strong>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6 — CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-secondary to-secondary/90 text-white p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-3">
            {g.cta.title}
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            {g.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-secondary font-semibold text-base px-7"
              onClick={() => navigate("/booking")}
            >
              {g.cta.bookTransfer}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold text-base px-7"
              onClick={() => window.open("https://wa.me/33668251102", "_blank")}
            >
              <Phone className="w-4 h-4 mr-2" />
              {g.cta.whatsapp}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
