export const getFormattedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // getMonth() is 0-based
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  export function formatCurrencyString(input: string): string {
    const match = input.match(/([^\d\s.-]+)?\s*(-?\d+(?:\.\d+)?)/); // match currency + number
  
    if (!match) return input; // Return as-is if pattern not matched
  
    const [, symbol = "", numStr] = match;
    const value = parseFloat(numStr);
  
    if (isNaN(value)) return input;
  
    const formatted = new Intl.NumberFormat("en-UK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  
    return `${symbol} ${formatted}`;
  }

  export const convertToISO8601 = (dateStr: string): string  => {
  const date = new Date(dateStr);
  return date.toISOString(); // Outputs format: "YYYY-MM-DDTHH:mm:ss.sssZ"
}

export function formatDateReportsTable(input: string): string {
  const date = new Date(input);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export function formatDateUserAndTeams(dateStr: string): string {
  const date = new Date(dateStr);
  if (!dateStr || isNaN(date.getTime())) {
    return "-"; // or any default string
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}


