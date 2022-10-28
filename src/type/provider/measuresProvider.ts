// TODO use type or interface
export type MeasuresContextType = {
  measures: MeasuresType;
  saveMeasure: (m: MeasureType) => void | null;
};

export interface MeasureType {
  date: string;
  weight: string;
}

export interface MeasuresType {
  [index: string]: MeasureType;
}
