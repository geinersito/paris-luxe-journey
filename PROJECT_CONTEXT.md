# Paris Elite Services - Project Context

## Overview
Premium transportation and tours service in Paris, offering VIP transfers, exclusive tours, and personalized services in multiple languages.

## System Architecture

### Frontend Structure
```
src/
├── components/
│   ├── booking/
│   │   ├── ServiceLevelSelector/
│   │   ├── LocationSelector/
│   │   ├── BookingForm/
│   │   └── PriceDisplay/
│   ├── admin/
│   │   ├── DestinationManager/
│   │   └── PricingManager/
│   └── ui/
├── types/
│   ├── booking.ts
│   ├── pricing.ts
│   └── locations.ts
└── utils/
    ├── price-calculator.ts
    └── zone-finder.ts
```

### Database Structure (Supabase)
```sql
-- Core Tables
service_levels (
  id TEXT PRIMARY KEY,
  name_i18n JSONB,
  multiplier DECIMAL,
  features_i18n JSONB
);

fixed_route_prices (
  id UUID PRIMARY KEY,
  route_type VARCHAR(50),
  description_i18n JSONB,
  price_1_3_pax DECIMAL(10,2),
  price_4_7_pax DECIMAL(10,2)
);

hourly_services (
  id UUID PRIMARY KEY,
  hourly_rate DECIMAL(10,2),
  min_hours INTEGER,
  description_i18n JSONB
);

bookings (
  id UUID PRIMARY KEY,
  booking_type VARCHAR(50), -- 'transfer' or 'hourly'
  service_level_id TEXT REFERENCES service_levels(id),
  pickup JSONB,
  dropoff JSONB,
  price DECIMAL,
  hours INTEGER, -- para servicios por hora
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  status TEXT
);

-- Supporting Tables
translations (
  key TEXT PRIMARY KEY,
  content JSONB
);

audit_logs (
  id UUID PRIMARY KEY,
  table_name TEXT,
  action TEXT,
  old_data JSONB,
  new_data JSONB,
  timestamp TIMESTAMPTZ
);
```

## Service Level Pricing System

### Service Levels
1. **Standard Service (0.85x)**
   - Premium transportation service
   - 15% more economical than Business rate
   - Same high-quality vehicles and service

2. **Business Service (1.0x)**
   - Premium transportation service
   - WiFi included
   - Complimentary water
   - Ideal for corporate clients

### Common Features (All Levels)
- Professional driver
- Meet & Greet service
- Premium vehicles
- Flight tracking
- High-quality service standards

### Price Calculation System
1. **Fixed Routes**
   - Airport transfers
   - Train station transfers
   - Disneyland Paris
   - Inter-airport transfers (except Beauvais)

2. **Dynamic Routes**
   - Google Maps Distance Matrix API integration
   - Paris-centric distance calculation
   - Zone-based fallback system
   - Similar route comparison

3. **Minimum Price Guarantees**
   - Zone-based minimum prices
   - Distance-based adjustments
   - Paris as central reference point

### Implementation Plan

#### Phase 1: Core System (Current)
- [x] Database migrations
- [x] Basic service level types
- [x] Booking form updates
- [ ] Price calculation engine
- [ ] Location validation system

#### Phase 2: Price Engine
- [ ] Google Maps integration
- [ ] Zone-based fallback system
- [ ] Similar route comparison
- [ ] Minimum price implementation

#### Phase 3: Testing & Validation
- [ ] Price calculation testing
- [ ] Edge case validation
- [ ] Performance testing
- [ ] User acceptance testing

#### Phase 4: UI/UX & Content
- [ ] Service level selection UI
- [ ] Price breakdown display
- [ ] Multilingual content
- [ ] Help documentation

### Technical Notes

1. **Price Calculation Priority**
   ```
   1. Fixed Routes
   2. Google Maps Distance
   3. Zone-based Fallback
   4. Similar Route Comparison
   ```

