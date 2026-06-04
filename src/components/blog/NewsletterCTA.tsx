import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/hooks/use-toast'
import { Mail, Sparkles } from 'lucide-react'

export default function NewsletterCTA() {
  const { t, i18n } = useTranslation()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      toast({
        title: t('exitPopup.invalidEmail'),
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      const isConfigured =
        supabaseUrl &&
        supabaseAnonKey &&
        !supabaseAnonKey.includes('temporary') &&
        !supabaseAnonKey.includes('your_')

      if (!isConfigured) {
        console.warn('⚠️ Supabase not configured. Using demo mode.')
        toast({
          title: t('exitPopup.success'),
          description: '🎉 Demo: You\'ve been subscribed! Check your email for a 10% discount code.',
          duration: 5000,
        })
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
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            email,
            language: i18n.language,
            honeypot: '',
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      toast({
        title: t('exitPopup.success'),
        description: data.message,
        duration: 5000,
      })

      setEmail('')
    } catch (error) {
      console.error('Newsletter error:', error)
      toast({
        title: t('exitPopup.error'),
        description:
          error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-ref-bg border border-ref-ink/8 rounded-2xl p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-ref-navy/8 rounded-full mb-6">
          <Sparkles className="w-8 h-8 text-ref-navy" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {t('blog.newsletter.title') || 'Get Travel Tips & Exclusive Offers'}
        </h3>

        <p className="text-muted-foreground mb-8">
          {t('blog.newsletter.description') ||
            'Subscribe to our newsletter and receive a 10% discount code for your first booking, plus insider tips for traveling in Paris.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('exitPopup.emailPlaceholder') || 'Enter your email'}
            disabled={isLoading}
            className="flex-1 h-12 px-4 border border-ref-ink/20 focus:outline-none focus:border-ref-ink/40 bg-white text-ref-ink placeholder:text-ref-ink/40 disabled:opacity-50"
          />
          <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 bg-ref-navy text-white hover:bg-ref-ink transition-colors whitespace-nowrap disabled:opacity-50">
            {isLoading ? (
              t('common.processing')
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                {t('blog.newsletter.subscribe') || 'Subscribe'}
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          {t('blog.newsletter.privacy') ||
            'We respect your privacy. Unsubscribe at any time.'}
        </p>
      </div>
    </div>
  )
}

