import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

import { WeightChartData, WeightChartParams } from '../../lib/chart';
import { useMeasures } from '../../provider/measuresProvider';
import { LineChart } from './LineChart';
import { getWeightChartParams } from './utils';

export const WeightChart: FC = () => {
  const [data, setData] = useState<WeightChartData | null>(null);
  const [width, setWidth] = useState(0);
  const [weightChartParams, setWeightChartParams] =
    useState<WeightChartParams | null>(null);

  const { measures } = useMeasures();

  useEffect(() => {
    if (width !== 0) {
      const data = Object.keys(measures).map(k => ({
        date: dayjs(measures[k].date) as unknown as Date,
        value: measures[k].weight as unknown as number, // PLN ??
      }));
      setData(data);
      const params = getWeightChartParams(width, data);
      setWeightChartParams(params);
    }
  }, [measures]);

  const onLayout = event => {
    const { width: newWidth } = event.nativeEvent.layout;
    setWidth(newWidth);

    if (data && newWidth !== width) {
      const params = getWeightChartParams(newWidth, data);
      setWeightChartParams(params);
    }
  };

  return (
    <Surface style={styles.surface} onLayout={onLayout}>
      {weightChartParams && <LineChart params={weightChartParams} />}
    </Surface>
  );
};

export type GraphData = {
  mostRecent: number;
};

const styles = StyleSheet.create({
  surface: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    marginTop: 0,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
});
