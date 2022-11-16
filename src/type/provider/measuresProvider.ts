export type MeasuresContextType = {
  measures: MeasuresType;
  saveMeasure: (m: MeasureType) => void;
};

export type MeasureType = {
  date: string;
  weight: string;
  food: string;
  sport: string;
  meditation: string;
};

export type MeasuresType = {
  [index: string]: MeasureType;
};
