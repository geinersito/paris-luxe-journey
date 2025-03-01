
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { es, fr, pt } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DateTimeInputsProps {
  date: string;
  time: string;
  returnDate?: string;
  returnTime?: string;
  onChange: (value: string, name: string) => void;
  isRoundTrip?: boolean;
}

export const DateTimeInputs = ({ 
  date, 
  time, 
  returnDate, 
  returnTime, 
  onChange,
  isRoundTrip 
}: DateTimeInputsProps) => {
  const { t, language } = useLanguage();

  const getLocale = () => {
    switch (language) {
      case 'es':
        return es;
      case 'fr':
        return fr;
      case 'pt':
        return pt;
      default:
        return undefined; // English is the default
    }
  };

  const handleDateSelect = (date: Date | undefined, isReturn: boolean = false) => {
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'), isReturn ? 'returnDate' : 'date');
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ['00', '30']) {
        options.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }
    return options;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t.booking.date}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(new Date(date), "PPP", { locale: getLocale() })
                ) : (
                  <span>{t.booking.date}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date ? new Date(date) : undefined}
                onSelect={(date) => handleDateSelect(date)}
                disabled={(date) => date < new Date()}
                initialFocus
                locale={getLocale()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>{t.booking.time}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !time && "text-muted-foreground"
                )}
              >
                <Clock className="mr-2 h-4 w-4" />
                {time || t.booking.time}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="start">
              <div className="grid gap-1 p-2 max-h-[300px] overflow-y-auto">
                {generateTimeOptions().map((timeOption) => (
                  <Button
                    key={timeOption}
                    variant="ghost"
                    className={cn(
                      "justify-start font-normal",
                      time === timeOption && "bg-accent"
                    )}
                    onClick={() => onChange(timeOption, 'time')}
                  >
                    {timeOption}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {isRoundTrip && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <Label>{t.booking.returnDate}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? (
                    format(new Date(returnDate), "PPP", { locale: getLocale() })
                  ) : (
                    <span>{t.booking.returnDate}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate ? new Date(returnDate) : undefined}
                  onSelect={(date) => handleDateSelect(date, true)}
                  disabled={(date) => date < (new Date(date) || new Date())}
                  initialFocus
                  locale={getLocale()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>{t.booking.returnTime}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !returnTime && "text-muted-foreground"
                  )}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {returnTime || t.booking.returnTime}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="start">
                <div className="grid gap-1 p-2 max-h-[300px] overflow-y-auto">
                  {generateTimeOptions().map((timeOption) => (
                    <Button
                      key={timeOption}
                      variant="ghost"
                      className={cn(
                        "justify-start font-normal",
                        returnTime === timeOption && "bg-accent"
                      )}
                      onClick={() => onChange(timeOption, 'returnTime')}
                    >
                      {timeOption}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};
