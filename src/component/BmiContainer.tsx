import { FC, useEffect, useState } from 'react';

import { getLastMeasure } from '../lib/measure';
import { useMeasures } from '../provider/measuresProvider';
import { useSettings } from '../provider/settingsProvider';
import { Bmi } from './Bmi';

export const BmiContainer: FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [hasHeight, setHasHeight] = useState(false);
  const [hasWeight, setHasWeight] = useState(false);

  const { measures } = useMeasures();
  const { settings } = useSettings();

  useEffect(() => {
    if (settings.height !== '') {
      setHeight(settings.height);
      setHasHeight(true);
    }
  }, [settings.height]);

  useEffect(() => {
    if (Object.keys(measures).length === 0) {
      setHasWeight(false);
    } else {
      setWeight(getLastMeasure(measures)?.weight);
      setHasWeight(true);
    }
  }, [measures]);

  return (
    <Bmi
      weight={weight}
      height={height}
      hasHeight={hasHeight}
      hasWeight={hasWeight}
    />
  );
};
