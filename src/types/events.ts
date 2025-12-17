// Events Feed types

import type { LocalizedString, Language } from './blog'

// Re-export for convenience
export type { LocalizedString, Language }

export type EventCategory =
  | 'exhibition' 
  | 'opera' 
  | 'fashion' 
  | 'festival' 
  | 'concert' 
  | 'museum' 
  | 'family'

export interface Event {
  id: string
  startAt: string // ISO timestamp
  endAt?: string // ISO timestamp (optional)
  title: LocalizedString
  description: LocalizedString
  venueName?: LocalizedString
  district?: string // e.g., "8ème", "1er", "La Défense"
  address?: string
  eventUrl: string // Official link (required)
  imageUrl?: string
  category?: EventCategory
  isFeatured: boolean
  sourceName: string // e.g., "Ville de Paris", "OpenAgenda"
}

export interface EventsFeed {
  generatedAt: string // ISO timestamp
  timezone: string // "Europe/Paris"
  thisWeek: Event[] // Max 8 events
  thisMonth: Event[] // Max 12 events
}

export type EventRange = 'week' | 'month'
export type EventVariant = 'compact' | 'full'

export interface EventsFeedProps {
  range: EventRange
  variant?: EventVariant
  showHeader?: boolean // Control whether to show the section header
}

