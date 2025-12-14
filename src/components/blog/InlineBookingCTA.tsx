import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Car } from 'lucide-react'
import BookingForm from '@/components/BookingForm'

export default function InlineBookingCTA() {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="bg-secondary/10 border border-primary/20 rounded-lg p-6 my-8">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Car className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {t('blog.needTransfer') || 'Need a transfer?'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('blog.calculatePrice') || 'Get an instant quote for your airport transfer'}
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap">
            {t('blog.getQuote') || 'Get Quote'}
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingForm onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

