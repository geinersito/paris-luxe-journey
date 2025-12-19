export interface BookingFormProps {
  tourId: string;
  tourName: string;
  basePrice?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (bookingDetails: any) => Promise<void>;
  compact?: boolean; // Para usar dentro de modales sin padding extra
  initialData?: {
    pickup?: string;
    dropoff?: string;
    passengers?: string;
  };
  onClose?: () => void;
}

export interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookingData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (paymentDetails: any) => Promise<void>;
  isProcessing: boolean;
  error: string;
}

export interface BookingConfirmationProps {
  bookingId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookingData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tourData: any;
}

export interface DestinationNavigationProps {
  items: Array<{ id: string; label: string }>;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export interface DestinationHeaderProps {
  title: string;
  image: string;
  distance: string;
  duration: string;
  currentPath: string;
}

export interface DestinationContentProps {
  activeSection: string;
  content: {
    description: React.ReactElement;
    tours: React.ReactElement;
    map: React.ReactElement;
    events: React.ReactElement;
    faq: React.ReactElement;
  };
}

export interface DestinationSidebarProps {
  children: React.ReactElement;
  tours: React.ReactElement;
}
