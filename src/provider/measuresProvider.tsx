import { createContext, useContext, useEffect, useState } from 'react';

import { sortObjectsPerAttribute } from '../lib/sort';
import { loadMeasuresFromStore, saveMeasuresToStore } from '../lib/store';
import { ProviderType } from '../type/provider';
import {
  MeasureType,
  MeasuresContextType,
  MeasuresType,
} from '../type/provider/measuresProvider';
import { useUser } from './userProvider';

export const MeasuresContext = createContext<MeasuresContextType>({
  measures: {},
  saveMeasure: (m: MeasureType) => {},
});

export const MeasuresProvider: ProviderType = ({ children }) => {
  const [measures, setMeasures] = useState<MeasuresType>({});
  const fileName = 'daily.tracker.json';
  const { user } = useUser();

  const saveMeasure = async (measure: MeasureType) => {
    measures[measure.date] = measure;
    const sortedMeasures = sortObjectsPerAttribute(measures);
    setMeasures(sortedMeasures);
    saveMeasuresToStore(sortedMeasures);
  };

  const loadMeasures = async () => {
    const measures = await loadMeasuresFromStore();
    setMeasures(measures);
  };

  useEffect(() => {
    if (user) {
      loadMeasures();
    }
  }, [user]);

  return (
    <MeasuresContext.Provider value={{ measures, saveMeasure }}>
      {children}
    </MeasuresContext.Provider>
  );
};

export const useMeasures = (): MeasuresContextType =>
  useContext(MeasuresContext);
