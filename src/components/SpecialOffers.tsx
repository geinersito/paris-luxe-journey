import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Clock, Gift, Users, Plane } from "lucide-react";
import { motion } from "framer-motion";

const SpecialOffers = () => {
  const offers = [
    {
      title: "Descuento Early Bird",
      description: "20% de descuento en reservas realizadas con 2 semanas de anticipación",
      code: "EARLY20",
      expiry: "Válido hasta fin de mes",
      icon: Clock,
      color: "bg-blue-500"
    },
    {
      title: "Paquete Business Premium",
      description: "Tarifa plana para traslados al aeropuerto + WiFi gratis + Servicio VIP",
      code: "BIZPRO24",
      expiry: "Oferta permanente",
      icon: Plane,
      color: "bg-purple-500"
    },
    {
      title: "Descuento Grupos Luxury",
      description: "25% de descuento para grupos de 4 o más personas + Champagne de cortesía",
      code: "LUXGROUP",
      expiry: "Válido todo el año",
      icon: Users,
      color: "bg-emerald-500"
    }
  ];

  return (
    <section className="py-16 bg-pearl dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-secondary text-secondary-foreground">
            Ofertas Exclusivas
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display text-primary dark:text-primary-foreground mb-4">
            Descubre Nuestras Ofertas Especiales
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Aprovecha estas ofertas exclusivas para disfrutar de nuestros servicios premium a precios especiales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden glass-card"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${offer.color} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 ${offer.color} text-opacity-100`} />
                    </div>
                    <Badge 
                      className="bg-secondary text-secondary-foreground animate-pulse"
                    >
                      {offer.code}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-display text-primary dark:text-primary-foreground">
                    {offer.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300">
                    {offer.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 pt-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {offer.expiry}
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            * Las ofertas no son acumulables. Aplican términos y condiciones.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;