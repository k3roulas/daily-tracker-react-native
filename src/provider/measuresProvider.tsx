import { createContext, useContext, useEffect, useState } from 'react';

import { getMeasures, storeMeasures } from '../lib/localStore';
import { sortObjectsPerAttribute } from '../lib/sort';
import { ProviderType } from '../type/provider';
import {
  MeasureType,
  MeasuresContextType,
  MeasuresType,
} from '../type/provider/measuresProvider';

export const MeasuresContext = createContext<MeasuresContextType>({
  measures: {},
  saveMeasure: () => {},
});

export const MeasuresProvider: ProviderType = ({ children }) => {
  const [measures, setMeasures] = useState<MeasuresType>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const saveMeasure = async (measure: MeasureType) => {
    measures[measure.date] = measure;
    const sortedMeasures = sortObjectsPerAttribute(measures);
    setMeasures(sortedMeasures);
    storeMeasures(sortedMeasures);
  };

  const loadMeasures = async () => {
    const fromDisk = await getMeasures();
    fromDisk !== null && setMeasures(fromDisk);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadMeasures();
  }, []);

  return (
    <MeasuresContext.Provider value={{ measures, saveMeasure }}>
      {isLoaded && <>{children}</>}
    </MeasuresContext.Provider>
  );
};

export const useMeasures = (): MeasuresContextType =>
  useContext(MeasuresContext);
