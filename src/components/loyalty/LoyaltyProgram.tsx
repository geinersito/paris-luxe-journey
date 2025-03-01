import { Star, Gift, Trophy } from 'lucide-react';
import { Progress } from '../ui/progress';

const LoyaltyProgram = () => {
  const currentPoints = 750;
  const nextTierPoints = 1000;
  const progress = (currentPoints / nextTierPoints) * 100;

  const benefits = [
    {
      title: "Descuentos por Puntos",
      description: "1 punto = 1€ de descuento",
      icon: Gift
    },
    {
      title: "Acumulación Simple",
      description: "1€ gastado = 1 punto",
      icon: Star
    },
    {
      title: "Bonos Especiales",
      description: "Puntos extra en fechas señaladas",
      icon: Trophy
    }
  ];

  return (
    <section className="py-20 bg-pearl dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-primary dark:text-primary-foreground text-center mb-12">
          Programa de Puntos
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">Sus Puntos Actuales</span>
                <span className="text-secondary">{currentPoints} puntos</span>
              </div>
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {nextTierPoints - currentPoints} puntos más para su próximo descuento
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="font-display text-xl mb-4">Cómo Funciona</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>• Por cada euro gastado, recibe 1 punto</li>
                <li>• Los puntos se pueden canjear por descuentos directos</li>
                <li>• Sin niveles complejos, beneficios inmediatos</li>
                <li>• Los puntos no caducan</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;