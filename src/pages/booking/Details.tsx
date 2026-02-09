import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import BookingProgress from "@/components/booking/BookingProgress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { loadBookingSession, saveBookingSession } from "@/lib/bookingSession";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Shield,
  ArrowRight,
} from "lucide-react";

interface PassengerInfo {
  fullName: string;
  email: string;
  phone: string;
  specialInstructions?: string;
  flightNumber?: string;
}

const BookingDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const location = useLocation();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<PassengerInfo>({
    fullName: "",
    email: "",
    phone: "",
    specialInstructions: "",
    flightNumber: "",
  });

  const sessionSnapshot = loadBookingSession();
  const bookingData =
    location.state?.bookingData ?? sessionSnapshot?.bookingData;
  const estimatedPrice = Number(
    location.state?.estimatedPrice ?? sessionSnapshot?.estimatedPrice,
  );
  const luggageSurcharge = Number(
    location.state?.luggageSurcharge ?? sessionSnapshot?.luggageSurcharge ?? 0,
  );
  const hasEstimatedPrice =
    Number.isFinite(estimatedPrice) && estimatedPrice > 0;

  useEffect(() => {
    if (!bookingData || !hasEstimatedPrice) {
      return;
    }

    saveBookingSession({
      bookingData,
      estimatedPrice,
      luggageSurcharge,
    });
  }, [bookingData, hasEstimatedPrice, estimatedPrice, luggageSurcharge]);

  useEffect(() => {
    if (!bookingData || !hasEstimatedPrice) {
      toast({
        title: t.common.error,
        description: t.booking.errors.selectLocations,
        variant: "destructive",
      });
      navigate("/booking");
      return;
    }

    if (user) {
      const fetchUserProfile = async () => {
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error) throw error;

          if (profile) {
            setFormData((prev) => ({
              ...prev,
              fullName:
                `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
              email: profile.email || "",
              phone: profile.phone || "",
            }));
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [
    location,
    navigate,
    toast,
    t,
    user,
    bookingData,
    estimatedPrice,
    luggageSurcharge,
    hasEstimatedPrice,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast({
        title: t.booking.errors.invalidName,
        description: t.booking.errors.nameDescription,
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: t.booking.errors.invalidEmail,
        description: t.booking.errors.emailDescription,
        variant: "destructive",
      });
      return false;
    }

    if (!formData.phone.trim()) {
      toast({
        title: t.common.error,
        description: t.booking.errors.invalidPhone,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const hasPickupId = bookingData?.pickupLocationId;
      const hasDropoffId = bookingData?.dropoffLocationId;

      if (!hasPickupId || !hasDropoffId) {
        toast({
          title: t.common.error,
          description: t.booking.errors.selectLocations,
          variant: "destructive",
        });
        navigate("/booking", { replace: true });
        return;
      }

      const updatedBookingData = {
        ...bookingData,
        passengerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialInstructions: formData.specialInstructions || "",
          flightNumber: formData.flightNumber || "",
        },
      };

      saveBookingSession({
        bookingData: updatedBookingData,
        estimatedPrice,
        luggageSurcharge,
      });

      navigate("/booking/payment", {
        state: {
          bookingData: updatedBookingData,
          estimatedPrice: estimatedPrice,
          luggageSurcharge: luggageSurcharge,
        },
        replace: true,
      });
    } catch (error) {
      console.error("[BookingDetails] Error preparing booking data:", error);
      toast({
        title: t.common.error,
        description: t.booking.errors.bookingCreationError,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8 px-4 sm:px-6">
        <BookingProgress currentStep={1} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left column — Form */}
          <div className="lg:col-span-7">
            <h1 className="text-2xl md:text-3xl font-display text-primary mb-6">
              {t.booking.passengerDetails}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-5 md:p-6 shadow-sm space-y-4">
                <div>
                  <Label htmlFor="fullName">{t.booking.fullName}</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t.booking.fullNamePlaceholder}
                    required
                    disabled={isSubmitting}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t.booking.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.booking.emailPlaceholder}
                    required
                    disabled={isSubmitting}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t.booking.phone}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.booking.phonePlaceholder}
                    required
                    disabled={isSubmitting}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="flightNumber">{t.booking.flightNumber}</Label>
                  <Input
                    id="flightNumber"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    placeholder={t.booking.flightNumberPlaceholder}
                    disabled={isSubmitting}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="specialInstructions">
                    {t.booking.specialInstructions}
                  </Label>
                  <Textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    placeholder={t.booking.specialInstructionsPlaceholder}
                    disabled={isSubmitting}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/booking")}
                  disabled={isSubmitting}
                >
                  {t.common.back}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="silk-button gap-2"
                >
                  {isSubmitting ? t.common.processing : t.common.continue}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </form>
          </div>

          {/* Right column — Sticky summary */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Route & schedule summary */}
              <div className="rounded-2xl border border-border bg-white p-5 md:p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-secondary">
                  {t.booking.summary?.title || t.booking.priceSummary}
                </h2>

                {/* Route */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        {t.booking.form?.from || t.booking.pickup}
                      </span>
                      <p className="font-medium">
                        {bookingData?.pickupLocationName || bookingData?.pickup}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        {t.booking.form?.to || t.booking.dropoff}
                      </span>
                      <p className="font-medium">
                        {bookingData?.dropoffLocationName ||
                          bookingData?.dropoff}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                {/* Date, time, passengers */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {bookingData?.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>{bookingData.date}</span>
                    </div>
                  )}
                  {bookingData?.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span>{bookingData.time}</span>
                    </div>
                  )}
                  {bookingData?.passengers && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        {bookingData.passengers}{" "}
                        {t.booking.success?.passenger || "pax"}
                      </span>
                    </div>
                  )}
                </div>

                <hr className="border-border" />

                {/* Price breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.booking.price?.basePrice || "Base price"}
                    </span>
                    <span>
                      €{(estimatedPrice - luggageSurcharge).toFixed(2)}
                    </span>
                  </div>
                  {luggageSurcharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t.booking.largeLuggage}
                      </span>
                      <span>€{luggageSurcharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                    <span>{t.booking.price?.total || "Total"}</span>
                    <span className="text-primary">
                      €{estimatedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust microcopy */}
              <div className="rounded-2xl border border-border bg-primary/5 p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    {t.hero.fixedPrice} · {t.hero.freeCancellation}
                  </p>
                  <p>{t.hero.support247}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
