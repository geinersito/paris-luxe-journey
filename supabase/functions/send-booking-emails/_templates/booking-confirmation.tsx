
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Row,
  Column,
} from 'npm:@react-email/components@0.0.7'
import * as React from 'npm:react@18.2.0'

interface BookingConfirmationEmailProps {
  customerName: string;
  bookingId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDateTime: string;
  passengers: number;
  vehicleType: string;
  totalPrice: number;
  flightNumber?: string;
}

export const BookingConfirmationEmail = ({
  customerName,
  bookingId,
  pickupLocation,
  dropoffLocation,
  pickupDateTime,
  passengers,
  vehicleType,
  totalPrice,
  flightNumber,
}: BookingConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirmación de su reserva con Paris Elite Services</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>¡Gracias por su reserva!</Heading>
        <Text style={text}>
          Estimado/a {customerName},
        </Text>
        <Text style={text}>
          Su reserva ha sido confirmada. A continuación encontrará los detalles de su servicio:
        </Text>
        
        <Section style={detailsSection}>
          <Row>
            <Column>
              <Text style={label}>Número de Reserva:</Text>
              <Text style={value}>{bookingId}</Text>
              
              <Text style={label}>Fecha y Hora de Recogida:</Text>
              <Text style={value}>{pickupDateTime}</Text>
              
              <Text style={label}>Lugar de Recogida:</Text>
              <Text style={value}>{pickupLocation}</Text>
              
              <Text style={label}>Destino:</Text>
              <Text style={value}>{dropoffLocation}</Text>
              
              <Text style={label}>Pasajeros:</Text>
              <Text style={value}>{passengers}</Text>
              
              <Text style={label}>Vehículo:</Text>
              <Text style={value}>{vehicleType}</Text>
              
              {flightNumber && (
                <>
                  <Text style={label}>Número de Vuelo:</Text>
                  <Text style={value}>{flightNumber}</Text>
                </>
              )}
              
              <Text style={label}>Precio Total:</Text>
              <Text style={value}>€{totalPrice}</Text>
            </Column>
          </Row>
        </Section>

        <Text style={text}>
          Si necesita modificar su reserva o tiene alguna pregunta, no dude en contactarnos:
        </Text>
        
        <Text style={contact}>
          Email: reservas@pariseliteservices.com
          <br />
          Teléfono: +33 1 XX XX XX XX
        </Text>
        
        <Text style={footer}>
          Gracias por elegir Paris Elite Services.
          <br />
          ¡Esperamos darle la bienvenida pronto!
        </Text>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const detailsSection = {
  backgroundColor: '#f9f9f9',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
}

const label = {
  color: '#666',
  fontSize: '14px',
  marginBottom: '4px',
}

const value = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '16px',
}

const contact = {
  color: '#666',
  fontSize: '14px',
  margin: '24px 0',
  textAlign: 'center' as const,
}

const footer = {
  color: '#898989',
  fontSize: '14px',
  margin: '24px 0',
  textAlign: 'center' as const,
}

export default BookingConfirmationEmail;