2. **Zone Configuration**
   ```typescript
   interface Zone {
     center: Point;
     name: string;
     minPrice: number;
     referenceRoutes: Route[];
   }
   ```

3. **Service Level Multipliers**
   ```typescript
   const multipliers = {
     standard: 0.85,
     business: 1.0
   };
   ```

### Next Steps
1. Implement price calculation engine
2. Set up Google Maps integration
3. Create zone configuration
4. Add service level tests
5. Update UI components

## Serverless Functions (Supabase Edge Functions)

### 1. Price Calculation Function
```typescript
// /supabase/functions/calculate-price/index.ts
interface PriceRequest {
  pickup: Location;
  dropoff: Location;
  serviceLevel: 'standard' | 'business';
  passengers: number;
  luggage: {
    large: number;
    carryOn: number;
  };
  bookingType: 'transfer' | 'hourly';
  hours?: number;
}

export const calculatePrice = async (req: PriceRequest) => {
  // 1. Check if fixed route exists
  const fixedRoute = await findFixedRoute(req.pickup, req.dropoff);
  if (fixedRoute) {
    return calculateFixedRoutePrice(fixedRoute, req);
  }

  // 2. Check if special location
  const specialLocation = await findSpecialLocation(req.pickup, req.dropoff);
  if (specialLocation) {
    return calculateSpecialLocationPrice(specialLocation, req);
  }

  // 3. Calculate custom route price
  return calculateCustomRoutePrice(req);
};
```

### 2. Booking Validation Function
```typescript
// /supabase/functions/validate-booking/index.ts
interface BookingValidation {
  vehicleRequired: number;
  isValid: boolean;
  errors?: string[];
  suggestions?: {
    alternativeVehicles?: string[];
    pricingOptions?: PricingOption[];
  };
}

export const validateBooking = async (booking: BookingRequest): Promise<BookingValidation> => {
  // 1. Validate passenger and luggage capacity
  const capacity = await checkVehicleCapacity(booking);
  
  // 2. Check vehicle availability
  const availability = await checkVehicleAvailability(booking);

  // 3. Validate pricing and routes
  const pricing = await validatePricing(booking);

  // 4. Generate suggestions if needed
  const suggestions = await generateAlternatives(booking);

  return {
    vehicleRequired: capacity.vehiclesNeeded,
    isValid: capacity.isValid && availability.isValid && pricing.isValid,
    errors: [...capacity.errors, ...availability.errors, ...pricing.errors],
    suggestions
  };
};
```

### 3. Stripe Payment Processing
```typescript
// /supabase/functions/process-payment/index.ts
export const processPayment = async (
  booking: ValidatedBooking,
  paymentMethod: string
) => {
  // 1. Create Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: booking.calculatedPrice * 100,
    currency: 'eur',
    payment_method: paymentMethod,
    metadata: {
      bookingId: booking.id,
      serviceType: booking.type,
      passengers: booking.passengers
    }
  });

  // 2. Update booking status
  await updateBookingStatus(booking.id, 'payment_pending');

  return paymentIntent;
};
```

### 4. Email Notifications
```typescript
// /supabase/functions/send-notifications/index.ts
export const sendNotifications = async (booking: Booking) => {
  // 1. Generate email content
  const emailContent = await generateEmailContent(booking);

  // 2. Send via Resend
  await resend.emails.send({
    from: 'Paris Elite Services <reservations@paris-elite-services.com>',
    to: booking.customerEmail,
    subject: `Booking Confirmation - ${booking.reference}`,
    react: emailContent
  });

  // 3. Send internal notification
  await sendInternalNotification(booking);
};
```

