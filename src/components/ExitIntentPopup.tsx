import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useExitIntent from '@/hooks/useExitIntent'

export default function ExitIntentPopup() {
  const { t, i18n } = useTranslation()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Hook to detect exit intent
  const handleShow = () => setIsOpen(true)
  useExitIntent({ onTrigger: handleShow })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      toast({
        title: t('exitPopup.invalidEmail'),
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      // Check if Supabase is properly configured
      const isConfigured = supabaseUrl &&
                          supabaseAnonKey &&
                          !supabaseAnonKey.includes('temporary') &&
                          !supabaseAnonKey.includes('your_')

      if (!isConfigured) {
        console.warn('⚠️ Supabase not configured. Using demo mode.')

        // Demo mode - simulate success
        toast({
          title: t('exitPopup.success'),
          description: '🎉 Demo: Your coupon code is DEMO10 (10% off)',
          duration: 5000
        })

        setIsOpen(false)
        localStorage.setItem('exitIntentShown', JSON.stringify({
          shown: true,
          timestamp: Date.now(),
          submitted: true
        }))
        setEmail('')
        setIsLoading(false)
        return
      }

      const response = await fetch(
        `${supabaseUrl}/functions/v1/create-exit-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            email,
            language: i18n.language,
            honeypot
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register')
      }

      // Success
      toast({
        title: t('exitPopup.success'),
        description: data.message,
        duration: 5000
      })

      // Close popup and mark as submitted
      setIsOpen(false)
      localStorage.setItem('exitIntentShown', JSON.stringify({
        shown: true,
        timestamp: Date.now(),
        submitted: true
      }))

      // Clear form
      setEmail('')

    } catch (error) {
      console.error('Exit popup error:', error)
      toast({
        title: t('exitPopup.error'),
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md p-0 overflow-hidden border-2 border-primary/20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
                  {t('exitPopup.title')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('exitPopup.subtitle')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder={t('exitPopup.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                  disabled={isLoading}
                  required
                  autoFocus
                />

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute opacity-0 pointer-events-none"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? t('exitPopup.sending') : t('exitPopup.button')}
                </Button>
              </form>

              {/* Benefits */}
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>{t('exitPopup.benefit1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>{t('exitPopup.benefit2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>{t('exitPopup.benefit3')}</span>
                </div>
              </div>

              {/* Validity note */}
              <p className="text-xs text-muted-foreground text-center mt-6">
                {t('exitPopup.validity')}
              </p>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

