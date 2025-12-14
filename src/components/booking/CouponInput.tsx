import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBooking } from '@/contexts/BookingContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Tag, X, Check } from 'lucide-react'

export default function CouponInput() {
  const { t } = useTranslation()
  const { coupon, validateCoupon, removeCoupon } = useBooking()
  const [code, setCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)

  const handleApply = async () => {
    if (!code.trim()) return

    setIsValidating(true)
    await validateCoupon(code.trim())
    setIsValidating(false)
    setCode('') // Clear input after validation
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleApply()
    }
  }

  // If coupon is already applied, show it
  if (coupon?.valid) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Tag className="w-4 h-4" />
          {t('booking.coupon.label')}
        </label>
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-900 dark:text-green-100">
              {coupon.code}
            </p>
            <p className="text-xs text-green-700 dark:text-green-300">
              {t('booking.coupon.discount')}: {coupon.discount}%
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeCoupon}
            className="flex-shrink-0 h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/40"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Otherwise show input to enter coupon
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Tag className="w-4 h-4" />
        {t('booking.coupon.label')}
      </label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder={t('booking.coupon.placeholder')}
          disabled={isValidating}
          className="flex-1 uppercase"
          maxLength={20}
        />
        <Button
          type="button"
          onClick={handleApply}
          disabled={!code.trim() || isValidating}
          variant="outline"
          className="flex-shrink-0"
        >
          {isValidating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('common.processing')}
            </>
          ) : (
            t('booking.coupon.apply')
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        {t('exitPopup.validity')}
      </p>
    </div>
  )
}

