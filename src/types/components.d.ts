
export interface BookingFormProps {
  tourId: string;
  tourName: string;
  basePrice: number;
  onSubmit: (bookingDetails: any) => Promise<void>;
}

export interface FormProps {
  bookingData: any;
  onSubmit: (paymentDetails: any) => Promise<void>;
  isProcessing: boolean;
  error: string;
}

export interface BookingConfirmationProps {
  bookingId: string;
  bookingData: any;
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
