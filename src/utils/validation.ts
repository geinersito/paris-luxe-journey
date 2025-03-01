
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Acepta formatos internacionales: +33 XXXXXXXXX o +33XXXXXXXXX
  const phoneRegex = /^\+\d{2}(?:\s)?\d{9}$/;
  return phoneRegex.test(phone);
};

export const isValidName = (name: string): boolean => {
  // Al menos dos palabras, cada una con al menos 2 caracteres
  const words = name.trim().split(/\s+/);
  return words.length >= 2 && words.every(word => word.length >= 2);
};
