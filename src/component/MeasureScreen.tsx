import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import { getCurrentDate, getDateWithOffset } from '../lib/date';
import { getMeasure } from '../lib/measure';
import { useMeasures } from '../provider/measuresProvider';
import { useUser } from '../provider/userProvider';
import { styles } from '../styles';
import { MeasureType } from '../type/provider/measuresProvider';
import { Measure } from './Measure';

export const MeasureScreen = () => {
  const { measures, saveMeasure } = useMeasures();
  const navigate = useNavigate();

  const [measure, setMeasure] = useState<MeasureType>(
    getMeasure(getCurrentDate(), measures),
  );

  const handleChangeDate = (date: string) => {
    setMeasure(getMeasure(date, measures));
  };

  const handleOk = (measure: MeasureType) => {
    saveMeasure(measure);
    navigate('/');
  };

  useEffect(() => {
    setMeasure(getMeasure(getCurrentDate(), measures));
  }, [measures]);

  return (
    <View>
      <View
        style={{
          backgroundColor: 'green',
        }}>
        <View>
          <Measure
            measure={measure}
            handleChangeDate={handleChangeDate}
            handleOk={handleOk}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'gray',
        }}></View>
    </View>
  );
};
