import { Helmet } from 'react-helmet-async'

interface JsonLdProps {
  data: object
}

/**
 * Component to inject JSON-LD structured data into the page head
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  )
}

