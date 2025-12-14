/**
 * COMPONENT: PaymentModeSelector
 * 
 * Selector de modo de pago para V3.1.2
 * - Prepaid: Pago anticipado online
 * - Flexible: Pago al conductor (con hold de €30)
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Wallet, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { PricingResult } from '@/hooks/booking/usePricingV312';

export type PaymentMode = 'prepaid' | 'flexible';

interface PaymentModeSelectorProps {
  pricing: PricingResult;
  selectedMode: PaymentMode;
  onModeChange: (mode: PaymentMode) => void;
  disabled?: boolean;
}

export const PaymentModeSelector = ({
  pricing,
  selectedMode,
  onModeChange,
  disabled = false,
}: PaymentModeSelectorProps) => {
  const [showFlexibleInfo, setShowFlexibleInfo] = useState(false);

  const prepaidAvailable = pricing.payment_modes_enabled.prepaid;
  const flexibleAvailable = pricing.payment_modes_enabled.flexible;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Método de Pago</h3>
        <p className="text-sm text-muted-foreground">
          Selecciona cómo prefieres pagar tu traslado
        </p>
      </div>

      <RadioGroup
        value={selectedMode}
        onValueChange={(value) => onModeChange(value as PaymentMode)}
        disabled={disabled}
        className="space-y-3"
      >
        {/* PREPAID OPTION */}
        {prepaidAvailable && (
          <Card
            className={`p-4 cursor-pointer transition-all ${
              selectedMode === 'prepaid'
                ? 'border-primary ring-2 ring-primary ring-offset-2'
                : 'hover:border-primary/50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onModeChange('prepaid')}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="prepaid" id="prepaid" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Label
                    htmlFor="prepaid"
                    className="text-base font-semibold cursor-pointer flex items-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pago Anticipado
                    <Badge variant="secondary" className="ml-2">
                      Ahorra €5
                    </Badge>
                  </Label>
                  <span className="text-2xl font-bold text-primary">
                    €{pricing.prepaid_price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Paga ahora con tarjeta y ahorra €5. Precio final garantizado.
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>✓ Confirmación inmediata</li>
                  <li>✓ Sin cargos adicionales</li>
                  <li>✓ Cancelación gratuita hasta 24h antes</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* FLEXIBLE OPTION */}
        {flexibleAvailable && (
          <Card
            className={`p-4 cursor-pointer transition-all ${
              selectedMode === 'flexible'
                ? 'border-primary ring-2 ring-primary ring-offset-2'
                : 'hover:border-primary/50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onModeChange('flexible')}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="flexible" id="flexible" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Label
                    htmlFor="flexible"
                    className="text-base font-semibold cursor-pointer flex items-center gap-2"
                  >
                    <Wallet className="w-5 h-5" />
                    Pago al Conductor
                    <Badge variant="outline" className="ml-2">
                      Flexible
                    </Badge>
                  </Label>
                  <span className="text-2xl font-bold">
                    €{pricing.flexible_price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Paga en efectivo o tarjeta al conductor. Reserva con hold de €
                  {pricing.hold_amount}.
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>✓ Paga al finalizar el servicio</li>
                  <li>✓ Efectivo o tarjeta aceptados</li>
                  <li>
                    ✓ Hold de €{pricing.hold_amount} (se libera automáticamente)
                  </li>
                </ul>

                {selectedMode === 'flexible' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFlexibleInfo(!showFlexibleInfo);
                    }}
                    className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <Info className="w-3 h-3" />
                    ¿Qué es el hold?
                  </button>
                )}
              </div>
            </div>
          </Card>
        )}
      </RadioGroup>

      {/* FLEXIBLE INFO ALERT */}
      {selectedMode === 'flexible' && showFlexibleInfo && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Hold de garantía:</strong> 24 horas antes de tu traslado,
            realizaremos un cargo temporal de €{pricing.hold_amount} en tu tarjeta
            como garantía. Este cargo se libera automáticamente después del
            servicio. El pago final de €{pricing.flexible_price} lo realizas
            directamente al conductor.
          </AlertDescription>
        </Alert>
      )}

      {/* NO MODES AVAILABLE */}
      {!prepaidAvailable && !flexibleAvailable && (
        <Alert variant="destructive">
          <AlertDescription>
            No hay métodos de pago disponibles para esta ruta. Por favor, contacta
            con soporte.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

