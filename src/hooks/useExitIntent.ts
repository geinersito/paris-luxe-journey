import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface ExitIntentConfig {
  sensitivity?: number
  delayMobile?: number
  scrollThreshold?: number
  cookieExpiry?: number
  onTrigger: () => void
}

interface StoredData {
  shown: boolean
  timestamp: number
  submitted: boolean
}

export default function useExitIntent({
  sensitivity = 10,
  delayMobile = 30000,
  scrollThreshold = 0.5,
  cookieExpiry = 24 * 60 * 60 * 1000, // 24 hours
  onTrigger
}: ExitIntentConfig) {
  const location = useLocation()
  const [hasTriggered, setHasTriggered] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  // Routes where popup should NOT show
  const excludedRoutes = ['/booking', '/payment', '/confirmation']
  const isExcluded = excludedRoutes.some(route => 
    location.pathname.startsWith(route)
  )

  // Check localStorage for previous popup display
  const checkStorage = (): boolean => {
    try {
      const stored = localStorage.getItem('exitIntentShown')
      if (!stored) return false

      const data: StoredData = JSON.parse(stored)
      const isExpired = Date.now() - data.timestamp > cookieExpiry

      if (isExpired) {
        localStorage.removeItem('exitIntentShown')
        return false
      }

      // Don't show again if already shown or submitted
      return data.shown || data.submitted
    } catch {
      return false
    }
  }

  // Trigger the popup
  const trigger = () => {
    if (hasTriggered || isExcluded || checkStorage()) return

    setHasTriggered(true)
    onTrigger()

    // Save to localStorage
    localStorage.setItem('exitIntentShown', JSON.stringify({
      shown: true,
      timestamp: Date.now(),
      submitted: false
    }))
  }

  useEffect(() => {
    // Don't run if excluded or already shown
    if (isExcluded || checkStorage()) return

    // Detect mobile vs desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    // ========================================================================
    // DESKTOP: Exit intent via mouse leaving viewport
    // ========================================================================
    if (!isMobile) {
      const handleMouseLeave = (e: MouseEvent) => {
        // Trigger when mouse leaves from top of viewport
        if (e.clientY < sensitivity) {
          trigger()
        }
      }

      document.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    // ========================================================================
    // MOBILE: Timer + engagement (scroll or interaction)
    // ========================================================================
    const handleScroll = () => {
      const scrollPercent = 
        (window.scrollY + window.innerHeight) / document.body.scrollHeight

      if (scrollPercent > scrollThreshold) {
        setHasScrolled(true)
      }
    }

    const handleInteraction = () => {
      setHasInteracted(true)
    }

    // Listen for scroll and interaction events
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction, { passive: true })

    // Set timer for mobile
    timerRef.current = setTimeout(() => {
      // Only trigger if user has engaged (scrolled or interacted)
      if (hasScrolled || hasInteracted) {
        trigger()
      }
    }, delayMobile)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [hasScrolled, hasInteracted, isExcluded])

  // Reset on route change
  useEffect(() => {
    setHasScrolled(false)
    setHasInteracted(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [location.pathname])

  return null
}

