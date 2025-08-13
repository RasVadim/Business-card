import i18n from '@/i18n';

export const formatMonthYear = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(i18n.language, { month: '2-digit', year: 'numeric' }).format(date);
};
