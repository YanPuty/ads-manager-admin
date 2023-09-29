import { MONTHS_NAMES } from '../constants';

export const getMonthsByIdx = (index: number): string => {
  return MONTHS_NAMES[index] ?? ''
}

export const getPrevMonthLabels = (month: number, year: number) => {
  return `${getMonthsByIdx(month)}  ${year}`;
}

export const getNextMonthLabels = (month: number, year: number) => {
  if (month === 11) {
    return `${MONTHS_NAMES[0]} ${year + 1}`;
  }
  return `${getMonthsByIdx(month + 1)} ${year}`;
}

export const isCurrentDateAndYear = (year: number, month: number) => {
  const date = new Date();
  return (month === date.getMonth()) && date.getFullYear() === year;
}

export const generateDateArray = (year: number, month: number) => {
  const date = new Date(year, month + 1, 0);
  const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  const lastDayOfMonth = date.getDate();

  const emptyStartedDate = Array.from({ length: firstDayIndex }, () => 0)
  const daysArray = Array.from({ length: lastDayOfMonth }, (_, index) => index + 1);
  return emptyStartedDate.concat(daysArray);
}