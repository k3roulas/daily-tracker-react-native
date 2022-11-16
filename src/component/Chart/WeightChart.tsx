import { FC, useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

import { WeightChartParams } from '../../lib/chart';
import { useMeasures } from '../../provider/measuresProvider';
import { MeasuresType } from '../../type/provider/measuresProvider';
import { LineChart } from './LineChart';
import { getWeightChartParams } from './utils';

export const WeightChart: FC = () => {
  const [width, setWidth] = useState(0);
  const [weightChartParams, setWeightChartParams] =
    useState<WeightChartParams | null>(null);

  const { measures } = useMeasures();

  const hasEnoughMeasures = (m: MeasuresType): boolean =>
    Object.keys(m).length > 1;

  useEffect(() => {
    if (width !== 0 && hasEnoughMeasures(measures)) {
      const params = getWeightChartParams(width, measures);
      setWeightChartParams(params);
    }
  }, [measures]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width: newWidth } = event.nativeEvent.layout;
    setWidth(newWidth);

    if (hasEnoughMeasures && newWidth !== width) {
      const params = getWeightChartParams(newWidth, measures);
      setWeightChartParams(params);
    }
  };

  if (!hasEnoughMeasures(measures)) {
    return <></>;
  }

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
