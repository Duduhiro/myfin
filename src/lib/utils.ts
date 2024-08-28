import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function USDollar(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function DateConverter(date: string) {
  const convertedDate = date.split('-');
  return `${convertedDate[1]}/${convertedDate[2]}/${convertedDate[0]}`
}