### 5. Availability Checker
```typescript
// /supabase/functions/check-availability/index.ts
export const checkAvailability = async (request: AvailabilityRequest) => {
  // 1. Check vehicle availability
  const vehicles = await getAvailableVehicles(request.date, request.timeSlot);

  // 2. Check driver availability
  const drivers = await getAvailableDrivers(request.date, request.timeSlot);

  // 3. Generate time slots if needed
  const alternativeSlots = await findAlternativeSlots(request);

  return {
    available: vehicles.length > 0 && drivers.length > 0,
    vehicles: vehicles.map(v => v.type),
    nextAvailable: alternativeSlots[0],
    alternatives: alternativeSlots
  };
};
```

### Function Deployment
```bash
# Deploy all functions
supabase functions deploy calculate-price
supabase functions deploy validate-booking
supabase functions deploy process-payment
supabase functions deploy send-notifications
supabase functions deploy check-availability

# Set environment variables
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set GOOGLE_MAPS_API_KEY=...
```

### Error Handling
```typescript
// /supabase/functions/shared/error-handler.ts
export const handleError = (error: Error, context: string) => {
  // 1. Log error to monitoring service
  logger.error(error, { context });

  // 2. Send alert if critical
  if (isCriticalError(error)) {
    alerts.send({
      level: 'critical',
      message: `Error in ${context}: ${error.message}`
    });
  }

  // 3. Return appropriate response
  return {
    statusCode: getStatusCode(error),
    body: {
      error: error.message,
      code: error.code
    }
  };
};
```

## Implementation Plan

### Phase 1: Database Migration (1 week)
1. Create Supabase Migration Files
   ```
   /supabase/migrations/
   ├── 20250301_service_levels.sql
   ├── 20250301_vehicle_categories.sql
   ├── 20250301_fixed_routes.sql
   ├── 20250301_hourly_rates.sql
   ├── 20250301_common_locations.sql
   └── 20250301_bookings_update.sql
   ```

2. TypeScript Types Update
   ```
   /src/types/
   ├── booking.ts
   ├── pricing.ts
   ├── vehicles.ts
   └── locations.ts
   ```

3. Database Seeding
   - Initial service levels
   - Vehicle categories
   - Fixed routes
   - Common locations

### Phase 2: Backend Logic (1 week)
1. Price Calculation Functions
   ```
   /src/utils/
   ├── price-calculator/
   │   ├── fixed-routes.ts
   │   ├── hourly-service.ts
   │   └── special-locations.ts
   └── location-matcher/
       ├── zone-finder.ts
       └── distance-calculator.ts
   ```

2. Supabase Edge Functions
   ```
   /supabase/functions/
   ├── calculate-price/
   ├── validate-booking/
   └── check-vehicle-availability/
   ```

3. API Integration
   - Update Stripe product/price configuration
   - Update email templates for new pricing

### Phase 3: Frontend Components (2 weeks)
1. Booking Flow Update
   ```
   /src/components/booking/
   ├── ServiceLevelSelector/
   ├── VehicleSelector/
   ├── LuggageInput/
   ├── LocationSelector/
   └── PriceDisplay/
   ```

2. New Components
   ```
   /src/components/
   ├── admin/
   │   ├── PriceManager/
   │   └── BookingManager/
   └── shared/
       ├── VehicleCard/
       └── PriceBreakdown/
   ```

3. Hooks & Context
   ```
   /src/hooks/
   ├── useBookingCalculator.ts
   ├── useVehicleAssignment.ts
   └── useLocationMatcher.ts
   ```

### Phase 4: Testing & QA (1 week)
1. Unit Tests
   ```
   /src/__tests__/
   ├── price-calculator.test.ts
   ├── location-matcher.test.ts
   └── booking-flow.test.ts
   ```

2. Integration Tests
   ```
   /cypress/integration/
   ├── booking-flow.spec.ts
   ├── price-calculation.spec.ts
   └── vehicle-assignment.spec.ts
   ```

3. E2E Testing
   - Complete booking flow
   - Payment processing
   - Email notifications

### Phase 5: Deployment & Monitoring (1 week)
1. Staged Rollout
   - Deploy database changes
   - Enable new pricing system in parallel
   - Gradual migration of existing bookings

