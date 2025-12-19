import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import {
  Calendar,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Event, Language } from "@/types/events";
import eventsFeedData from "@/data/events/events-feed.json";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const language = i18n.language as Language;

  // Buscar el evento en ambas listas (week y month)
  const allEvents = [...eventsFeedData.thisWeek, ...eventsFeedData.thisMonth];
  const event = allEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-secondary mb-4">
            {t("events.notFound") || "Event Not Found"}
          </h1>
          <Button onClick={() => navigate("/events")} className="silk-button">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("events.backToEvents") || "Back to Events"}
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
      <Helmet>
        <title>{event.title[language]} | Paris Elite Services</title>
        <meta
          name="description"
          content={event.description?.[language] || event.title[language]}
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-champagne/30 to-cream">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8">
          <Button
            onClick={() => navigate("/events")}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("events.backToEvents") || "Back to Events"}
          </Button>
        </div>

        {/* Hero Image */}
        {event.imageUrl && (
          <div className="relative h-96 overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.title[language]}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder-event.jpg";
              }}
            />
            {event.isFeatured && (
              <Badge className="absolute top-8 right-8 bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-lg text-lg px-4 py-2">
                <Star className="w-5 h-5 mr-2 fill-current" />
                {t("events.featured")}
              </Badge>
            )}
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">
              {event.title[language]}
            </h1>

            {/* Event Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Date & Time */}
              <div className="bg-white rounded-xl p-6 border border-primary/20 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold text-lg text-secondary">
                    {t("events.dateTime") || "Date & Time"}
                  </h3>
                </div>
                <p className="text-gray-700 font-medium">
                  {formatDate(event.startAt)}
                </p>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(event.startAt)}</span>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl p-6 border border-primary/20 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold text-lg text-secondary">
                    {t("events.location") || "Location"}
                  </h3>
                </div>
                <p className="text-gray-700 font-medium">
                  {event.venueName?.[language] || ""}
                </p>
                {event.district && (
                  <p className="text-gray-600 text-sm mt-1">{event.district}</p>
                )}
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="bg-white rounded-xl p-8 border border-primary/20 shadow-sm mb-8">
                <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                  {t("events.about") || "About This Event"}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.description[language]}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/booking")}
                className="flex-1 silk-button text-lg py-6"
              >
                {t("events.bookRide") || "Book Your Ride"}
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 button-outline-gold text-lg py-6"
              >
                <a
                  href={event.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  {t("events.officialDetails") || "Official Event Details"}
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>

            {/* Source */}
            <p className="text-sm text-gray-500 text-center mt-8 pt-6 border-t border-primary/10">
              {t("events.source")}:{" "}
              <span className="font-medium text-gray-700">
                {event.sourceName}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
