import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { getCurrentDate } from '../lib/date';
import { getMeasure } from '../lib/measure';
import { useMeasures } from '../provider/measuresProvider';
import { MeasureScreenProps } from '../type/navigation';
import { MeasureType } from '../type/provider/measuresProvider';
import { Measure } from './Measure';

export const MeasureScreen = ({ navigation }: MeasureScreenProps) => {
  const { measures, saveMeasure } = useMeasures();

  const [measure, setMeasure] = useState<MeasureType>(
    getMeasure(getCurrentDate(), measures),
  );

  const handleChangeDate = (date: string) => {
    setMeasure(getMeasure(date, measures));
  };

  const handleOk = (m: MeasureType) => {
    saveMeasure(m);
    navigation.navigate('Home');
  };

  useEffect(() => {
    setMeasure(getMeasure(getCurrentDate(), measures));
  }, [measures]);

  return (
    <Measure
      measure={measure}
      handleChangeDate={handleChangeDate}
      handleOk={handleOk}
      navigation={navigation}
    />
  );
};