2. Monitoring Setup
   - Price calculation accuracy
   - Booking success rates
   - System performance

3. Documentation
   ```
   /docs/
   ├── pricing-system.md
   ├── booking-flow.md
   └── admin-guide.md
   ```

### Git Workflow
1. Feature Branches
   ```bash
   git checkout -b feature/pricing-system
   git checkout -b feature/booking-flow-update
   git checkout -b feature/admin-interface
   ```

2. Husky Hooks
   ```json
   {
     "hooks": {
       "pre-commit": "lint-staged",
       "pre-push": "npm test",
       "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
     }
   }
   ```

3. GitHub Actions
   ```yaml
   name: CI/CD Pipeline
   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main, develop]
   ```

### Rollback Plan
1. Database Backups
   - Daily snapshots
   - Pre-migration backup

2. Version Control
   - Tagged releases
   - Reversion scripts

3. Monitoring Thresholds
   - Error rate triggers
   - Performance benchmarks

## Initial Data

```sql
-- Service Levels
INSERT INTO service_levels (id, name, multiplier, features) VALUES
('standard', 'Standard', 0.85, '{"wifi": "on request", "water": false}'),
('business', 'Business', 1.0, '{"wifi": true, "water": true, "meet_greet": true}');

-- Vehicle Categories
INSERT INTO vehicle_categories (id, name, capacity_passengers, capacity_suitcases, capacity_carry_on) VALUES
('sedan', 'Premium Sedan', 3, 3, 3),
('van', 'Luxury Van', 7, 7, 7);

-- Common Fixed Routes
INSERT INTO fixed_routes (route_type, origin_type, destination_type, base_price_1_3, base_price_4_7) VALUES
('airport_paris', 'airport', 'city', 120, 140),
('station_paris', 'station', 'city', 85, 105),
('disney_paris', 'attraction', 'city', 130, 150),
('airport_airport', 'airport', 'airport', 135, 155);

-- Hourly Rates
INSERT INTO hourly_rates (service_type, base_rate, min_hours) VALUES
('standard', 70, 3),
('shopping', 70, 3),
('events', 70, 3);
```

## Service Levels

### Standard Service
- Comfortable and reliable transportation
- Premium sedan (1-3 passengers)
  * Mercedes E-Class or similar
  * Peugeot 5008 or equivalent premium vehicle
- Spacious van (4-7 passengers)
  * Mercedes V-Class or similar
  * VW Caravelle or equivalent premium van
- Professional driver
- WiFi available on request
- 20€ less than Business rate
- Perfect for airport transfers and city trips

### Business Service
- Premium transportation experience
- Luxury sedan (1-3 passengers)
  * Mercedes E-Class or similar premium vehicle
- Executive van (4-7 passengers)
  * Mercedes V-Class or similar luxury van
- Professional driver
- Complimentary mineral water
- High-speed WiFi
- Meet & Greet included
- Flight tracking
- Ideal for business travelers and VIP clients

*Note: All our vehicles are recent models (less than 4 years old) from premium manufacturers, maintained to the highest standards of comfort and safety.*

## Pricing System

### Fixed Routes
1. Airport Transfers (CDG/Orly/Le Bourget)
   - 1-3 passengers: 100€/120€ (Standard/Business)
   - 4-7 passengers: 120€/140€ (Standard/Business)

2. Train Stations
   - 1-3 passengers: 70€/85€ (Standard/Business)
   - 4-7 passengers: 90€/105€ (Standard/Business)

3. Disneyland Paris
   - 1-3 passengers: 110€/130€ (Standard/Business)
   - 4-7 passengers: 130€/150€ (Standard/Business)

4. Between Airports (CDG ↔ Orly)
   - 1-3 passengers: 115€/135€ (Standard/Business)
   - 4-7 passengers: 130€/155€ (Standard/Business)

