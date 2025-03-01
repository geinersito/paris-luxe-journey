
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

  const bookingData = location.state?.bookingData;
  const estimatedPrice = location.state?.estimatedPrice;

  useEffect(() => {
    if (!bookingData || !estimatedPrice) {
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
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          if (profile) {
            setFormData(prev => ({
              ...prev,
              fullName: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
              email: profile.email || '',
              phone: profile.phone || '',
            }));
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [location.state, navigate, toast, t, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        description: "Por favor, introduce un número de teléfono válido",
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
      const updatedBookingData = {
        ...bookingData,
        passengerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialInstructions: formData.specialInstructions || "",
          flightNumber: formData.flightNumber || ""
        }
      };

      console.log("Navigating to payment with data:", {
        bookingData: updatedBookingData,
        estimatedPrice
      });

      navigate("/booking/payment", { 
        state: { 
          bookingData: updatedBookingData,
          estimatedPrice
        },
        replace: true
      });
    } catch (error) {
      console.error('Error preparing booking data:', error);
      toast({
        title: t.common.error,
        description: "Ha ocurrido un error al procesar los datos. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <BookingProgress currentStep={1} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-display text-primary mb-6">
            {t.booking.passengerDetails}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                  aria-describedby="fullName-error"
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
                  aria-describedby="email-error"
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
                  aria-describedby="phone-error"
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
                />
              </div>

              <div>
                <Label htmlFor="specialInstructions">{t.booking.specialInstructions}</Label>
                <Textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder={t.booking.specialInstructionsPlaceholder}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
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
              >
                {isSubmitting ? t.common.processing : t.common.continue}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
