import { differenceInDays, format, parseISO } from 'date-fns';

/**
 * Calculate the number of days between two dates
 */
export function getDaysSince(startDate: string): number {
  const start = parseISO(startDate);
  const today = new Date();
  return differenceInDays(today, start);
}

/**
 * Format a date string to display format
 */
export function formatDate(dateString: string, formatString: string = 'dd/MM/yyyy'): string {
  const date = parseISO(dateString);
  return format(date, formatString);
}

/**
 * Check if today is a special event date (birthday, anniversary, etc.)
 */
export function isToday(eventDate: string): boolean {
  const today = new Date();
  const [month, day] = eventDate.split('-');
  return (
    today.getMonth() + 1 === parseInt(month) &&
    today.getDate() === parseInt(day)
  );
}

/**
 * Get days until next occurrence of an event
 */
export function getDaysUntil(eventDate: string): number {
  const today = new Date();
  const [month, day] = eventDate.split('-');

  let nextOccurrence = new Date(today.getFullYear(), parseInt(month) - 1, parseInt(day));

  // If the date has passed this year, calculate for next year
  if (nextOccurrence < today) {
    nextOccurrence = new Date(today.getFullYear() + 1, parseInt(month) - 1, parseInt(day));
  }

  return differenceInDays(nextOccurrence, today);
}

/**
 * Format days count to display string
 */
export function formatDaysCount(days: number): string {
  if (days === 0) return 'Today!';
  if (days === 1) return '1 day';
  return `${days} days`;
}