### Group Transfers (8-10 passengers)
1. Standard Configuration
   - 1 van (up to 7 passengers) + 1 sedan (up to 3 passengers)
   - Luggage can be distributed between both vehicles
   - Most economical option for groups
   - Perfect for standard luggage amounts

2. High Luggage Option
   - 2 vans available on request
   - Recommended for groups with extensive luggage
   - Ideal for golf groups, ski equipment, or extended stays
   - Additional space for oversized items

Pricing Example (Airport → Paris):
- Standard Configuration:
  * Business: van (140€) + sedan (120€) = 260€
  * Standard: van (120€) + sedan (100€) = 220€
- High Luggage Option (2 vans):
  * Business: 2 × van (140€) = 280€
  * Standard: 2 × van (120€) = 240€

*Note: Please inform us about your luggage requirements when booking so we can recommend the most suitable vehicle configuration for your group.*

### Vehicle & Luggage Capacity

1. Standard Service
   - Sedan (1-3 passengers):
     * 3 large suitcases + carry-ons
     * Perfect for business travelers or short stays
   - Van (4-7 passengers):
     * 7 large suitcases + carry-ons
     * Ideal for families and small groups

2. Business Service
   - Sedan (1-3 passengers):
     * 3 large suitcases + carry-ons
     * Premium luggage handling
   - Van (4-7 passengers):
     * 7 large suitcases + carry-ons
     * Dedicated luggage assistance
   - Additional vehicle available on request
     * Flexible arrangements for extra luggage
     * Seamless service for VIP clients

### Group & Premium Travel

1. Standard Group Configuration
   - Van + Sedan combination
   - Total capacity: 10 large suitcases + carry-ons
   - Economical solution for standard luggage amounts

2. Premium Travel Options
   - Multiple vehicle configurations available
   - Flexible arrangements for extensive luggage
   - Additional vehicles on request
   - Perfect for:
     * Extended luxury stays
     * Shopping tours
     * Golf or ski equipment
     * Professional equipment transport
     * High-end fashion travel

*Note: Please inform us of your luggage requirements when booking. For premium travel with extensive luggage, we'll arrange the perfect vehicle combination to ensure a comfortable and luxurious experience.*

### Non-Common Locations

1. Base Rules
   - All non-common transfers are calculated from Paris center
   - Minimum 3 hours for any destination outside Île-de-France
   - Excursions have fixed prices and include disposal time

2. Location Categories
   ```typescript
   enum LocationCategory {
     PARIS_REGION = 'paris_region',      // París y cercanías
     ILE_DE_FRANCE = 'ile_de_france',    // Región Île-de-France
     OUTSIDE_REGION = 'outside_region'    // Fuera de Île-de-France
   }
   ```

3. Price Calculation Logic
```typescript
interface NonCommonTransfer {
  pickup: Location;
  dropoff: Location;
  passengers: number;
  serviceLevel: 'standard' | 'business';
}

async function calculateNonCommonPrice(transfer: NonCommonTransfer): Promise<number> {
  // 1. Verificar si es una excursión conocida
  const excursion = await checkIfExcursion(transfer.pickup, transfer.dropoff);
  if (excursion) {
    return excursion.price;
  }

  // 2. Determinar categoría de ubicación
  const category = await determineLocationCategory(transfer.dropoff);
  
  // 3. Calcular precio según categoría
  switch(category) {
    case 'paris_region':
      // Usar punto común más cercano como referencia
      // Ejemplo: Neuilly-sur-Seine usa tarifa Paris
      return calculateParisRegionPrice(transfer);
      
    case 'ile_de_france':
      // Mínimo 2 horas de servicio
      // Ejemplo: Versailles, Rambouillet
      const hours = Math.max(2, await estimateRequiredHours(transfer));
      return hours * 70;
      
    case 'outside_region':
      // Mínimo 3 horas de servicio
      // Ejemplo: Chantilly, Reims, etc.
      const requiredHours = Math.max(3, await estimateRequiredHours(transfer));
      return requiredHours * 70;
  }
}

// Ejemplos de precios:

// 1. Paris → Neuilly-sur-Seine (paris_region)
// Usa tarifa Paris como base
// Business, 2 pax: 85€

// 2. Paris → Rambouillet (ile_de_france)
// Requiere 2 horas mínimo
// 2 horas × 70€ = 140€

// 3. Paris → Chantilly (outside_region)
// Requiere 3 horas mínimo
// 3 horas × 70€ = 210€

// 4. CDG → Chantilly (outside_region)
// Aunque está cerca de CDG, se calcula desde Paris
// Requiere 4 horas por ida y vuelta a Paris
// 4 horas × 70€ = 280€

// 5. Paris → Giverny
// Es una excursión, precio fijo: 395€
// Incluye 5 horas de disposición
```

