import { MeasureType, MeasuresType } from '../type/provider/measuresProvider';

export const getMeasure = (
  date: string,
  measures: MeasuresType,
): MeasureType => {
  const found = measures[date] ?? null;
  const keys = Object.keys(measures);

  return (
    found ?? {
      date,
      weight: keys.length === 0 ? 0 : measures[keys[keys.length - 1]].weight,
      food: 'undefined',
      sport: 'undefined',
      meditation: 'undefined',
    }
  );
};

export const getLastMeasure = (measures: MeasuresType): MeasureType | null => {
  const keys = Object.keys(measures);
  return measures[keys[keys.length - 1]];
};
