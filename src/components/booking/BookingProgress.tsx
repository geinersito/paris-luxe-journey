
import { Check } from "lucide-react";

interface BookingProgressProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Detalles" },
  { id: 2, name: "Pago" },
  { id: 3, name: "Confirmación" }
];

const BookingProgress = ({ currentStep }: BookingProgressProps) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={`relative ${
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20 w-full" : ""
            }`}
          >
            <div className="flex items-center">
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  step.id < currentStep
                    ? "bg-primary text-primary-foreground"
                    : step.id === currentStep
                    ? "border-2 border-primary bg-background"
                    : "border-2 border-gray-300 bg-background"
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`absolute top-4 h-0.5 w-full ${
                    step.id < currentStep ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
            <span className="absolute -bottom-6 w-max text-sm font-medium">
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BookingProgress;