4. Special Cases
   - Si el cliente necesita un servicio que incluye múltiples paradas o esperas, se recomienda servicio por horas
   - Para destinos muy lejanos (ejemplo: Normandía), se aplican las tarifas de excursiones
   - Viajes fuera de la región requieren confirmación previa de disponibilidad

### Hourly Service (Mise à disposition)
1. Premium Rate
   - 70€/hour (1-7 passengers)
   - Minimum booking: 3 hours (210€)
   
2. Service Types
   - Shopping tours
   - Business meetings
   - Events and ceremonies
   - Sightseeing
   - Professional services

3. Premium Services Included
   - Professional driver
   - Mercedes E-Class (1-3 pax) or V-Class (4-7 pax)
   - Fuel and tolls within Paris region
   - Waiting time
   - WiFi and water
   - Meet & Greet
   - Flight tracking (if applicable)
   
4. Terms & Conditions
   - Booking must be made at least 24h in advance
   - Cancellation: free up to 24h before service
   - Minimum charge: 3 hours (210€)

### Price Calculation
```typescript
interface BookingCalculator {
  calculateTransferPrice(
    routeType: string,
    passengers: number,
    serviceLevel: 'standard' | 'business'
  ): number;

  calculateHourlyPrice(hours: number): number;
}

class PriceCalculator implements BookingCalculator {
  calculateTransferPrice(
    routeType: string,
    passengers: number,
    serviceLevel: 'standard' | 'business'
  ): number {
    const priceRecord = this.getPriceForRouteType(routeType);
    const basePrice = passengers <= 3 
      ? priceRecord.price_1_3_pax 
      : priceRecord.price_4_7_pax;
      
    return serviceLevel === 'standard' 
      ? Math.round((basePrice * 0.85) / 5) * 5 
      : basePrice;
  }

  calculateHourlyPrice(hours: number): number {
    return Math.max(3, hours) * 70;
  }
}
```

## Development Phases

### Phase 1: Database & Backend Foundation (2 weeks)
1. Supabase Setup
   ```sql
   -- Crear tablas principales
   service_levels
   fixed_route_prices
   common_points
   pricing_zones
   bookings
   ```
2. Google Maps Integration
   - Configurar API y credenciales
   - Implementar funciones de geocoding
   - Crear sistema de cache para coordenadas comunes

3. Price Calculation Engine
   ```typescript
   - implementar findNearestCommonPoint()
   - implementar getFixedPrice()
   - implementar calculateDistanceBasedPrice()
   ```

### Phase 2: Frontend Components (2 weeks)
1. Booking Flow
   ```typescript
   /components/booking/
   ├── ServiceLevelSelector/
   │   ├── Standard
   │   └── Business
   ├── LocationSelector/
   │   ├── CommonPoints
   │   ├── GoogleMapsAutocomplete
   │   └── RecentLocations
   ├── VehicleSelector/
   │   ├── 1-3 passengers
   │   └── 4-7 passengers
   └── PriceDisplay/
       ├── BasePrice
       └── Supplements
   ```

