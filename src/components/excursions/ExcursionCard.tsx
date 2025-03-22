import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExcursionCardProps {
  id: string;
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
  link
}: ExcursionCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm">{duration}</span>
          <span className="font-semibold">{`€${price}`}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={link} className="w-full">
          <Button className="w-full">
            {t.excursions.viewDetails}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
