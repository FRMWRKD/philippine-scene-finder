
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!value || value.trim() === '') {
    errors.push(`${fieldName} is required`);
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateDate = (date: Date | undefined, fieldName: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!date) {
    errors.push(`${fieldName} is required`);
  } else if (date < new Date()) {
    errors.push(`${fieldName} cannot be in the past`);
  }
  
  return { isValid: errors.length === 0, errors };
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .trim();
};

export const validateBookingForm = (data: {
  selectedDate?: Date;
  timeSlot: string;
  message: string;
}): ValidationResult => {
  const errors: string[] = [];
  
  const dateValidation = validateDate(data.selectedDate, 'Date');
  if (!dateValidation.isValid) {
    errors.push(...dateValidation.errors);
  }
  
  const timeValidation = validateRequired(data.timeSlot, 'Time slot');
  if (!timeValidation.isValid) {
    errors.push(...timeValidation.errors);
  }
  
  // Sanitize message
  const sanitizedMessage = sanitizeInput(data.message);
  if (sanitizedMessage.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }
  
  return { isValid: errors.length === 0, errors };
};
