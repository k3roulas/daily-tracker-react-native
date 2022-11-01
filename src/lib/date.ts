import dayjs from 'dayjs';

export const getCurrentDate = (): string =>
  dayjs().hour(0).minute(0).second(0).format('YYYY/MM/DD');

export const getDateWithOffset = (current: string, dayOffset: number) => {
  const dateTime = dayjs(current, 'YYYY/MM/DD');
  return dateTime.add(dayOffset, 'day').format('YYYY/MM/DD');
};

export const formatDate = (date: string): string => {
  return dayjs(date, 'YYYY/MM/DD').format('dddd D MMM');
};
