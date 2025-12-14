import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Share2, Facebook, Twitter, Linkedin, Link2, MessageCircle } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url?: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const shareUrl = url || window.location.href
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: t('blog.linkCopied') || 'Link copied!',
        description: t('blog.copySuccess') || 'The link has been copied to your clipboard.',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: t('blog.copyError') || 'Error',
        description: 'Failed to copy link. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-500/10 hover:text-green-600',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-500/10 hover:text-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-sky-500/10 hover:text-sky-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-700/10 hover:text-blue-700',
    },
  ]

  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">
          {t('blog.shareArticle') || 'Share this article'}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Social Share Buttons */}
        {shareLinks.map((link) => {
          const Icon = link.icon
          return (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
              className={`transition-colors ${link.color}`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {link.name}
            </Button>
          )
        })}

        {/* Copy Link Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="transition-colors hover:bg-primary/10 hover:text-primary"
        >
          <Link2 className="w-4 h-4 mr-2" />
          {t('blog.copyLink') || 'Copy Link'}
        </Button>
      </div>
    </div>
  )
}

