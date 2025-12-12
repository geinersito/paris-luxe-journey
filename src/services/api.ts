// API service for price calculation and validation
// This is a placeholder for test compatibility

export const calculatePrice = async (
  origin: string,
  destination: string,
  passengers: number
): Promise<number> => {
  // This would normally call the backend API
  // For now, return a mock price
  return 100;
};

export const validatePrice = async (
  origin: string,
  destination: string,
  passengers: number,
  clientPrice: number
): Promise<number> => {
  // This would normally validate the price with the backend
  // For now, return the client price
  return clientPrice;
};

