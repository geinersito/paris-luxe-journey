// Email templates for exit popup welcome emails
// Multilingual support: EN, ES, FR, PT

interface EmailContent {
  subject: string
  greeting: string
  title: string
  message: string
  codeLabel: string
  validityLabel: string
  ctaButton: string
  benefits: {
    title: string
    items: string[]
  }
  footer: string
  unsubscribe: string
}

const translations: Record<string, EmailContent> = {
  en: {
    subject: '🎁 Your 10% Discount Code for Paris Elite Services',
    greeting: 'Hello!',
    title: 'Welcome to Paris Elite Services',
    message: 'Thank you for your interest in our premium VTC services in Paris. As promised, here is your exclusive 10% discount code for your first transfer:',
    codeLabel: 'Your Discount Code',
    validityLabel: 'Valid for 7 days • One-time use',
    ctaButton: 'Book Now with Discount',
    benefits: {
      title: 'What you get with Paris Elite Services:',
      items: [
        '✓ Fixed price, no surprises',
        '✓ Professional bilingual driver',
        '✓ Free cancellation up to 24h',
        '✓ Premium vehicles (Mercedes, BMW)',
        '✓ Meet & Greet at airport',
        '✓ 24/7 customer support'
      ]
    },
    footer: 'Questions? Reply to this email or contact us via WhatsApp at +33 6 68 25 11 02',
    unsubscribe: 'You received this email because you signed up for our newsletter on pariseliteservices.com'
  },
  es: {
    subject: '🎁 Tu Código de Descuento 10% para Paris Elite Services',
    greeting: '¡Hola!',
    title: 'Bienvenido a Paris Elite Services',
    message: 'Gracias por tu interés en nuestros servicios VTC premium en París. Como prometimos, aquí está tu código de descuento exclusivo del 10% para tu primer traslado:',
    codeLabel: 'Tu Código de Descuento',
    validityLabel: 'Válido por 7 días • Un solo uso',
    ctaButton: 'Reservar Ahora con Descuento',
    benefits: {
      title: 'Lo que obtienes con Paris Elite Services:',
      items: [
        '✓ Precio fijo, sin sorpresas',
        '✓ Conductor profesional bilingüe',
        '✓ Cancelación gratuita hasta 24h',
        '✓ Vehículos premium (Mercedes, BMW)',
        '✓ Recepción en aeropuerto',
        '✓ Soporte 24/7'
      ]
    },
    footer: '¿Preguntas? Responde a este email o contáctanos por WhatsApp al +33 6 68 25 11 02',
    unsubscribe: 'Recibiste este email porque te suscribiste a nuestro newsletter en pariseliteservices.com'
  },
  fr: {
    subject: '🎁 Votre Code de Réduction 10% pour Paris Elite Services',
    greeting: 'Bonjour !',
    title: 'Bienvenue chez Paris Elite Services',
    message: 'Merci pour votre intérêt pour nos services VTC premium à Paris. Comme promis, voici votre code de réduction exclusif de 10% pour votre premier transfert :',
    codeLabel: 'Votre Code de Réduction',
    validityLabel: 'Valable 7 jours • Usage unique',
    ctaButton: 'Réserver Maintenant avec Réduction',
    benefits: {
      title: 'Ce que vous obtenez avec Paris Elite Services :',
      items: [
        '✓ Prix fixe, sans surprises',
        '✓ Chauffeur professionnel bilingue',
        '✓ Annulation gratuite jusqu\'à 24h',
        '✓ Véhicules premium (Mercedes, BMW)',
        '✓ Accueil à l\'aéroport',
        '✓ Support client 24/7'
      ]
    },
    footer: 'Questions ? Répondez à cet email ou contactez-nous via WhatsApp au +33 6 68 25 11 02',
    unsubscribe: 'Vous avez reçu cet email car vous vous êtes inscrit à notre newsletter sur pariseliteservices.com'
  },
  pt: {
    subject: '🎁 Seu Código de Desconto 10% para Paris Elite Services',
    greeting: 'Olá!',
    title: 'Bem-vindo ao Paris Elite Services',
    message: 'Obrigado pelo seu interesse em nossos serviços VTC premium em Paris. Como prometido, aqui está seu código de desconto exclusivo de 10% para seu primeiro transfer:',
    codeLabel: 'Seu Código de Desconto',
    validityLabel: 'Válido por 7 dias • Uso único',
    ctaButton: 'Reservar Agora com Desconto',
    benefits: {
      title: 'O que você recebe com Paris Elite Services:',
      items: [
        '✓ Preço fixo, sem surpresas',
        '✓ Motorista profissional bilíngue',
        '✓ Cancelamento gratuito até 24h',
        '✓ Veículos premium (Mercedes, BMW)',
        '✓ Recepção no aeroporto',
        '✓ Suporte 24/7'
      ]
    },
    footer: 'Dúvidas? Responda este email ou entre em contato via WhatsApp: +33 6 68 25 11 02',
    unsubscribe: 'Você recebeu este email porque se inscreveu em nossa newsletter em pariseliteservices.com'
  }
}

export function getEmailTemplate(couponCode: string, language: string): { subject: string; html: string } {
  const lang = language in translations ? language : 'en'
  const t = translations[lang]
  
  const bookingUrl = `https://pariseliteservices.com/booking?coupon=${couponCode}`
  
  const html = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                Paris Elite Services
              </h1>
              <p style="margin: 10px 0 0; color: #C9A961; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
                Premium VTC Services
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 500;">
                ${t.greeting}
              </p>
              
              <h2 style="margin: 0 0 15px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                ${t.title}
              </h2>
              
              <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.6;">
                ${t.message}
              </p>
              
              <!-- Coupon Code Box -->
              <div style="background: linear-gradient(135deg, #f8f8f8 0%, #ececec 100%); border: 2px dashed #C9A961; border-radius: 8px; padding: 30px; text-align: center; margin: 0 0 30px;">
                <p style="margin: 0 0 10px; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                  ${t.codeLabel}
                </p>
                <p style="margin: 0 0 10px; color: #1a1a1a; font-size: 36px; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace;">
                  ${couponCode}
                </p>
                <p style="margin: 0; color: #999999; font-size: 12px;">
                  ${t.validityLabel}
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 0 0 40px;">
                <a href="${bookingUrl}" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600; transition: background-color 0.3s;">
                  ${t.ctaButton}
                </a>
              </div>
              
              <!-- Benefits -->
              <div style="background-color: #f8f8f8; border-radius: 8px; padding: 25px; margin: 0 0 30px;">
                <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                  ${t.benefits.title}
                </h3>
                ${t.benefits.items.map(item => `
                  <p style="margin: 0 0 10px; color: #666666; font-size: 14px; line-height: 1.6;">
                    ${item}
                  </p>
                `).join('')}
              </div>
              
              <!-- Footer Message -->
              <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                ${t.footer}
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f8f8; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; color: #999999; font-size: 12px;">
                ${t.unsubscribe}
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} Paris Elite Services. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
  
  return {
    subject: t.subject,
    html
  }
}

