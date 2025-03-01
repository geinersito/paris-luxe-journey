import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface ExcursionCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  link: string;
}

export function ExcursionCard({
  title,
  description,
  image,
  duration,
  price,
  link,
}: ExcursionCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{t('excursions.card.duration')}: {duration}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">{t('excursions.card.from')} </span>
            <span className="font-semibold">€{price}</span>
          </div>
        </div>
        <Button
          asChild
          variant="secondary"
          className="w-full"
        >
          <a href={link}>{t('excursions.card.moreInfo')}</a>
        </Button>
      </CardContent>
    </Card>
  );
}
