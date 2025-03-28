# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- Simplified vehicle fleet to two core options:
  * Berline Mercedes (1-3 passengers)
  * Van Mercedes (1-7 passengers)
- Updated vehicle descriptions to focus on passenger capacity
- Streamlined pricing structure for vehicle categories
- Modified vehicle features to use standardized keys
- Optimized vehicle selection interface for clarity

### Removed
- Removed luxury vehicle category (Mercedes Class S)
- Eliminated redundant vehicle options

### Added
- New pricing system with service levels and vehicle categories
- Database migrations for pricing structure:
  - Service levels with multilingual descriptions
  - Vehicle categories with capacity details
  - Fixed routes pricing
  - Hourly rates configuration
  - Updated bookings table structure
- TypeScript interfaces for pricing system
- Service level selection in booking form
- Price calculation based on service level multipliers
- Service Level Pricing System implementation
  * Standard service (0.85x multiplier)
  * Business service (1.0x multiplier)
  * Base price calculation with Google Maps integration
  * Zone-based fallback system with Paris as reference
- Advanced distance calculation system
  * Integration with Google Maps Distance Matrix API
  * Fallback system for non-found locations
  * Price comparison with similar routes
  * Minimum price guarantees per zone

### Changed
- Updated BookingForm component to support service levels
- Modified booking validation to include service level checks
- Enhanced price calculation logic with service multipliers
- Updated booking form with service level selection
- Enhanced price calculation to consider Paris as central reference
- Modified vehicle assignment logic for service levels

### Fixed
- Improved error handling for location and service level loading
- Better type safety with new TypeScript interfaces
- Error handling for location geocoding
- Price consistency for routes outside Paris
- Service level validation in booking form

## [0.1.0] - 2025-03-01

### Added
- Initial project setup with React, TypeScript, and Vite
- Supabase integration for backend services
- Stripe integration for payment processing
- Resend integration for email services
- Google Maps integration
- Multi-language support (FR, EN, ES, PT)
- Booking system implementation
- Husky and lint-staged for code quality
- Environment configuration with .env.example
- Basic project documentation

### Changed
- Migrated repository from old codebase to new clean repository
- Updated TypeScript configuration for better type checking
- Improved project structure and organization

### Fixed
- TypeScript configuration issues
- Git hooks configuration

## [En Desarrollo] - 2025-02-26

### Completado 

#### FASE 1: ESTRUCTURA BASE EXCURSIONES
- Implementada página principal de excursiones con hero section
- Creado grid de destinos con 5 destinos principales
- Implementado sistema de filtros (duración, tipo, temporada, precio)
- Desarrollado template base para páginas de destino
- Completada página de Versailles con contenido detallado

#### FASE 1: SISTEMA DE RESERVAS
- Implementado formulario de reserva completo
- Integración con Stripe funcionando
- Sistema de emails vía Resend
- Base de datos en Supabase configurada

#### FASE 2: MEJORAS Y CORRECCIONES
- Corregido problema de navegación duplicada
- Arreglado error de ruta en la página de confirmación
- Mejorada la gestión de estados en el proceso de reserva
- Actualizado sistema de pagos para usar payment_id
- Optimizada validación en página de confirmación

### Planificado

#### FASE 3: SISTEMA DE GESTIÓN
- Panel de administración de reservas
- Sistema de agenda y calendario
- Portal de conductores
- Gestión de disponibilidad
- Sistema de notificaciones multicanal

#### FASE 4: PLANIFICADOR INTELIGENTE
- Motor de recomendaciones con IA
- Integración con APIs de clima y eventos
- Sistema de itinerarios dinámicos
- Optimización contextual de planes

#### FASE 5: ESTRUCTURA DEL BLOG
- Implementación de la página principal del blog
- Sistema de categorías
- Template para artículos
- Sistema de gestión de contenido

#### FASE 6: AGENDA CULTURAL
- Calendario de eventos premium
- Sistema de filtrado avanzado
- Integración con servicios de transporte
- Notificaciones personalizadas

### Mejoras Técnicas Pendientes 
- Optimización de rendimiento
- Mejoras en SEO
- Testing y QA
- Documentación técnica

### Notas de Versión
- La estructura base del proyecto está establecida
- Supabase está configurado y funcionando
- Sistema de internacionalización base implementado
- Componentes principales desarrollados y estilizados
- Sistema de pagos y emails funcionando correctamente

## [1.x.x] - 2024-01-xx
### Added
- Integrated Supabase as the backend database service
- Added database client configuration with authentication
- Set up secure environment for database credentials
- Implemented database connection with TypeScript support