2. Admin Interface
   ```typescript
   /components/admin/
   ├── PriceManager/
   │   ├── FixedRoutes
   │   └── CommonPoints
   ├── BookingOverview/
   └── ReportsGenerator/
   ```

### Phase 3: Integration & Testing (1 week)
1. API Integration
   ```typescript
   - Conectar frontend con Supabase
   - Integrar Google Maps en tiempo real
   - Implementar cálculo de precios
   ```

2. Testing Suite
   ```typescript
   /tests/
   ├── unit/
   │   ├── priceCalculation.test.ts
   │   └── locationMatching.test.ts
   ├── integration/
   │   ├── booking.test.ts
   │   └── payment.test.ts
   └── e2e/
       └── completeBooking.test.ts
   ```

### Phase 4: Launch Preparation (1 week)
1. Content & Translations
   ```json
   {
     "fr": {
       "service_levels": {
         "standard": "Service Standard",
         "business": "Service Business"
       }
     },
     "en": {...},
     "es": {...},
     "pt": {...}
   }
   ```

2. Documentation
   - API endpoints
   - Price calculation logic
   - Common points mapping
   - Admin guide

## Migration Strategy

### 1. Data Migration (Week 1)
```sql
-- Migrar precios existentes
INSERT INTO fixed_route_prices (
  SELECT * FROM old_prices
  WHERE route_type IN ('airport', 'station', 'disney')
);

-- Configurar puntos comunes
INSERT INTO common_points (
  name, coordinates, radius, base_price
) VALUES
  ('CDG Airport', {lat: 49.009724, lng: 2.547778}, 2000, {...}),
  ('Paris Center', {lat: 48.856614, lng: 2.352222}, 5000, {...});
```

### 2. Parallel Testing (Week 2)
1. Shadow Mode
   - Nuevo sistema calcula precios en paralelo
   - Comparar con sistema actual
   - Ajustar algoritmos según necesidad

2. Staff Training
   - Sesiones con equipo administrativo
   - Documentación de nuevos procesos
   - Período de prueba interno

### 3. Rollout (Week 3)
1. Fase 1: Nuevas Reservas
   - Activar nuevo sistema para reservas nuevas
   - Mantener sistema antiguo para reservas existentes
   - Monitorear resultados

2. Fase 2: Migración Completa
   - Migrar reservas pendientes al nuevo sistema
   - Desactivar sistema antiguo
   - Backup de datos históricos

## Monitoring & Maintenance

### 1. Performance Metrics
- Tiempo de respuesta API
- Precisión de coincidencia de ubicaciones
- Tasa de conversión de reservas

### 2. Ajustes Post-Launch
- Refinamiento de radios de puntos comunes
- Ajuste de precios según feedback
- Optimización de caché

### 3. Backup & Recovery
- Backups diarios de Supabase
- Plan de recuperación de desastres
- Logs de auditoría

## Existing Features to Preserve
- Current booking flow
- Stripe payment integration
- Email notifications system
- Multi-language support (FR, EN, ES, PT)
- Existing admin functions

## Integrations

### Current
- Stripe: Payment processing
- Supabase: Database and auth
- Resend: Email notifications
- Google Maps: Location services

### New Features
- Zone-based pricing
- Multi-language destination management
- Service level selection
- Price calculation engine

## Future Enhancements (v2.0)
- Dynamic pricing
- Advanced analytics
- Driver portal
- Customer loyalty system

## Documentation
- API documentation
- Admin guide
- Translation guide
- Testing guide

## Contact
For technical questions or issues, contact the development team.

## Database Integration
- Backend: Supabase
- Connection: Direct client integration with TypeScript support
- Authentication: Anonymous key with restricted permissions
- Data Types: Strongly typed with Database type definitions
- Location: `/src/integrations/supabase/`

### Key Features
- Auto-refresh token management
- Persistent sessions
- URL session detection
- Type-safe database operations

