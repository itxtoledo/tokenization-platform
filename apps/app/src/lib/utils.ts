import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with thousand separators
 * @param value - The number to format
 * @returns The formatted number string
 */
export function formatNumberWithThousands(value: string | number): string {
  if (!value) return "";
  
  // Convert to string and remove any existing spaces
  const valueStr = value.toString().replace(/\s/g, "");
  
  // Handle decimal numbers
  const [integerPart, decimalPart] = valueStr.split(".");
  
  // Format integer part with thousand separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  
  // Return with decimal part if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

/**
 * Remove thousand separators from a formatted number string
 * @param formattedValue - The formatted number string
 * @returns The number string without separators
 */
export function removeThousandSeparators(formattedValue: string): string {
  return formattedValue.replace(/\s/g, "");
}
