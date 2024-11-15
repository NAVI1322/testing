import { useState, useEffect } from 'react';

// Function to format date
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleString(undefined, options);
};

// Function to format time
const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleString(undefined, options);
};


const useFormattedDateTime = (isoString: string) => {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    if (isoString) {
      setFormattedDate(formatDate(isoString));
      setFormattedTime(formatTime(isoString));
    }
  }, [isoString]);

  return { formattedDate, formattedTime };
};

export default useFormattedDateTime;