import { MeasuresType } from '../type/provider/measuresProvider';

export const sortObjectsPerAttribute = (measures: MeasuresType) =>
  Object.keys(measures)
    .sort()
    .reduce((accumulator: MeasuresType, currentValue) => {
      accumulator[currentValue] = measures[currentValue];
      return accumulator;
    }, {});
