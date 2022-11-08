import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { G, Path } from 'react-native-svg';

import { GRAPH_PADDING } from '../../config';
import { WeightChartParams } from '../../lib/chart';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';

type LineChartProps = {
  params: WeightChartParams;
};

export const LineChart: FC<LineChartProps> = ({ params }) => {
  const { curve, dimensions, scales, axisParams } = params;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Svg
          width={dimensions.graph.width}
          height={dimensions.graph.height}
          stroke="#6231ff">
          <YAxis
            axisParam={axisParams.y}
            scale={scales.y}
            dimensions={dimensions}
            line={false}
          />
          <G x={dimensions.curve.padding.left}>
            <Path d={curve} />
          </G>
          <XAxis
            axisParam={axisParams.x}
            scale={scales.x}
            dimensions={dimensions}
          />
        </Svg>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: GRAPH_PADDING,
  },
});
