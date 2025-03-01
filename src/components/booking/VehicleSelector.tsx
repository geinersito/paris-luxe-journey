
import { Car, Users, Briefcase, Info } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Vehicle } from "@/hooks/useVehicles";

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export const VehicleSelector = ({ vehicles, selectedVehicle, onChange, isLoading }: VehicleSelectorProps) => {
  return (
    <div className="space-y-3 relative z-30 mt-8">
      <div className="flex items-center justify-between">
        <Label htmlFor="vehicleType" className="text-lg font-semibold">Tipo de Vehículo</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
              <p className="text-sm">Los precios base incluyen el servicio estándar</p>
              <p className="text-sm mt-1">Precio por km adicional varía según el vehículo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Select value={selectedVehicle} onValueChange={onChange} disabled={isLoading}>
        <SelectTrigger className="w-full bg-white dark:bg-primary-dark">
          <SelectValue placeholder={isLoading ? "Cargando vehículos..." : "Selecciona un vehículo"} />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-primary-dark border border-metallic/20 shadow-lg z-50">
          {vehicles.map((vehicle) => (
            <SelectItem 
              key={vehicle.id} 
              value={vehicle.type}
              className={cn(
                "cursor-pointer transition-colors duration-200",
                "hover:bg-primary/5 focus:bg-primary/5",
                "data-[state=checked]:bg-primary/10"
              )}
            >
              <div className="flex flex-col gap-2 py-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="font-medium">{vehicle.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    €{vehicle.base_price}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {vehicle.description}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {vehicle.passenger_capacity} pasajeros
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {vehicle.luggage_capacity} maletas
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
